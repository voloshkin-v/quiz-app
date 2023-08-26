import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { IQuestion, Status } from '../types';
import { getQuestions } from '../api/getQuestions';

type QuizProviderProps = {
	children: React.ReactNode;
};

type QuizContextType = {
	questions: IQuestion[];
	status: Status;
	index: number;
	answer: null | number;
	points: number;
	highscore: number;
	secondsRemaining: number;
	numQuestions: number;
	totalPoints: number;
	dispatch: React.Dispatch<Action>;
};

const QuizContext = createContext<QuizContextType | null>(null);

const QuizProvider = ({ children }: QuizProviderProps) => {
	const [
		{
			answer,
			highscore,
			index,
			points,
			questions,
			secondsRemaining,
			status,
		},
		dispatch,
	] = useReducer(reducer, initialState);

	const numQuestions = questions.length;
	const totalPoints = questions.reduce((total, current) => {
		return total + current.points;
	}, 0);

	useEffect(() => {
		getQuestions()
			.then((data) => {
				dispatch({
					type: 'dataReceived',
					payload: data,
				});
			})
			.catch((err) => {
				dispatch({
					type: 'dataFailed',
				});
			});
	}, [dispatch]);

	return (
		<QuizContext.Provider
			value={{
				answer,
				highscore,
				index,
				points,
				questions,
				secondsRemaining,
				status,
				numQuestions,
				totalPoints,
				dispatch,
			}}
		>
			{children}
		</QuizContext.Provider>
	);
};

const useQuiz = () => {
	const context = useContext(QuizContext);

	if (context === null) {
		throw new Error('useQuiz has to be used within <QuizProvider>');
	}

	return context;
};

// REDUCER

const SECS_PER_QUESTION = 30;

type State = {
	questions: IQuestion[];
	status: Status;
	index: number;
	answer: null | number;
	points: number;
	highscore: number;
	secondsRemaining: number;
};

type Action =
	| { type: 'dataReceived'; payload: IQuestion[] }
	| { type: 'newAnswer'; payload: number }
	| { type: 'dataFailed' }
	| { type: 'start' }
	| { type: 'nextQuestion' }
	| { type: 'finish' }
	| { type: 'tick' };

const initialState: State = {
	questions: [],
	status: Status.LOADING,
	index: 0,
	answer: null,
	points: 0,
	highscore: 0,
	secondsRemaining: 0,
};

const reducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'dataReceived':
			return {
				...state,
				status: Status.READY,
				questions: action.payload,
			};
		case 'dataFailed':
			return {
				...state,
				status: Status.ERROR,
				questions: [],
			};
		case 'start':
			return {
				...initialState,
				highscore: state.highscore,
				questions: state.questions,
				secondsRemaining: state.questions.length * SECS_PER_QUESTION,
				status: Status.ACTIVE,
			};
		case 'newAnswer':
			const currentQuestion = state.questions[state.index];

			return {
				...state,
				points:
					action.payload === currentQuestion.correctOption
						? state.points + currentQuestion.points
						: state.points,
				answer: action.payload,
			};
		case 'nextQuestion':
			return {
				...state,
				answer: null,
				index: state.index + 1,
			};

		case 'finish':
			return {
				...state,
				highscore:
					state.points > state.highscore
						? state.points
						: state.highscore,
				status: Status.FINISHED,
			};

		case 'tick':
			return {
				...state,
				secondsRemaining: state.secondsRemaining - 1,
				status:
					state.secondsRemaining === 0
						? Status.FINISHED
						: state.status,
				highscore:
					state.secondsRemaining === 0
						? Math.max(state.points, state.highscore)
						: state.highscore,
			};

		default:
			throw new Error('Unknown action.');
	}
};

export { QuizProvider, useQuiz };

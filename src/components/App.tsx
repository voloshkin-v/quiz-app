import { useState, useEffect } from 'react';
import { getQuestions } from '../api/getQuestions';

import StartScreen from './StartScreen';
import FinishScreen from './FinishScreen';
import Header from './Header';
import Main from './Main';
import ErrorMessage from './ErrorMessage';
import Question from './Question';
import Progress from './Progress';
import Loader from './Loader';
import Footer from './Footer';
import NextButton from './NextButton';

import { IQuestion, Status } from '../types';

const App = () => {
	const [questions, setQuestions] = useState<IQuestion[]>([]);
	const [status, setStatus] = useState<Status>(Status.LOADING);
	const [answer, setAnswer] = useState<null | number>(null);
	const [index, setIndex] = useState(0);
	const [points, setPoints] = useState(0);
	const [highscore, setHighscore] = useState(0);

	const count = questions.length;
	const totalPoints = questions.reduce((total, current) => {
		return total + current.points;
	}, 0);

	useEffect(() => {
		(async () => {
			setStatus(Status.LOADING);

			try {
				setQuestions(await getQuestions());
				setStatus(Status.READY);
			} catch (err) {
				setQuestions([]);
				setStatus(Status.ERROR);
			} finally {
			}
		})();
	}, []);

	const handleAnswer = (i: number) => {
		const question = questions[index];

		if (i === question.correctOption) {
			setPoints((prev) => prev + question.points);
		}

		setAnswer(i);
	};

	const handleStartQuiz = () => {
		setStatus(Status.ACTIVE);
	};

	const handleNext = () => {
		setIndex((index) => index + 1);
		setAnswer(null);
	};

	const handleFinish = () => {
		setHighscore(points > highscore ? points : highscore);
		console.log(points, highscore);

		setStatus(Status.FINISHED);
	};

	const handleRestart = () => {
		setStatus(Status.READY);
		setAnswer(null);
		setIndex(0);
		setPoints(0);
	};

	return (
		<div className="app">
			<Header />

			<Main>
				{status === Status.LOADING && <Loader />}
				{status === Status.ERROR && (
					<ErrorMessage message="There was an error fecthing questions." />
				)}
				{status === Status.READY && (
					<StartScreen count={count} onStartQuiz={handleStartQuiz} />
				)}
				{status === Status.ACTIVE && (
					<>
						<Progress
							index={index}
							count={count}
							points={points}
							answer={answer}
							totalPoints={totalPoints}
						/>

						<Question
							question={questions[index]}
							onAnswer={handleAnswer}
							answer={answer}
						/>

						<Footer>
							<NextButton
								count={count}
								answer={answer}
								index={index}
								onNext={handleNext}
								onFinish={handleFinish}
							/>
						</Footer>
					</>
				)}
				{status === Status.FINISHED && (
					<FinishScreen
						onRestart={handleRestart}
						points={points}
						highscore={highscore}
						totalPoints={totalPoints}
					/>
				)}
			</Main>
		</div>
	);
};

// enum Actions {
// 	INCREASE,
// 	DECREASE,
// 	SET_COUNT,
// 	INC_RANGE,
// 	RESET,
// }

// interface ReducerAction {
// 	type: Actions;
// 	payload?: number;
// }

// interface reducerState {
// 	count: number;
// 	step: number;
// }

// const reducer = (state: reducerState, action: ReducerAction) => {
// 	switch (action.type) {
// 		case Actions.INCREASE:
// 			return { ...state, count: state.count + state.step };

// 		case Actions.DECREASE:
// 			return { ...state, count: state.count - state.step };

// 		case Actions.SET_COUNT:
// 			if (action.payload) {
// 				return { ...state, count: action.payload };
// 			}

// 			return state;

// 		case Actions.INC_RANGE:
// 			return action.payload ? { ...state, step: action.payload } : state;

// 		case Actions.RESET:
// 			return initialState;

// 		default:
// 			throw new Error('Unknown action!');
// 	}
// };

// const initialState = {
// 	count: 0,
// 	step: 1,
// };

// const DateCounter = () => {
// 	const [state, dispatch] = useReducer(reducer, initialState);
// 	const { count, step } = state;

// 	const date = new Date();
// 	date.setDate(date.getDate() + count);

// 	const handleInc = () => {
// 		dispatch({ type: Actions.INCREASE });
// 	};

// 	const handleDec = () => {
// 		dispatch({ type: Actions.DECREASE });
// 	};

// 	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		dispatch({ type: Actions.SET_COUNT, payload: +e.target.value });
// 	};

// 	const handleRange = (e: React.ChangeEvent<HTMLInputElement>) => {
// 		dispatch({ type: Actions.INC_RANGE, payload: +e.target.value });
// 	};

// 	const handleReset = () => {
// 		dispatch({ type: Actions.RESET });
// 	};

// 	return (
// 		<>
// 			<div>
// 				<input
// 					value={step}
// 					type="range"
// 					id="range"
// 					min={1}
// 					max={10}
// 					onChange={handleRange}
// 				/>
// 				<label htmlFor="range">{step}</label>
// 			</div>

// 			<br />

// 			<div>
// 				<button onClick={handleDec}>-</button>
// 				<input type="text" value={count} onChange={handleInputChange} />
// 				<button onClick={handleInc}>+</button>
// 			</div>

// 			<br />

// 			<button onClick={handleReset}>Reset</button>

// 			<br />

// 			<p>{date.toDateString()}</p>
// 		</>
// 	);
// };

// const AutoCounter = () => {
// 	const date = new Date();
// 	console.log(date.getSeconds());

// 	useEffect(() => {
// 		const id = setInterval(() => {
// 			setCounter((prev) => prev + 1);
// 		}, 1000);
// 		return () => clearInterval(id);
// 	}, []);

// 	return <h1>{}</h1>;
// };

export default App;

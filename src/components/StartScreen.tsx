import { useQuiz } from '../contexts/QuizContext';

const StartScreen = () => {
	const { numQuestions, dispatch } = useQuiz();

	return (
		<div className="start">
			<h2>Welcome to The React Quiz!</h2>
			<h3>{numQuestions} questions to test your React mastery</h3>

			{numQuestions > 0 ? (
				<div
					className="btn btn-ui"
					onClick={() => dispatch({ type: 'start' })}
				>
					Let's start
				</div>
			) : (
				<h4>There are no questions</h4>
			)}
		</div>
	);
};

export default StartScreen;

import { useQuiz } from '../contexts/QuizContext';

const NextButton = () => {
	const { numQuestions, answer, index, dispatch } = useQuiz();

	if (answer === null) return null;

	if (index === numQuestions - 1) {
		return (
			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'finish' })}
			>
				Finish
			</button>
		);
	}

	return (
		<button
			className="btn btn-ui"
			onClick={() => dispatch({ type: 'nextQuestion' })}
		>
			Next
		</button>
	);
};

export default NextButton;

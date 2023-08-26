import { useQuiz } from '../contexts/QuizContext';
import { IQuestion } from '../types';

interface OptionsProps {
	question: IQuestion;
}

const Options = ({ question }: OptionsProps) => {
	const { answer, dispatch } = useQuiz();
	const hasAnswered = answer !== null;

	return (
		<div className="options">
			{question.options.map((option, index) => (
				<button
					className={`btn btn-option ${
						index === answer ? 'answer' : ''
					} ${
						hasAnswered
							? index === question.correctOption
								? 'correct'
								: 'wrong'
							: ''
					}`}
					key={option}
					onClick={() =>
						dispatch({ type: 'newAnswer', payload: index })
					}
					disabled={hasAnswered}
				>
					{option}
				</button>
			))}
		</div>
	);
};

export default Options;

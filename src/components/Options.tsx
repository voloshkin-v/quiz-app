import { IQuestion } from '../types';

interface OptionsProps {
	question: IQuestion;
	answer: number | null;
	onAnswer: (index: number) => void;
}

const Options = ({ question, answer, onAnswer }: OptionsProps) => {
	return (
		<div className="options">
			{question.options.map((option, i) => {
				const optionClasses = [
					'btn',
					'btn-option',
					answer === i ? 'answer' : '',
					answer !== null
						? question.correctOption === i
							? 'correct'
							: 'wrong'
						: '',
				].join(' ');

				return (
					<button
						className={optionClasses}
						key={i}
						onClick={() => onAnswer(i)}
						disabled={answer !== null}
					>
						{option}
					</button>
				);
			})}
		</div>
	);
};

export default Options;

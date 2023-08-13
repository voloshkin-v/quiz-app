import { IQuestion } from '../types';

interface QuestionProps {
	question: IQuestion;
	answer: number | null;
	onAnswer: (index: number) => void;
}

const Question = ({ question, onAnswer, answer }: QuestionProps) => {
	return (
		<div>
			<h4>{question.question}</h4>
			<div className="options">
				{question.options.map((option, i) => {
					const isSelected = answer === i;

					const optionClasses = [
						'btn',
						'btn-option',
						isSelected ? 'answer' : '',
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
		</div>
	);
};

export default Question;

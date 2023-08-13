import Options from './Options';
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
			<Options
				key={question.question}
				question={question}
				answer={answer}
				onAnswer={onAnswer}
			/>
		</div>
	);
};

export default Question;

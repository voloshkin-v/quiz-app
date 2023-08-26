import { useQuiz } from '../contexts/QuizContext';

const Progress = () => {
	const { numQuestions, totalPoints, index, points, answer } = useQuiz();

	return (
		<header className="progress">
			<progress
				max={numQuestions}
				value={index + Number(answer !== null)}
			></progress>
			<p>
				Question <strong>{index + 1}</strong> / {numQuestions}
			</p>
			<p>
				<strong>{points}</strong> / {totalPoints}
			</p>
		</header>
	);
};

export default Progress;

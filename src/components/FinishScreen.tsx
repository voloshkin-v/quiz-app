import { useQuiz } from '../contexts/QuizContext';
import { getEmoji } from '../utils/getEmoji';

const FinishScreen = () => {
	const { totalPoints, points, highscore, dispatch } = useQuiz();
	const percentage = Math.round((points * 100) / totalPoints);

	return (
		<>
			<p className="result">
				<span>{getEmoji(percentage)}</span>
				You scored <strong>{points}</strong> out of {totalPoints} (
				{percentage}%)
			</p>

			<p className="highscore">(Highscore: {highscore} points)</p>

			<button
				className="btn btn-ui"
				onClick={() => dispatch({ type: 'start' })}
			>
				Restart quiz
			</button>
		</>
	);
};

export default FinishScreen;

import { getEmoji } from '../utils/getEmoji';

interface FinishScreenProps {
	onRestart: () => void;
	points: number;
	totalPoints: number;
	highscore: number;
}

const FinishScreen = ({
	onRestart,
	points,
	highscore,
	totalPoints,
}: FinishScreenProps) => {
	const percentage = Math.round((points * 100) / totalPoints);

	return (
		<>
			<p className="result">
				<span>{getEmoji(percentage)}</span>
				You scored <strong>{points}</strong> out of {totalPoints} (
				{percentage}%)
			</p>

			<p className="highscore">(Highscore: {highscore} points)</p>

			<button className="btn btn-ui" onClick={onRestart}>
				Restart quiz
			</button>
		</>
	);
};

export default FinishScreen;

interface ProgressProps {
	index: number;
	count: number;
	totalPoints: number;
	points: number;
	answer: number | null;
}

const Progress = ({
	index,
	count,
	totalPoints,
	points,
	answer,
}: ProgressProps) => {
	return (
		<header className="progress">
			<progress
				max={count}
				value={index + Number(answer !== null)}
			></progress>
			<p>
				Question <strong>{index + 1}</strong> / {count}
			</p>
			<p>
				<strong>{points}</strong> / {totalPoints}
			</p>
		</header>
	);
};

export default Progress;

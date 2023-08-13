interface StartScreenProps {
	count: number;
	onStartQuiz: () => void;
}

const StartScreen = ({ count, onStartQuiz }: StartScreenProps) => {
	return (
		<div className="start">
			<h2>Welcome to The React Quiz!</h2>
			<h3>{count} questions to test your React mastery</h3>

			{count > 0 ? (
				<div className="btn btn-ui" onClick={onStartQuiz}>
					Let's start
				</div>
			) : (
				<h4>There are no questions</h4>
			)}
		</div>
	);
};

export default StartScreen;

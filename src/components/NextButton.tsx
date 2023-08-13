interface NextButtonProps {
	onNext: () => void;
	onFinish: () => void;
	answer: number | null;
	count: number;
	index: number;
}
const NextButton = ({
	onNext,
	answer,
	count,
	index,
	onFinish,
}: NextButtonProps) => {
	if (answer === null) {
		return null;
	}

	if (index === count - 1) {
		return (
			<button className="btn btn-ui" onClick={onFinish}>
				Finish
			</button>
		);
	}

	return (
		<button className="btn btn-ui" onClick={onNext}>
			Next
		</button>
	);
};

export default NextButton;

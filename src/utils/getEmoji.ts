export const getEmoji = (percentage: number) => {
	let emoji;

	if (percentage === 100) emoji = '🥇';
	if (percentage >= 80 && percentage < 100) emoji = '🎉';
	if (percentage >= 50 && percentage < 80) emoji = '🙃';
	if (percentage >= 0 && percentage < 50) emoji = '🤨';
	if (percentage === 0) emoji = '🤦‍♂️';

	return emoji;
};

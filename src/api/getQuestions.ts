import { IQuestion } from '../types';

export const getQuestions = async () => {
	const response = await fetch('http://localhost:3001/questions');

	if (!response.ok) {
		throw new Error('Failed to fetch data');
	}

	return (await response.json()) as IQuestion[];
};

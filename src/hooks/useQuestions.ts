import { useState, useEffect } from 'react';
import { getQuestions } from '../api/getQuestions';
import { IQuestion } from '../types';

export const useQuestions = () => {
	const [questions, setQuestions] = useState<IQuestion[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [errorMessage, setErrorMessage] = useState<null | string>(null);

	useEffect(() => {
		const getData = async () => {
			setIsLoading(true);

			try {
				const data = await getQuestions();
				setQuestions(data);
			} catch (err) {
				if (err instanceof Error) {
					setErrorMessage(err.message);
				} else {
					setErrorMessage('An unknown error occurred');
				}
			} finally {
				setIsLoading(false);
			}
		};

		getData();
	}, []);

	return { questions, isLoading, errorMessage };
};

export interface IQuestion {
	question: string;
	options: string[];
	correctOption: number;
	points: number;
}

export enum Status {
	LOADING = 'loading',
	ERROR = 'error',
	READY = 'ready',
	ACTIVE = 'active',
	FINISHED = 'finished',
}

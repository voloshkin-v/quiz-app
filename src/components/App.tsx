import Header from './Header';
import Main from './Main';
import StartScreen from './StartScreen';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import Question from './Question';
import Footer from './Footer';
import NextButton from './NextButton';
import Progress from './Progress';
import FinishScreen from './FinishScreen';
import Timer from './Timer';

import { Status } from '../types';
import { useQuiz } from '../contexts/QuizContext';

const App = () => {
	const { status } = useQuiz();

	return (
		<div className="app">
			<Header />
			<Main>
				{status === Status.LOADING && <Loader />}
				{status === Status.ERROR && (
					<ErrorMessage message="There was an error fecthing questions." />
				)}
				{status === Status.READY && <StartScreen />}
				{status === Status.ACTIVE && (
					<>
						<Progress />
						<Question />
						<Footer>
							<Timer />
							<NextButton />
						</Footer>
					</>
				)}
				{status === Status.FINISHED && <FinishScreen />}
			</Main>
		</div>
	);
};

export default App;

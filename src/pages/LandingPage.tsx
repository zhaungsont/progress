import '@fontsource/rubik-glitch';
import { Link } from 'react-router-dom';
import BasicButton from '../components/BasicButton/BasicButton';
import styles from './LandingPage.module.css';

function LandingPage() {
	document.title = 'Snowy Mountains';
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className={`${styles.title} text-center mb-10 text-6xl`}>
				Snowy Mountains
			</h1>
			<div className="flex flex-col items-center justify-center gap-4">
				<Link to="/game">
					<BasicButton>Go to Game</BasicButton>
				</Link>
				<BasicButton>Settings</BasicButton>
				<BasicButton>About</BasicButton>
			</div>
		</div>
	);
}

export default LandingPage;

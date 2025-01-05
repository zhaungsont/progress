import AutoSaveHandler from '../components/AutoSaveHandler';
import FirstTimePrompt from '../components/FirstTimePrompt';

function GameView() {
	document.title = 'Game';

	return (
		<>
			<FirstTimePrompt />
			<AutoSaveHandler />
			{/* <Demo /> */}
			game
		</>
	);
}

export default GameView;

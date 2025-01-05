import { useEffect, useState } from 'react';

function FirstTimePrompt() {
	const [isFirstTime, setIsFirstTime] = useState(false);

	useEffect(() => {
		const firstTime = localStorage.getItem('snowy-mountains-gameconfig');
		if (!firstTime) {
			setIsFirstTime(true);
		}
	}, []);

	const onCloseModal = () => {
		setIsFirstTime(false);
		localStorage.setItem('snowy-mountains-gameconfig', '{}');
	};

	return isFirstTime ? (
		<>
			<div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col items-center justify-center gap-4 bg-zinc-900 p-4 rounded-lg border-2 border-slate-700">
				<h3 className="text-xl font-bold">
					Seems like it's your first time here, let's get you started!
				</h3>
				<p className="text-sm text-zinc-400">
					This game is still in development, so sit back and relax!
				</p>
				<button onClick={onCloseModal}>Start Game</button>
			</div>
		</>
	) : (
		<></>
	);
}

export default FirstTimePrompt;

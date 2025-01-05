import { useEffect } from 'react';

function AutoSaveHandler() {
	// No autosave for now lmao

	useEffect(() => {
		const handleBeforeUnload = (event: BeforeUnloadEvent) => {
			event.preventDefault();
			event.returnValue = ''; // Required for modern browsers
		};

		window.addEventListener('beforeunload', handleBeforeUnload);

		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, []);

	return <></>;
}

export default AutoSaveHandler;

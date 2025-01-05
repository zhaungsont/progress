import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './app/store';
import './index.css';
import GameView from './pages/GameView.tsx';
import LandingPage from './pages/LandingPage.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<LandingPage />} />
					<Route path="/game" element={<GameView />} />
					<Route path="*" element={<div>404 - Page Not Found</div>} />
				</Routes>
			</BrowserRouter>
		</Provider>
	</StrictMode>
);

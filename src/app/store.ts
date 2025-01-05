import { configureStore } from '@reduxjs/toolkit';
import workerSlice from './workerSlice';

export const store = configureStore({
	reducer: {
		workerSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

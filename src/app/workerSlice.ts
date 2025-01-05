import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface Worker {
	id: string;
	name: string;
	age: number;
}

export const workerSlice = createSlice({
	name: 'workers',
	initialState: {
		workers: [] as Worker[],
	},
	reducers: {
		addWorker: (state) => {
			state.workers.push({
				id: uuidv4(),
				name: 'worker',
				age: 20,
			});
		},
		removeWorker: (state, action: PayloadAction<string>) => {
			state.workers = state.workers.filter(
				(worker) => worker.id !== action.payload
			);
		},
	},
});

export const { addWorker, removeWorker } = workerSlice.actions;
export default workerSlice.reducer;

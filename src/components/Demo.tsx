import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addWorker } from '../app/workerSlice';
import Game from '../components/Game';
import { Task } from '../models/game';

function Demo() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [newTaskName, setNewTaskName] = useState('');
	const dispatch = useAppDispatch();
	const workers = useAppSelector((state) => state.workerSlice.workers);
	const handleAddTask = () => {
		setTasks((prevTasks) => [
			{ id: uuidv4(), title: newTaskName, completedTimes: 0 },
			...prevTasks,
		]);
		setNewTaskName('');
	};
	const handleDeleteTask = (task: Task) => {
		setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
	};
	const handleCompleteTask = (task: Task) => {
		toast.success(`完成${task.title} ${task.completedTimes + 1}次`);
		setTasks((prevTasks) =>
			prevTasks.map((t) =>
				t.id === task.id ? { ...t, completedTimes: t.completedTimes + 1 } : t
			)
		);
		const audio = new Audio('/click.mp3');
		audio.play();
	};
	return (
		<>
			<div>
				<div className="rounded-lg bg-[#353535] min-h-10 mb-4 p-2 text-start">
					<span className="font-bold">所有完成任務：</span>
					{!tasks.length && <span>無</span>}
					{tasks.map((task) => (
						<span key={task.id}>
							{task.title} {task.completedTimes}次・
						</span>
					))}
				</div>
				<div className="border-2 border-[#353535] rounded-lg p-2 flex items-center gap-2 mb-4">
					<label htmlFor="taskName">請輸入任務名稱</label>
					<input
						type="text"
						id="taskName"
						value={newTaskName}
						onChange={(e) => setNewTaskName(e.target.value)}
						className="rounded-lg p-1"
					/>
					<button onClick={() => handleAddTask()}>新增任務</button>
				</div>
			</div>
			<div>
				{tasks.map((task) => (
					<Game
						key={task.id}
						title={task.title}
						onComplete={() => handleCompleteTask(task)}
						onDelete={() => handleDeleteTask(task)}
					/>
				))}
			</div>
			<div>
				<div>
					<span>工人：</span>
					{workers.map((worker) => (
						<span key={worker.id}>
							{worker.name} {worker.age}歲・
						</span>
					))}
				</div>
				<button onClick={() => dispatch(addWorker())}>新增工人</button>
			</div>
			<ToastContainer />
		</>
	);
}

export default Demo;

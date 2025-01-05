import { useEffect, useRef, useState, useCallback } from 'react';

interface ProgressBarProps {
	playState: boolean;
	playSpeed: number;
	onComplete: () => void;
}

function ProgressBar(props: ProgressBarProps) {
	const { playState, playSpeed, onComplete } = props;
	const [progressValue, setProgressValue] = useState(0);

	// 累計時間 (毫秒)
	const elapsedRef = useRef(0);
	// 上一幀的時間戳
	const lastTimeRef = useRef(0);
	// 存 animationFrame 的 ID
	const animationFrameId = useRef(0);

	const handleFrame = useCallback(
		(time: number) => {
			// 若 lastTimeRef.current 為 0，代表剛開始播放
			if (!lastTimeRef.current) {
				lastTimeRef.current = time;
			}

			// 計算此幀到上一幀的時間差 (delta)
			const delta = time - lastTimeRef.current;
			// 累加到 elapsedRef，表示到目前為止總共進行了多少毫秒
			elapsedRef.current += delta * playSpeed;
			lastTimeRef.current = time;

			// 這裡以 totalDuration = 1000ms 舉例，然後轉成 progressValue
			const totalDuration = 1000 * 100;
			const fraction = elapsedRef.current / totalDuration;
			// 轉換成百分比
			const newProgress = fraction * 100;

			if (newProgress > 100) {
				onComplete();
				lastTimeRef.current = time;
				elapsedRef.current = 0;
				setProgressValue(0);
			} else {
				setProgressValue(newProgress);
			}

			if (playState) {
				animationFrameId.current = requestAnimationFrame(handleFrame);
			}
		},
		[playState, playSpeed]
	);

	useEffect(() => {
		if (playState) {
			// 播放時：開始 requestAnimationFrame
			animationFrameId.current = requestAnimationFrame(handleFrame);
		} else {
			// 停止時：重設 lastTimeRef，以便下次開始能正確計算 delta
			lastTimeRef.current = 0;
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		}
		return () => {
			if (animationFrameId.current) {
				cancelAnimationFrame(animationFrameId.current);
			}
		};
	}, [playState, handleFrame]);

	return (
		<>
			<div className="font-mono">{progressValue.toFixed(2)}%</div>
			<div className="w-[400px] h-[25px] border-[3px] border-solid border-[#5a5959] rounded-md">
				<div
					className="w-full h-full bg-[#e3e3e3] rounded-[3px]"
					style={{
						width: `${progressValue}%`,
					}}
				></div>
			</div>
		</>
	);
}

interface GameTaskProps {
	title: string;
	onComplete: () => void;
	onDelete: () => void;
}

function GameTask({ title, onComplete, onDelete }: GameTaskProps) {
	const [playState, setPlayState] = useState(false);
	const [playSpeed, setPlaySpeed] = useState(1);
	return (
		<div className="relative flex flex-col items-center gap-4 mb-8 border-4 border-[#353535] rounded-lg p-2">
			<h1 className="text-2xl font-bold absolute top-1 left-5">
				{title}{' '}
				<button className="p-1 text-sm translate-y-[-2px]" onClick={onDelete}>
					刪除
				</button>
			</h1>

			<ProgressBar
				playState={playState}
				playSpeed={playSpeed}
				onComplete={() => {
					onComplete();
				}}
			/>
			<div className="flex items-center gap-4">
				<button onClick={() => setPlayState(!playState)}>
					{playState ? 'Stop' : 'Start'}
				</button>
				<div className="h-8 w-[.75px] bg-[#ffffff] opacity-25"></div>
				<div className="flex items-center gap-2">
					<h2>Speed</h2>
					<button onClick={() => setPlaySpeed(playSpeed - 1)}>-</button>
					<div className="font-mono w-10">{playSpeed}</div>
					<button onClick={() => setPlaySpeed(playSpeed + 1)}>+</button>
				</div>
			</div>
		</div>
	);
}

export default GameTask;

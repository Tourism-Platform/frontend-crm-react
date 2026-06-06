import { useCallback, useEffect, useRef, useState } from "react";

export const ROADMAP_PHASE_COUNT = 4;
export const ROADMAP_AUTO_DURATION_MS = 5000;
export const ROADMAP_PAUSE_RESUME_MS = 10000;
export const ROADMAP_PROGRESS_CIRCUMFERENCE = 2 * Math.PI * 36;

type TRoadmapAutoplayState = {
	activePhase: number;
	progressOffset: number;
	isPaused: boolean;
	selectPhase: (index: number) => void;
};

export const useRoadmapAutoplay = (): TRoadmapAutoplayState => {
	const [activePhase, setActivePhase] = useState(0);
	const [progressOffset, setProgressOffset] = useState(
		ROADMAP_PROGRESS_CIRCUMFERENCE
	);
	const [isPaused, setIsPaused] = useState(false);

	const progressStartRef = useRef(performance.now());
	const rafIdRef = useRef<number | null>(null);
	const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const isPausedRef = useRef(isPaused);

	isPausedRef.current = isPaused;

	const cancelRaf = useCallback(() => {
		if (rafIdRef.current !== null) {
			cancelAnimationFrame(rafIdRef.current);
			rafIdRef.current = null;
		}
	}, []);

	const clearResumeTimer = useCallback(() => {
		if (resumeTimerRef.current) {
			clearTimeout(resumeTimerRef.current);
			resumeTimerRef.current = null;
		}
	}, []);

	const pauseAutoplay = useCallback(() => {
		isPausedRef.current = true;
		setIsPaused(true);
		setProgressOffset(ROADMAP_PROGRESS_CIRCUMFERENCE);
		cancelRaf();
	}, [cancelRaf]);

	const startAutoplay = useCallback(() => {
		isPausedRef.current = false;
		setIsPaused(false);
		progressStartRef.current = performance.now();

		const tick = (now: number) => {
			if (isPausedRef.current) {
				rafIdRef.current = null;
				return;
			}

			const elapsed = now - progressStartRef.current;
			const progress = Math.min(elapsed / ROADMAP_AUTO_DURATION_MS, 1);

			setProgressOffset(ROADMAP_PROGRESS_CIRCUMFERENCE * (1 - progress));

			if (progress >= 1) {
				setActivePhase((prev) => (prev + 1) % ROADMAP_PHASE_COUNT);
				progressStartRef.current = performance.now();
			}

			rafIdRef.current = requestAnimationFrame(tick);
		};

		cancelRaf();
		rafIdRef.current = requestAnimationFrame(tick);
	}, [cancelRaf]);

	const selectPhase = useCallback(
		(index: number) => {
			setActivePhase(index);
			progressStartRef.current = performance.now();
			setProgressOffset(ROADMAP_PROGRESS_CIRCUMFERENCE);
			pauseAutoplay();
			clearResumeTimer();

			resumeTimerRef.current = setTimeout(() => {
				startAutoplay();
			}, ROADMAP_PAUSE_RESUME_MS);
		},
		[clearResumeTimer, pauseAutoplay, startAutoplay]
	);

	useEffect(() => {
		startAutoplay();

		return () => {
			cancelRaf();
			clearResumeTimer();
		};
	}, [cancelRaf, clearResumeTimer, startAutoplay]);

	useEffect(() => {
		if (!isPausedRef.current) {
			progressStartRef.current = performance.now();
		}
	}, [activePhase]);

	return {
		activePhase,
		isPaused,
		progressOffset,
		selectPhase
	};
};

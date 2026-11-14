import { type FC, type MouseEvent, type ReactNode, useState } from "react";
import { flushSync } from "react-dom";

import { cn } from "@/shared/lib";

interface IThemeToggleCircularProps {
	children: ReactNode;
	onToggle?: () => void;
	className?: string;
	speed?: number;
	blur?: number;
}

/**
 * Смена темы кругом от точки клика (blogix-admin, D10) — View Transitions.
 * Без поддержки в браузере тема меняется сразу; reduced-motion снимает анимацию в global.css
 */
export const ThemeToggleCircular: FC<IThemeToggleCircularProps> = ({
	children,
	onToggle,
	className,
	speed = 0.5,
	blur = 0
}) => {
	const [isTransitioning, setIsTransitioning] = useState(false);

	const handleClick = async (event: MouseEvent<HTMLDivElement>) => {
		if (isTransitioning) return;

		if (!document.startViewTransition) {
			onToggle?.();
			return;
		}

		setIsTransitioning(true);

		const { clientX, clientY } = event;
		const isDark = document.documentElement.classList.contains("dark");
		const root = document.documentElement;

		root.style.setProperty("--x", `${clientX}px`);
		root.style.setProperty("--y", `${clientY}px`);
		root.style.setProperty("--transition-speed", `${speed}s`);
		root.style.setProperty("--transition-blur", `${blur}px`);
		root.setAttribute(
			"data-theme-transition",
			isDark ? "to-light" : "to-dark"
		);

		try {
			const transition = document.startViewTransition(() => {
				flushSync(() => {
					onToggle?.();
				});
			});

			await transition.finished;
		} finally {
			root.removeAttribute("data-theme-transition");
			setIsTransitioning(false);
		}
	};

	return (
		<div
			onClick={handleClick}
			className={cn("inline-flex", className)}
			style={{ pointerEvents: isTransitioning ? "none" : "auto" }}
		>
			{children}
		</div>
	);
};

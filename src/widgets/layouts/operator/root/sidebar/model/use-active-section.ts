import { useEffect, useState } from "react";

/** A section counts as current once its top passes this line (sticky header + breadcrumb). */
const ACTIVE_LINE_PX = 160;

/**
 * Scroll-spy over page sections found by id: the last section whose top is
 * above the active line, or the last one when the page is scrolled to the end.
 */
export const useActiveSection = (ids: readonly string[], enabled: boolean) => {
	const [active, setActive] = useState<string | null>(null);
	const idsKey = ids.join("|");

	useEffect(() => {
		if (!enabled || !idsKey) {
			setActive(null);
			return;
		}

		const sectionIds = idsKey.split("|");
		let frame = 0;

		const update = () => {
			frame = 0;
			const root = document.documentElement;
			const isScrollable = root.scrollHeight > window.innerHeight;
			const isAtBottom =
				window.innerHeight + window.scrollY >= root.scrollHeight - 2;
			const lastId = sectionIds[sectionIds.length - 1];

			// The last section is often too short to reach the line.
			if (isScrollable && isAtBottom && document.getElementById(lastId)) {
				setActive(lastId);
				return;
			}

			let current: string | null = null;
			for (const id of sectionIds) {
				const top = document
					.getElementById(id)
					?.getBoundingClientRect().top;
				if (top !== undefined && top <= ACTIVE_LINE_PX) current = id;
			}
			setActive(current ?? sectionIds[0]);
		};

		const schedule = () => {
			if (!frame) frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);

		return () => {
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [enabled, idsKey]);

	return active;
};

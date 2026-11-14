import type { FC } from "react";

import { cn } from "@/shared/lib";

import { PAGE_BACKDROP_GRID } from "../model";

/**
 * Фон страницы под стеклянными поверхностями (Blogix, D10): точечная сетка, затухающая к краям.
 * Закреплён на экране (`fixed -z-10`) — родитель должен быть `isolate`,
 * иначе слой уйдёт под его собственную заливку
 */
export const PageBackdrop: FC = () => (
	<div
		aria-hidden
		className={cn(
			"pointer-events-none fixed inset-0 -z-10",
			PAGE_BACKDROP_GRID
		)}
	/>
);

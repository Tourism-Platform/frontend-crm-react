import {
	type CollisionDetection,
	closestCorners,
	pointerWithin,
	rectIntersection
} from "@dnd-kit/core";

/**
 * Sidebar create sources (Library / Components) are not droppables.
 * Using closestCorners for them falsely picks the nearest Day on click/cancel
 * in the sidebar. Restrict to pointerWithin so drop requires pointer over a
 * kanban target.
 */
const isExternalCreateSource = (activeId: string): boolean =>
	activeId.startsWith("library:") || activeId.startsWith("template:");

/**
 * Custom collision detection strategy that prioritizes pointerWithin
 * (exact match) over closestCorners.
 *
 * This fixes the issue where dragging *below* a nested container
 * still triggers it because it's mathematically "closest" despite
 * the cursor being outside.
 */
export const customCollisionDetection: CollisionDetection = (args) => {
	const activeId = String(args.active.id);

	if (isExternalCreateSource(activeId)) {
		return pointerWithin(args);
	}

	// 1. First, check if the pointer is strictly inside a droppable container
	const pointerCollisions = pointerWithin(args);

	if (pointerCollisions.length > 0) {
		return pointerCollisions;
	}

	// 2. If the pointer is NOT inside any container (e.g. in the gap between items),
	// fall back to rectIntersection / closestCorners for kanban moves.
	const rectCollisions = rectIntersection(args);

	if (rectCollisions.length > 0) {
		return rectCollisions;
	}

	return closestCorners(args);
};

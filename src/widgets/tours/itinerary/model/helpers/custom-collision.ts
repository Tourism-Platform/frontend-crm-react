import {
	type CollisionDetection,
	closestCorners,
	pointerWithin,
	rectIntersection
} from "@dnd-kit/core";

/**
 * Custom collision detection strategy that prioritizes pointerWithin
 * (exact match) over closestCorners.
 *
 * This fixes the issue where dragging *below* a nested container
 * still triggers it because it's mathematically "closest" despite
 * the cursor being outside.
 */
export const customCollisionDetection: CollisionDetection = (args) => {
	// 1. First, check if the pointer is strictly inside a droppable container
	const pointerCollisions = pointerWithin(args);

	// If we have strict pointer matches, return the first one (most specific/nested usually first)
	// However, we might want to prioritize specific types of containers if needed.
	// For now, standard pointerWithin behavior is usually what users expect for "overlay".
	if (pointerCollisions.length > 0) {
		return pointerCollisions;
	}

	// 2. If the pointer is NOT inside any container (e.g. in the gap between items),
	// fall back to closestCorners or rectIntersection to find the best candidate.
	// RectIntersection is "safer" than closestCorners for nested lists because it requires actual overlap.
	const rectCollisions = rectIntersection(args);

	if (rectCollisions.length > 0) {
		return rectCollisions;
	}

	// 3. Fallback to closestCorners only if nothing else matches (e.g. empty board)
	return closestCorners(args);
};

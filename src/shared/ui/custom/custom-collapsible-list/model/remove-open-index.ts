/**
 * Open state after removing the item at `removed`: that item closes and every
 * later item moves up by one, so an open card stays open on its own item.
 */
export const removeOpenIndex = (open: number[], removed: number): number[] =>
	open
		.filter((index) => index !== removed)
		.map((index) => (index > removed ? index - 1 : index));

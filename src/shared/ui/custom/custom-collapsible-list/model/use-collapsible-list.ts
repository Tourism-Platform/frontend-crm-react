import { useCallback, useState } from "react";

import { removeOpenIndex } from "./remove-open-index";

/**
 * Open cards of a form list, by index: a form reset (autosave) regenerates
 * `useFieldArray` ids, indexes survive it. Everything starts collapsed;
 * a new `resetKey` (another edited record) collapses everything again.
 */
export const useCollapsibleList = (count: number, resetKey?: unknown) => {
	const [open, setOpen] = useState<number[]>([]);
	const [syncedKey, setSyncedKey] = useState(resetKey);

	if (syncedKey !== resetKey) {
		setSyncedKey(resetKey);
		setOpen([]);
	} else if (open.some((index) => index >= count)) {
		// A shorter list from the server: forget the indexes it no longer has,
		// so they do not come back open when the list grows again.
		setOpen(open.filter((index) => index < count));
	}

	const onValueChange = useCallback((values: string[]) => {
		setOpen(values.map(Number));
	}, []);

	const expandAll = useCallback(() => {
		setOpen(Array.from({ length: count }, (_, index) => index));
	}, [count]);

	const collapseAll = useCallback(() => {
		setOpen([]);
	}, []);

	const openItem = useCallback((index: number) => {
		setOpen((prev) => (prev.includes(index) ? prev : [...prev, index]));
	}, []);

	const removeItem = useCallback((index: number) => {
		setOpen((prev) => removeOpenIndex(prev, index));
	}, []);

	const reset = useCallback((next: number[] = []) => {
		setOpen(next);
	}, []);

	return {
		value: open.map(String),
		onValueChange,
		expandAll,
		collapseAll,
		openItem,
		removeItem,
		reset
	};
};

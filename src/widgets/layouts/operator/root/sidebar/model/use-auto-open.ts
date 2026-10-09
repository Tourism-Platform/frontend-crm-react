import { useEffect, useState } from "react";

/** Collapsible state that opens itself whenever it lands on the active path. */
export const useAutoOpen = (isActive: boolean) => {
	const [open, setOpen] = useState(isActive);

	useEffect(() => {
		if (isActive) setOpen(true);
	}, [isActive]);

	return [open, setOpen] as const;
};

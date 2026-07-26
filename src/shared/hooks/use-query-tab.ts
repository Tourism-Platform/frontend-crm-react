import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryTab = <T extends string>(
	defaultTab: T,
	allowedTabs?: readonly T[],
	key = "tab"
): [T, (tab: string) => void] => {
	const [searchParams, setSearchParams] = useSearchParams();
	const raw = searchParams.get(key);
	const tab =
		raw && (!allowedTabs || allowedTabs.includes(raw as T))
			? (raw as T)
			: defaultTab;

	const setTab = useCallback(
		(next: string) => {
			setSearchParams(
				(prev) => {
					const params = new URLSearchParams(prev);
					if (next === defaultTab) {
						params.delete(key);
					} else {
						params.set(key, next);
					}
					return params;
				},
				{ replace: true }
			);
		},
		[defaultTab, key, setSearchParams]
	);

	return [tab, setTab];
};

import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useQueryTab = <T extends string>(
	defaultTab: T,
	allowedTabs?: readonly T[],
	key = "tab"
): [T, (tab: string) => void] => {
	const [searchParams, setSearchParams] = useSearchParams();

	const resolveTab = (raw: string | null): T => {
		if (raw && (!allowedTabs || allowedTabs.includes(raw as T))) {
			return raw as T;
		}
		return defaultTab;
	};

	const raw = searchParams.get(key);
	const tab = resolveTab(raw);

	useEffect(() => {
		if (raw === tab) return;

		setSearchParams(
			(prev) => {
				const params = new URLSearchParams(prev);
				params.set(key, tab);
				return params;
			},
			{ replace: true }
		);
	}, [raw, tab, key, setSearchParams]);

	const setTab = (next: string) => {
		const nextTab = resolveTab(next);
		setSearchParams(
			(prev) => {
				const params = new URLSearchParams(prev);
				params.set(key, nextTab);
				return params;
			},
			{ replace: true }
		);
	};

	return [tab, setTab];
};

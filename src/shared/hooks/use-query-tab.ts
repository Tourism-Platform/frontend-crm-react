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

	const initialTab = resolveTab(searchParams.get(key));

	const setTab = (next: string) => {
		const nextTab = resolveTab(next);
		setSearchParams(
			(prev) => {
				const params = new URLSearchParams(prev);
				if (nextTab === defaultTab) {
					params.delete(key);
				} else {
					params.set(key, nextTab);
				}
				return params;
			},
			{ replace: true }
		);
	};

	return [initialTab, setTab];
};

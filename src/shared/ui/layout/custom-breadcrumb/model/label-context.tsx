import {
	type FC,
	type PropsWithChildren,
	createContext,
	useContext,
	useLayoutEffect,
	useMemo,
	useState
} from "react";

type TBreadcrumbLabelContextValue = {
	labels: (string | undefined)[];
	setLabels: (labels: (string | undefined)[]) => void;
};

const BreadcrumbLabelContext =
	createContext<TBreadcrumbLabelContextValue | null>(null);

export const BreadcrumbLabelProvider: FC<PropsWithChildren> = ({
	children
}) => {
	const [labels, setLabels] = useState<(string | undefined)[]>([]);
	const value = useMemo(() => ({ labels, setLabels }), [labels]);

	return (
		<BreadcrumbLabelContext.Provider value={value}>
			{children}
		</BreadcrumbLabelContext.Provider>
	);
};

export const useBreadcrumbLabels = (): (string | undefined)[] =>
	useContext(BreadcrumbLabelContext)?.labels ?? [];

/** Max 2 dynamic crumbs in trails (supplier + product). */
export const useSetBreadcrumbLabels = (
	labels: (string | undefined)[]
): void => {
	const setLabels = useContext(BreadcrumbLabelContext)?.setLabels;
	const a = labels[0];
	const b = labels[1];
	const count = labels.length;

	useLayoutEffect(() => {
		if (!setLabels) return;
		setLabels(count >= 2 ? [a, b] : [a]);
		return () => setLabels([]);
	}, [setLabels, a, b, count]);
};

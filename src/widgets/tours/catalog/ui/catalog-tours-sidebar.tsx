import type { FC, PropsWithChildren } from "react";

import { Card, CardContent } from "@/shared/ui";

/** Фильтры в колонке слева — только с lg; липнут под шапкой (h-16) с отступом 1rem */
export const CatalogToursSidebar: FC<PropsWithChildren> = ({ children }) => {
	return (
		<Card variant="glass" className="sticky top-20 hidden lg:flex">
			<CardContent>{children}</CardContent>
		</Card>
	);
};

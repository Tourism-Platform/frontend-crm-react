import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Card, CardContent, CardHeader, CardTitle } from "@/shared/ui";

import type { ICatalogTourFilters } from "@/entities/tour";

import { CatalogToursFilter } from "./catalog-tours-filter";

type TCatalogToursSidebarProps = {
	form: UseFormReturn<ICatalogTourFilters>;
	onReset: () => void;
};

export const CatalogToursSidebar: FC<TCatalogToursSidebarProps> = ({
	form,
	onReset
}) => {
	const { t } = useTranslation("tours_catalog_page");

	return (
		<aside className="flex flex-col gap-4">
			<Card>
				<CardHeader className="flex items-center justify-between ">
					<CardTitle className="text-xl font-semibold">
						{t("filters.title")}
					</CardTitle>
					<Button
						size="sm"
						onClick={onReset}
						className="h-auto bg-transparent p-0 text-destructive hover:bg-transparent"
					>
						{t("filters.buttons.reset")}
					</Button>
				</CardHeader>
				<CardContent>
					<CatalogToursFilter form={form} />
				</CardContent>
			</Card>
		</aside>
	);
};

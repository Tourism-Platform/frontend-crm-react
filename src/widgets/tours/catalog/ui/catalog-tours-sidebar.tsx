import { RestartIcon } from "@solar-icons/react/outline";
import type { FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	LoaderButton
} from "@/shared/ui";

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
				<CardHeader className="flex flex-wrap items-center justify-between gap-3">
					<CardTitle className="text-lg font-semibold">
						{t("filters.title")}
					</CardTitle>
					<LoaderButton
						size="sm"
						onClick={onReset}
						className="h-auto bg-transparent p-0 text-destructive hover:bg-transparent"
						variant="outline"
						icon={<RestartIcon />}
						label={t("filters.buttons.reset")}
					/>
				</CardHeader>
				<CardContent>
					<CatalogToursFilter form={form} />
				</CardContent>
			</Card>
		</aside>
	);
};

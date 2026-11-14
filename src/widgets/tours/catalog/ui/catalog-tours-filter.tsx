import { RestartIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	CustomField,
	Form,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

import { type ICatalogTourFilters } from "@/entities/tour";

import { FORM_CATALOG_FILTERS_LIST, useCatalogToursFilter } from "../model";

interface ICatalogToursFilterProps {
	form: UseFormReturn<ICatalogTourFilters>;
	onReset: () => void;
}

/** Фильтры каталога — в колонке слева (с lg) и в выезжающей панели (до lg) */
const CatalogToursFilterBase: FC<ICatalogToursFilterProps> = ({
	form,
	onReset
}) => {
	const { t } = useTranslation("tours_catalog_page");
	const options = useCatalogToursFilter();

	return (
		<Form {...form}>
			<div className="flex flex-col">
				{FORM_CATALOG_FILTERS_LIST(options).map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form.control}
						name={key}
						t={t}
						{...item}
					/>
				))}
				<LoaderButton
					variant="glass"
					onClick={onReset}
					icon={<RestartIcon />}
					label={t("filters.buttons.reset")}
				/>
			</div>
		</Form>
	);
};

export const CatalogToursFilter = withErrorBoundary(CatalogToursFilterBase);

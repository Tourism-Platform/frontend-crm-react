"use client";

import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";

import { CustomAccordion, withErrorBoundary } from "@/shared/ui";

import { type ICatalogTourFilters } from "@/entities/tour";

import { useCatalogToursFilter } from "../model";

interface ICatalogToursFilterProps {
	form: UseFormReturn<ICatalogTourFilters>;
}

const CatalogToursFilterBase: FC<ICatalogToursFilterProps> = ({ form }) => {
	const sections = useCatalogToursFilter(form);

	return (
		<div className="flex flex-col gap-4">
			{/* <CustomAccordionRange
				id="price"
				title={t("filters.fields.price")}
				icon={MoneysIcon}
				...
			/> */}

			{sections.map((section) => (
				<CustomAccordion key={section.id} {...section} />
			))}
		</div>
	);
};

export const CatalogToursFilter = withErrorBoundary(CatalogToursFilterBase);

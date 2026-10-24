import type { LucideIcon } from "lucide-react";

import type { TToursCatalogPageKeys } from "@/shared/config";
import type { IAccordionItem } from "@/shared/ui/custom/custom-accordion/model/types";

import type { ICatalogTourFilters } from "@/entities/tour";

export type TCatalogFilterField = keyof NonNullable<
	ICatalogTourFilters["filters"]
>;

export interface ICatalogFilterSectionConfig {
	field: TCatalogFilterField;
	titleKey: TToursCatalogPageKeys;
	icon: LucideIcon;
	/** Пункты приходят с бэка — пока грузятся, показываем скелетон */
	isRemote?: boolean;
}

export interface ICatalogFilterSection {
	id: TCatalogFilterField;
	title: string;
	icon: LucideIcon;
	items: IAccordionItem[];
	isLoading?: boolean;
	onChange: (id: string, checked: boolean) => void;
}

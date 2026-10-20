import type { FC, RefObject } from "react";
import { useTranslation } from "react-i18next";

import { SelectPicker } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	CATALOG_SORT_LABELS,
	type ENUM_CATALOG_SORT_TYPE
} from "@/entities/tour";

import type { TCatalogViewMode } from "../model/config/catalog-tours.config";

import { CatalogToursSearchInput } from "./catalog-tours-search-input";
import { CatalogToursViewToggle } from "./catalog-tours-view-toggle";

type TCatalogToursToolbarProps = {
	totalCount: number;
	viewMode: TCatalogViewMode;
	onViewModeChange: (mode: TCatalogViewMode) => void;
	localSearch: string;
	onLocalSearchChange: (value: string) => void;
	searchInputRef: RefObject<HTMLInputElement | null>;
	sort?: ENUM_CATALOG_SORT_TYPE;
	onSortChange: (value: string) => void;
};

export const CatalogToursToolbar: FC<TCatalogToursToolbarProps> = ({
	totalCount,
	viewMode,
	onViewModeChange,
	localSearch,
	onLocalSearchChange,
	searchInputRef,
	sort,
	onSortChange
}) => {
	const { t } = useTranslation("tours_catalog_page");
	const sortOptions = useValueToTranslateLabel(CATALOG_SORT_LABELS);

	return (
		<div className="flex flex-wrap items-center justify-between gap-3">
			<p className="text-xl font-semibold">
				{t("header.found", { count: totalCount })}
			</p>
			<div className="flex flex-wrap items-center gap-3">
				<CatalogToursSearchInput
					inputRef={searchInputRef}
					value={localSearch}
					onChange={onLocalSearchChange}
				/>
				<SelectPicker
					className="w-56"
					options={sortOptions}
					value={sort}
					onChange={onSortChange}
					placeholder={t("sort.placeholder")}
				/>
				<CatalogToursViewToggle
					viewMode={viewMode}
					onViewModeChange={onViewModeChange}
				/>
			</div>
		</div>
	);
};

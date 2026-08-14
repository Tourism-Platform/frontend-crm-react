import { LayoutGrid, StretchHorizontal } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

import type { TCatalogViewMode } from "../model/config/catalog-tours.config";

type TCatalogToursViewToggleProps = {
	viewMode: TCatalogViewMode;
	onViewModeChange: (mode: TCatalogViewMode) => void;
};

export const CatalogToursViewToggle: FC<TCatalogToursViewToggleProps> = ({
	viewMode,
	onViewModeChange
}) => {
	const { t } = useTranslation("tours_catalog_page");

	return (
		<div className="flex items-center gap-1">
			<Button
				type="button"
				variant={viewMode === "grid" ? "secondary" : "ghost"}
				size="icon"
				aria-label={t("view.grid")}
				onClick={() => onViewModeChange("grid")}
			>
				<LayoutGrid className="size-4" />
			</Button>
			<Button
				type="button"
				variant={viewMode === "list" ? "secondary" : "ghost"}
				size="icon"
				aria-label={t("view.list")}
				onClick={() => onViewModeChange("list")}
			>
				<StretchHorizontal className="size-4" />
			</Button>
		</div>
	);
};

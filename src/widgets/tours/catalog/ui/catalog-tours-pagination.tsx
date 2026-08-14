import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

type TCatalogToursPaginationProps = {
	page: number;
	totalPages: number;
	totalCount: number;
	isBusy: boolean;
	onPrev: () => void;
	onNext: () => void;
};

export const CatalogToursPagination: FC<TCatalogToursPaginationProps> = ({
	page,
	totalPages,
	totalCount,
	isBusy,
	onPrev,
	onNext
}) => {
	const { t } = useTranslation("tours_catalog_page");

	if (totalCount <= 0) {
		return null;
	}

	return (
		<div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 sm:gap-3">
			<Button
				variant="outline"
				size="sm"
				disabled={page <= 1 || isBusy}
				onClick={onPrev}
			>
				{t("pagination.prev")}
			</Button>
			<span className="truncate text-center text-xs text-muted-foreground sm:text-sm">
				{t("pagination.page", {
					page,
					total: totalPages
				})}
			</span>
			<Button
				variant="outline"
				size="sm"
				disabled={page >= totalPages || isBusy}
				onClick={onNext}
			>
				{t("pagination.next")}
			</Button>
		</div>
	);
};

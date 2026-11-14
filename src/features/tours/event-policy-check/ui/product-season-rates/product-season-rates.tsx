import { type PaginationState } from "@tanstack/react-table";
import { type FC, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import { INTERSECTION_ELEMENTS } from "@/shared/config";
import { cn } from "@/shared/lib";
import { GLASS_SURFACE } from "@/shared/ui";
import { SmartTable } from "@/shared/ui/custom/smart-table";

import {
	ENUM_HOUSING_ROOM_TYPE,
	HOUSING_ROOM_TYPE_LABELS,
	type IProductSeasonRate
} from "@/entities/tour";

import { PRODUCT_SEASON_RATE_COLUMNS } from "../../model";

const ALL_ROOM_TYPES = "all";

interface IProductSeasonRatesProps {
	rates: IProductSeasonRate[];
}

export const ProductSeasonRates: FC<IProductSeasonRatesProps> = ({ rates }) => {
	const { t } = useTranslation(["common_events", "options"]);
	const [roomType, setRoomType] = useState<string>(ALL_ROOM_TYPES);
	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: INTERSECTION_ELEMENTS.PRODUCT_SEASON_RATES
	});

	// Табы — только типы номеров, которые есть у продукта
	const roomTypeTabs = useMemo(
		() => [
			{ label: t("product_seasons.filters.all"), value: ALL_ROOM_TYPES },
			...Object.values(ENUM_HOUSING_ROOM_TYPE)
				.filter((type) => rates.some((rate) => rate.roomType === type))
				.map((type) => ({
					label: t(HOUSING_ROOM_TYPE_LABELS[type], { ns: "options" }),
					value: type
				}))
		],
		[rates, t]
	);

	const filteredRates = useMemo(
		() =>
			roomType === ALL_ROOM_TYPES
				? rates
				: rates.filter((rate) => rate.roomType === roomType),
		[rates, roomType]
	);

	// Без recordCount SmartTable не знает число страниц и пускает «дальше»
	// бесконечно — страницу режем сами, как в курсах валют
	const pageRates = useMemo(() => {
		const start = pagination.pageIndex * pagination.pageSize;
		return filteredRates.slice(start, start + pagination.pageSize);
	}, [filteredRates, pagination]);

	const columns = useMemo(() => PRODUCT_SEASON_RATE_COLUMNS(t), [t]);

	// Новый фильтр — снова с первой страницы
	const handleRoomTypeChange = useCallback((value: string) => {
		setRoomType(value);
		setPagination((prev) => ({ ...prev, pageIndex: 0 }));
	}, []);

	if (!rates.length) {
		return null;
	}

	return (
		<div className="grid gap-3">
			<h3 className="text-lg">{t("product_seasons.title")}</h3>
			<SmartTable
				TableClassName={cn(GLASS_SURFACE, "rounded-xl")}
				columns={columns}
				data={pageRates}
				recordCount={filteredRates.length}
				pagination={pagination}
				onPaginationChange={setPagination}
				showTopFilters={roomTypeTabs.length > 2}
				showSearchFilter={false}
				showVisibilityFilter={false}
				showStatusTabsFilter={true}
				statusTabs={roomTypeTabs}
				activeStatusTab={roomType}
				onStatusTabChange={handleRoomTypeChange}
			/>
		</div>
	);
};

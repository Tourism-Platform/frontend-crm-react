import { type FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
	Input,
	SelectPicker,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	type ENUM_EVENT_TYPE,
	EVENT_LIBRARY_TYPE_LABELS,
	type IEventLibraryFilters,
	useListEventLibraryQuery
} from "@/entities/tour";

import { DraggableLibraryItem } from "./draggable-library-item";

const ALL_TYPES = "all";

const DEFAULT_FILTERS: IEventLibraryFilters = {
	search: "",
	status: [],
	page: 1,
	limit: 100
};

interface IEventLibrarySheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const EventLibrarySheet: FC<IEventLibrarySheetProps> = ({
	open,
	onOpenChange
}) => {
	const { t } = useTranslation("tour_itinerary_page");
	const [filters, setFilters] =
		useState<IEventLibraryFilters>(DEFAULT_FILTERS);

	const { data, isLoading, isFetching } = useListEventLibraryQuery(filters, {
		skip: !open
	});

	const items = data?.data ?? [];
	const typeOptions = useValueToTranslateLabel(EVENT_LIBRARY_TYPE_LABELS);
	const selectedType = filters.status[0] ?? ALL_TYPES;

	const pickerOptions = useMemo(
		() => [
			{
				value: ALL_TYPES,
				label: t("sidebar.event_library.type_all")
			},
			...typeOptions
		],
		[t, typeOptions]
	);

	const handleSearchChange = (search: string) => {
		setFilters((prev) => ({ ...prev, search, page: 1 }));
	};

	const handleTypeChange = (value: string) => {
		setFilters((prev) => ({
			...prev,
			status: value === ALL_TYPES ? [] : [value as ENUM_EVENT_TYPE],
			page: 1
		}));
	};

	return (
		<Sheet
			open={open}
			onOpenChange={(next) => {
				if (!next) setFilters(DEFAULT_FILTERS);
				onOpenChange(next);
			}}
		>
			<SheetContent
				side="right"
				className="flex h-full w-full flex-col gap-0 p-0 sm:max-w-[400px]"
			>
				<SheetHeader className="shrink-0 space-y-3 border-b px-6 pt-6 pb-4 text-left">
					<SheetTitle>
						{t("sidebar.event_library.sheet_title")}
					</SheetTitle>
					<SheetDescription className="sr-only">
						{t("sidebar.event_library.sheet_title")}
					</SheetDescription>
					<Input
						value={filters.search}
						onChange={(e) => handleSearchChange(e.target.value)}
						placeholder={t(
							"sidebar.event_library.search_placeholder"
						)}
					/>
					<SelectPicker
						value={selectedType}
						onChange={handleTypeChange}
						options={pickerOptions}
						placeholder={t(
							"sidebar.event_library.type_placeholder"
						)}
					/>
				</SheetHeader>

				<div className="flex-1 space-y-2 overflow-y-auto px-6 py-4">
					{!isLoading && !isFetching && items.length === 0 ? (
						<p className="text-sm text-muted-foreground">
							{t("sidebar.event_library.empty")}
						</p>
					) : (
						items.map((item) => (
							<DraggableLibraryItem key={item.id} item={item} />
						))
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};

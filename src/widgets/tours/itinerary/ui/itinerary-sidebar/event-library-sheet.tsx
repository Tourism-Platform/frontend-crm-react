import { Loader2 } from "lucide-react";
import { type FC, useEffect, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";

import {
	Input,
	ScrollArea,
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
	useEventLibrarySearchOptions
} from "@/entities/tour";

import { DraggableLibraryItem } from "./draggable-library-item";

const ALL_TYPES = "all";
/** Start loading the next page this far before the list end. */
const LOAD_MORE_MARGIN_PX = 500;

interface IEventLibrarySheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export const EventLibrarySheet: FC<IEventLibrarySheetProps> = ({
	open,
	onOpenChange
}) => {
	const { t } = useTranslation("tour_itinerary_page");

	const {
		items,
		isLoading,
		isLoadingMore,
		hasMore,
		query,
		setQuery,
		status,
		setStatus,
		loadMore,
		reset
	} = useEventLibrarySearchOptions({ enabled: open });

	const loadMoreRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (!open || !hasMore || isLoading || isLoadingMore) {
			return;
		}

		const node = loadMoreRef.current;
		if (!node) {
			return;
		}

		const root = node.closest("[data-slot='scroll-area-viewport']");
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0]?.isIntersecting) {
					loadMore();
				}
			},
			{
				root,
				rootMargin: `0px 0px ${LOAD_MORE_MARGIN_PX}px 0px`,
				threshold: 0
			}
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [open, hasMore, isLoading, isLoadingMore, items.length, loadMore]);

	const typeOptions = useValueToTranslateLabel(EVENT_LIBRARY_TYPE_LABELS);
	const selectedType = status[0] ?? ALL_TYPES;

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

	const handleTypeChange = (value: string) => {
		setStatus(value === ALL_TYPES ? [] : [value as ENUM_EVENT_TYPE]);
	};

	return (
		<Sheet
			open={open}
			onOpenChange={(next) => {
				if (!next) {
					reset();
				}
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
						value={query}
						onChange={(e) => setQuery(e.target.value)}
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

				<ScrollArea className="min-h-0 flex-1">
					<div className="space-y-2 px-6 py-4">
						{isLoading ? (
							<div className="flex justify-center py-2">
								<Loader2 className="size-4 animate-spin text-muted-foreground" />
							</div>
						) : items.length === 0 ? (
							<p className="text-sm text-muted-foreground">
								{t("sidebar.event_library.empty")}
							</p>
						) : (
							items.map((item) => (
								<DraggableLibraryItem
									key={item.id}
									item={item}
								/>
							))
						)}
						{hasMore && !isLoading ? (
							<div
								ref={loadMoreRef}
								className="flex justify-center py-2"
							>
								{isLoadingMore ? (
									<Loader2 className="size-4 animate-spin text-muted-foreground" />
								) : null}
							</div>
						) : null}
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	);
};

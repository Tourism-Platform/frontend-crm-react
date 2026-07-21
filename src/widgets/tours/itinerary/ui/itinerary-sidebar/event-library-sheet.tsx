import { type FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
	Input,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from "@/shared/ui";

import type { IEventLibraryItem } from "@/entities/tour";

import { DraggableLibraryItem } from "./draggable-library-item";

interface IEventLibrarySheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	items: IEventLibraryItem[];
}

export const EventLibrarySheet: FC<IEventLibrarySheetProps> = ({
	open,
	onOpenChange,
	items
}) => {
	const { t } = useTranslation("tour_itinerary_page");
	const [search, setSearch] = useState("");

	const filteredItems = useMemo(() => {
		const q = search.trim().toLowerCase();
		if (!q) return items;
		return items.filter((item) =>
			(item.name || "").toLowerCase().includes(q)
		);
	}, [items, search]);

	return (
		<Sheet
			open={open}
			onOpenChange={(next) => {
				if (!next) setSearch("");
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
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder={t(
							"sidebar.event_library.search_placeholder"
						)}
					/>
				</SheetHeader>

				<div className="flex-1 space-y-2 overflow-y-auto px-6 py-4">
					{filteredItems.length === 0 ? (
						<p className="text-sm text-muted-foreground">
							{t("sidebar.event_library.empty")}
						</p>
					) : (
						filteredItems.map((item) => (
							<DraggableLibraryItem key={item.id} item={item} />
						))
					)}
				</div>
			</SheetContent>
		</Sheet>
	);
};

import { Bed, BedDouble, BedSingle, type LucideIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	ENUM_HOUSING_ROOM_TYPE,
	type ENUM_HOUSING_ROOM_TYPE_TYPE,
	HOUSING_ROOM_TYPE_LABELS
} from "@/entities/tour";
import type { IOptionEventSheetRoom } from "@/entities/tour/preview-tour";

import { OptionEventSheetItemCard } from "./option-event-sheet-item-card";

const ROOM_ICONS: Record<ENUM_HOUSING_ROOM_TYPE_TYPE, LucideIcon> = {
	[ENUM_HOUSING_ROOM_TYPE.SINGLE]: BedSingle,
	[ENUM_HOUSING_ROOM_TYPE.DOUBLE]: BedDouble,
	[ENUM_HOUSING_ROOM_TYPE.TWIN]: BedDouble,
	[ENUM_HOUSING_ROOM_TYPE.TRIPLE]: Bed,
	[ENUM_HOUSING_ROOM_TYPE.QUADRUPLE]: Bed,
	[ENUM_HOUSING_ROOM_TYPE.SUITE]: BedDouble,
	[ENUM_HOUSING_ROOM_TYPE.FAMILY]: Bed
};

interface IOptionEventSheetRoomsProps {
	rooms: IOptionEventSheetRoom[];
}

export const OptionEventSheetRooms: FC<IOptionEventSheetRoomsProps> = ({
	rooms
}) => {
	const { t } = useTranslation(["preview_option_page", "options"]);

	if (!rooms.length) return null;

	return (
		<div>
			<h4 className="font-semibold mb-3">{t("sheet.rooms")}</h4>
			<div className="flex flex-col gap-3">
				{rooms.map((room, index) => {
					const typeLabel = room.typ
						? t(HOUSING_ROOM_TYPE_LABELS[room.typ], {
								ns: "options"
							})
						: "";
					const title = room.name || typeLabel;
					const subtitle =
						room.name && typeLabel && room.name !== typeLabel
							? typeLabel
							: undefined;

					return (
						<OptionEventSheetItemCard
							key={`${title}-${index}`}
							icon={room.typ ? ROOM_ICONS[room.typ] : Bed}
							title={title}
							subtitle={subtitle}
							badgeCount={room.pax}
							badgeLabel={
								room.pax != null
									? t("sheet.guests", { count: room.pax })
									: undefined
							}
							description={room.description}
						/>
					);
				})}
			</div>
		</div>
	);
};

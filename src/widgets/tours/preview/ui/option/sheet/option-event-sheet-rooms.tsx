import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { HOUSING_ROOM_TYPE_LABELS } from "@/entities/tour";
import type { IOptionEventSheetRoom } from "@/entities/tour/preview-tour";

import { getSheetRoomIcon } from "../../../model";

import { OptionEventSheetItemCard } from "./option-event-sheet-item-card";

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
							icon={getSheetRoomIcon(room.typ)}
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

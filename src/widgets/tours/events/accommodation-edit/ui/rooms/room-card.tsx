import { type FC } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomCollapsibleListItem, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_ROOMS,
	type TAccommodationEditSchema
} from "@/entities/tour";

import {
	ENUM_FORM_SECTION,
	ROOM_DATA_LIST,
	getRoomDisplayName
} from "../../model";

import { RoomMenu } from "./room-menu";

interface IRoomCardProps {
	form: UseFormReturn<TAccommodationEditSchema>;
	onRemove: () => void;
	index: number;
	readOnly?: boolean;
}

export const RoomCard: FC<IRoomCardProps> = ({
	form,
	onRemove,
	index,
	readOnly = false
}) => {
	const { t } = useTranslation("accommodation_edit_page");
	const { t: tOptions } = useTranslation("options");
	const roomPath =
		`${ENUM_FORM_SECTION.ROOMS}.${ENUM_FORM_ROOMS.ROOMS_LIST}.${index}` as const;
	const roomName = useWatch({
		control: form.control,
		name: `${roomPath}.${ENUM_FORM_ROOMS.ROOM_NAME}`
	});

	return (
		<CustomCollapsibleListItem
			value={String(index)}
			control={form.control}
			name={roomPath}
			title={t("form.rooms.details.room_item", { index: index + 1 })}
			description={roomName && getRoomDisplayName(roomName, tOptions)}
			actions={!readOnly ? <RoomMenu onRemove={onRemove} /> : null}
		>
			<div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
				{ROOM_DATA_LIST.map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form?.control}
						name={`${roomPath}.${key}`}
						t={t}
						disabled={readOnly}
						{...item}
					/>
				))}
			</div>
		</CustomCollapsibleListItem>
	);
};

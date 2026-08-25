import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_ROOMS,
	type TAccommodationEditSchema
} from "@/entities/tour";

import { ENUM_FORM_SECTION, ROOM_DATA_LIST } from "../../model";

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
	return (
		<Card className="relative">
			<CardHeader className="flex items-center justify-between">
				{t("form.rooms.details.room_item", { index: index + 1 })}
			</CardHeader>
			<CardContent className="grid gap-1">
				{!readOnly ? (
					<div className="absolute top-0 right-0">
						<RoomMenu onRemove={onRemove} />
					</div>
				) : null}
				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{ROOM_DATA_LIST.map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form?.control}
							name={`${ENUM_FORM_SECTION.ROOMS}.${ENUM_FORM_ROOMS.ROOMS_LIST}.${index}.${key}`}
							t={t}
							disabled={readOnly}
							{...item}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

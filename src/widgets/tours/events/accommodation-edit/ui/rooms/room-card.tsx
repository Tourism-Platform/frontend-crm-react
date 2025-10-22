import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CustomField } from "@/shared/ui";

import { ROOM_DATA_LIST, type TRoomsSchema } from "../../model";

import { RoomMenu } from "./room-menu";

interface IRoomCardProps {
	form: UseFormReturn<TRoomsSchema>;
	onRemove: () => void;
	index: number;
}

export const RoomCard: FC<IRoomCardProps> = ({ form, onRemove, index }) => {
	const { t } = useTranslation("accommodation_edit_page");
	return (
		<Card className="relative">
			<CardHeader>
				{t("rooms.form.fields.title", { number: index + 1 })}
			</CardHeader>
			<CardContent className="grid gap-1">
				<div className="absolute top-0 right-0">
					<RoomMenu onRemove={onRemove} />
				</div>
				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{ROOM_DATA_LIST.map(({ key, ...item }, index) => (
						<CustomField
							key={key}
							control={form?.control}
							name={key}
							t={t}
							className={
								index === 0 ? "col-span-1" : "col-span-2"
							}
							{...item}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

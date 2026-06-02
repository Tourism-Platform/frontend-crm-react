import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_ROOMS,
	type TAccommodationEditSchema
} from "@/entities/tour";

import { ENUM_FORM_SECTION } from "../../model";

import { RoomCard } from "./room-card";

interface IRoomsProps {
	form: UseFormReturn<TAccommodationEditSchema>;
}

const RoomsDetailsBase: FC<IRoomsProps> = ({ form }) => {
	const { t } = useTranslation("accommodation_edit_page");
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.ROOMS}.${ENUM_FORM_ROOMS.ROOMS_LIST}`
	});

	const handleAddRoom = () => {
		append({
			[ENUM_FORM_ROOMS.ROOM_NAME]: "",
			[ENUM_FORM_ROOMS.DESCRIPTION]: ""
		});
	};

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("form.rooms.details.title")}</h2>

			<div className="grid gap-4">
				{fields.map((field, index) => (
					<RoomCard
						key={field.id}
						form={form}
						index={index}
						onRemove={() => remove(index)}
					/>
				))}

				<div>
					<Button
						variant="outline"
						type="button"
						onClick={handleAddRoom}
						className="gap-2"
					>
						<p>{t("form.rooms.details.form.buttons.add")}</p>
						<PlusIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export const RoomsDetails = withErrorBoundary(RoomsDetailsBase);

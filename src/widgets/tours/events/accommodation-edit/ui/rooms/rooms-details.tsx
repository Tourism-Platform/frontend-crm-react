import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

import { type TRoomsSchema } from "../../model";

import { RoomCard } from "./room-card";

interface IRoomsDetailsProps {
	form: UseFormReturn<TRoomsSchema>;
}

export const RoomsDetails: FC<IRoomsDetailsProps> = ({ form }) => {
	const { t } = useTranslation("accommodation_edit_page");

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "rooms"
	});

	const handleAddRoom = () => {
		append({
			name: "",
			details: ""
		});
	};

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("rooms.title")}</h2>

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
						<p>{t("rooms.buttons.add")}</p>
						<PlusIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

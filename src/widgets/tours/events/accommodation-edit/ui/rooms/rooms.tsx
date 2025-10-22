import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Form } from "@/shared/ui";

import { ROOMS_SCHEMA, type TRoomsSchema } from "../../model";

import { RoomCard } from "./room-card";

export const Rooms: FC = () => {
	const { t } = useTranslation("accommodation_edit_page");
	const form = useForm<TRoomsSchema>({
		resolver: zodResolver(ROOMS_SCHEMA),
		defaultValues: {
			rooms: []
		},
		mode: "onSubmit"
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "rooms" // имя массива в твоей схеме
	});

	const handleAddFlight = () => {
		append({
			name: "",
			details: ""
		});
	};
	function onSubmit(data: TRoomsSchema) {
		console.log("Form submitted:", data);
	}
	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("rooms.title")}</h2>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="grid gap-y-4"
				>
					{fields.map((field, index) => (
						<RoomCard
							key={field.id}
							form={form}
							onRemove={() => remove(index)}
							index={index}
						/>
					))}

					<div>
						<Button
							variant="outline"
							type="button"
							onClick={handleAddFlight}
						>
							<p>{t("rooms.buttons.add")}</p>
							<PlusIcon />
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Form } from "@/shared/ui";

import { ROOMS_SCHEMA, type TRoomsSchema } from "../../model";

import { RoomsDetails } from "./rooms-details";

export const Rooms: FC = () => {
	const { t } = useTranslation("accommodation_edit_page");
	const form = useForm<TRoomsSchema>({
		resolver: zodResolver(ROOMS_SCHEMA),
		defaultValues: {
			rooms: [
				{
					name: "",
					details: ""
				}
			]
		},
		mode: "onSubmit"
	});

	function onSubmit(data: TRoomsSchema) {
		console.log("Rooms form submitted:", data);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid gap-12"
			>
				<RoomsDetails form={form} />

				<div className="flex justify-end mt-6">
					<Button type="submit">{t("rooms.buttons.save")}</Button>
				</div>
			</form>
		</Form>
	);
};

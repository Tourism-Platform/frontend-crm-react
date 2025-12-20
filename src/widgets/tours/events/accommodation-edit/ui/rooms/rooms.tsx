import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";

import { Button, Form } from "@/shared/ui";

import { ROOMS_SCHEMA, type TRoomsSchema } from "../../model";

import { RoomsDetails } from "./rooms-details";

export const Rooms: FC = () => {
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

				<Button type="submit">SUBMIT</Button>
			</form>
		</Form>
	);
};

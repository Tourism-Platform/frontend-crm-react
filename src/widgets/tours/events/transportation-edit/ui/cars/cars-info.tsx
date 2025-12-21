import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";

import { Button, Form } from "@/shared/ui";

import { CARS_SCHEMA, type TCarsSchema } from "../../model";

import { CarsDetails } from "./cars-details";

export const CarsInfo: FC = () => {
	const form = useForm<TCarsSchema>({
		resolver: zodResolver(CARS_SCHEMA),
		defaultValues: {
			cars: [
				{
					car_name: "",
					pax: "",
					description: ""
				}
			]
		},
		mode: "onSubmit"
	});

	function onSubmit(data: TCarsSchema) {
		console.log("Cars form submitted:", data);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid gap-12"
			>
				<CarsDetails form={form} />

				<Button type="submit">SUBMIT</Button>
			</form>
		</Form>
	);
};

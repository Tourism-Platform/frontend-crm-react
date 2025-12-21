import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, Form } from "@/shared/ui";

import { CARS_SCHEMA, type TCarsSchema } from "../../model";

import { CarsDetails } from "./cars-details";

export const CarsInfo: FC = () => {
	const { t } = useTranslation("transportation_edit_page");
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

				<div className="flex justify-end mt-6">
					<Button type="submit">{t("cars.buttons.save")}</Button>
				</div>
			</form>
		</Form>
	);
};

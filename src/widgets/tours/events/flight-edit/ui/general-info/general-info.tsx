import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";

import { Button, Form, Separator } from "@/shared/ui";

import {
	BASE_FLIGHT_SCHEMA,
	ENUM_FLIGHT_TRANSPORT_TYPE,
	type TGeneralInfoSchema
} from "../../model";

import { DescriptionInfo } from "./description-info";
import { FlightInfo } from "./flight-info";

export const GeneralInfo: FC = () => {
	const form = useForm<TGeneralInfoSchema>({
		resolver: zodResolver(BASE_FLIGHT_SCHEMA),
		defaultValues: {
			transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
			route: [
				{
					transport_type: ENUM_FLIGHT_TRANSPORT_TYPE.FLY,
					airline_code: "",
					flight_number: "",
					departure_airport_code: "",
					arrival_airport_code: "",
					departure_date: null,
					arrival_date: null,
					departure_time: null,
					arrival_time: null,
					departure_timezone: "",
					arrival_timezone: "",
					departure_terminal: "",
					departure_gate: "",
					arrival_terminal: "",
					arrival_gate: ""
				}
			],
			description: ""
		},
		mode: "onSubmit"
	});
	function onSubmit(data: TGeneralInfoSchema) {
		console.log("Form submitted:", data);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="grid gap-10"
			>
				<FlightInfo form={form} />
				<Separator />
				<DescriptionInfo form={form} />

				<Button>SUBMIT</Button>
			</form>
		</Form>
	);
};

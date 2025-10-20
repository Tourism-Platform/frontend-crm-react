import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";

import { Button, Form, Separator } from "@/shared/ui";

import { GENERAL_INFO_SCHEMA, type TGeneralInfoSchema } from "../../model";

import { DescriptionInfo } from "./description-info";
import { TransportationInfo } from "./transportation-info";

export const GeneralInfo: FC = () => {
	const form = useForm<TGeneralInfoSchema>({
		resolver: zodResolver(GENERAL_INFO_SCHEMA),
		defaultValues: {
			transportation: [],
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
				className="grid gap-12"
			>
				<TransportationInfo form={form} />
				<Separator />
				<DescriptionInfo form={form} />

				<Button>SUBMIT</Button>
			</form>
		</Form>
	);
};

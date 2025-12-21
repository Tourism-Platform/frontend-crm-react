import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";

import { MULTIPLY_OPTIONS_MOCK } from "@/shared/config";
import { Button, Form, Separator } from "@/shared/ui";

import { GENERAL_INFO_SCHEMA, type TGeneralInfoSchema } from "../../model";

import { DescriptionInfo } from "./description-info";
import { OptionsDetails } from "./options-details";

export const GeneralInfo: FC = () => {
	const form = useForm<TGeneralInfoSchema>({
		resolver: zodResolver(GENERAL_INFO_SCHEMA),
		defaultValues: {
			description: "",
			options: MULTIPLY_OPTIONS_MOCK
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
				<OptionsDetails form={form} />
				<Separator />
				<DescriptionInfo form={form} />
				<Button type="submit">SUBMIT</Button>
			</form>
		</Form>
	);
};

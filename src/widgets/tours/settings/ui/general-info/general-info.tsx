import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { TOUR_CATEGORY_OPTIONS } from "@/shared/config";
import { Button, CustomField, CustomRangeField, Form } from "@/shared/ui";

import {
	ENUM_GENERAL_FORM,
	GENERAL_FORM_LIST,
	GENERAL_FORM_SCHEMA,
	type TGeneralFormSchema
} from "../../model";

export const GeneralInfo: FC = () => {
	const { t } = useTranslation("tour_settings_page");

	const startCategories = [
		TOUR_CATEGORY_OPTIONS[0].value,
		TOUR_CATEGORY_OPTIONS[2].value,
		TOUR_CATEGORY_OPTIONS[5].value
	];

	const form = useForm<TGeneralFormSchema>({
		resolver: zodResolver(GENERAL_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: {
			[ENUM_GENERAL_FORM.TOUR_TITLE]:
				"Embark on an Unforgettable Archaeological Journey",
			[ENUM_GENERAL_FORM.TOUR_TYPE]: "group",
			[ENUM_GENERAL_FORM.GROUP_SIZE]: 15,
			[ENUM_GENERAL_FORM.DURATION]: { from: 5, to: 7 },
			[ENUM_GENERAL_FORM.AGE_REQUIRES]: { from: 18, to: 65 },
			[ENUM_GENERAL_FORM.TOUR_CATEGORIES]: TOUR_CATEGORY_OPTIONS.filter(
				(option) => startCategories.includes(option.value)
			)
		}
	});

	function onSubmit(data: TGeneralFormSchema) {
		console.log("General Settings submitted:", data);
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-6"
			>
				<h2 className="text-xl">{t("general.title")}</h2>
				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{GENERAL_FORM_LIST().map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form?.control}
							name={key}
							t={t}
							{...item}
						/>
					))}
					<CustomRangeField
						control={form?.control}
						name={ENUM_GENERAL_FORM.DURATION}
						label="general.form.fields.duration.label"
						placeholder_left="general.form.fields.duration.placeholder_left"
						placeholder_right="general.form.fields.duration.placeholder_right"
						t={t}
					/>
					<CustomRangeField
						control={form?.control}
						name={ENUM_GENERAL_FORM.AGE_REQUIRES}
						label="general.form.fields.ageRequires.label"
						placeholder_left="general.form.fields.ageRequires.placeholder_left"
						placeholder_right="general.form.fields.ageRequires.placeholder_right"
						t={t}
					/>
					<CustomField
						control={form?.control}
						name={ENUM_GENERAL_FORM.TOUR_CATEGORIES}
						label="general.form.fields.tourCategories.label"
						placeholder="general.form.fields.tourCategories.placeholder"
						options={TOUR_CATEGORY_OPTIONS}
						fieldType="multiselect"
						className="col-span-2"
						badgeVariant="secondary"
						t={t}
					/>
				</div>
				<div className="flex justify-end mt-6">
					<Button type="submit">{t("general.buttons.save")}</Button>
				</div>
			</form>
		</Form>
	);
};

import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { TOUR_CATEGORY_OPTIONS } from "@/shared/config";
import { CustomField, CustomRangeField, Form } from "@/shared/ui";

import {
	ENUM_GENERAL_FORM,
	GENERAL_FORM_LIST,
	GENERAL_FORM_SCHEMA,
	type TGeneralFormSchema
} from "../../model";

export const GeneralForm: FC = () => {
	const { t } = useTranslation("tour_settings_page");

	const form = useForm<TGeneralFormSchema>({
		resolver: zodResolver(GENERAL_FORM_SCHEMA),
		mode: "onSubmit",
		defaultValues: {
			tourTitle: "Embark on an Unforgettable Archaeological Journey",
			tourType: "group",
			groupSize: 15,
			duration: { from: 5, to: 7 },
			ageRequires: { from: 18, to: 65 },
			tourCategories: [
				"history_culture",
				"classical_excursions",
				"adventure_outdoor",
				"wellness_spiritual",
				"photography_creative",
				"gastronomic_experiences"
			]
		}
	});

	return (
		<Form {...form}>
			<form className="grid grid-cols-2 gap-x-4 gap-y-1">
				{GENERAL_FORM_LIST.map(({ key, ...item }) => (
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
			</form>
		</Form>
	);
};

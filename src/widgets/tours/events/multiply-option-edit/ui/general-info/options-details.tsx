import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { type TGeneralInfoSchema } from "../../model";

import { OptionCard } from "./option-card";

interface IOptionsDetailsProps {
	form: UseFormReturn<TGeneralInfoSchema>;
}

export const OptionsDetails: FC<IOptionsDetailsProps> = ({ form }) => {
	const { t } = useTranslation("multiply_option_edit_page");
	const { fields } = useFieldArray({
		control: form.control,
		name: "options"
	});

	return (
		<div className="grid gap-4">
			<h3 className="text-lg font-medium">
				{t("general.options.title")}
			</h3>
			<div className="grid gap-4">
				{fields.map((field, index) => (
					<OptionCard key={field.id} form={form} index={index} />
				))}
			</div>
		</div>
	);
};

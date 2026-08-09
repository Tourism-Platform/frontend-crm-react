import { type FC } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_MULTIPLY_OPTION,
	type ITourEventOption,
	type TMultiplyOptionEditSchema
} from "@/entities/tour";

import { OptionsDetails } from "./options-details";

interface IGeneralInfoProps {
	form: UseFormReturn<TMultiplyOptionEditSchema>;
	onSubmit: () => Promise<void>;
	isLoading?: boolean;
}

const GeneralInfoBase: FC<IGeneralInfoProps> = ({
	form,
	onSubmit,
	isLoading = false
}) => {
	const { t } = useTranslation("multiply_option_edit_page");
	const options =
		(useWatch({
			control: form.control,
			name: ENUM_FORM_MULTIPLY_OPTION.OPTIONS
		}) as ITourEventOption[] | undefined) ?? [];

	const handleReorder = (nextOptions: ITourEventOption[]) => {
		form.setValue(
			ENUM_FORM_MULTIPLY_OPTION.OPTIONS,
			nextOptions as TMultiplyOptionEditSchema["options"],
			{
				shouldDirty: true
			}
		);
	};

	const handleRemove = (optionId: string) => {
		const nextOptions = options.filter((option) => option.id !== optionId);
		form.setValue(
			ENUM_FORM_MULTIPLY_OPTION.OPTIONS,
			nextOptions as TMultiplyOptionEditSchema["options"],
			{ shouldDirty: true }
		);
	};

	return (
		<div className="grid gap-10">
			<OptionsDetails
				options={options}
				onReorder={handleReorder}
				onRemove={handleRemove}
			/>
			{/* <Separator />
			<DescriptionInfo form={form} /> */}
			<div className="flex justify-end mt-6">
				<Button
					type="button"
					disabled={isLoading}
					onClick={() => {
						void onSubmit();
					}}
				>
					{t("general.buttons.save")}
				</Button>
			</div>
		</div>
	);
};

export const GeneralInfo = withErrorBoundary(GeneralInfoBase);

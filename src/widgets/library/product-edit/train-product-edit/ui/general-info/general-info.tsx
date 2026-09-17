import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { ENUM_LANGUAGES, i18nLanguageMapper } from "@/shared/config";
import {
	Button,
	CustomField,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_FORM_TRAIN_PRODUCT,
	ENUM_FORM_TRAIN_SECTION,
	emptyHopFormRow
} from "@/entities/supplier";

import { TRAIN_PRODUCT_NAME_FIELD, type TSlotProps } from "../../model";
import { TrainHopRow } from "../train-hop-row";

const GeneralInfoBase: FC<TSlotProps> = ({
	form,
	onSubmit,
	isLoading,
	isCreate
}) => {
	const { t, i18n } = useTranslation("train_product_edit_page");
	const language = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_TRAIN_SECTION.GENERAL}.${ENUM_FORM_TRAIN_PRODUCT.HOPS}`
	});

	return (
		<div className="grid gap-4">
			<div className="grid gap-x-4 gap-y-1 grid-cols-2">
				{TRAIN_PRODUCT_NAME_FIELD.map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form.control}
						name={`${ENUM_FORM_TRAIN_SECTION.GENERAL}.${key}`}
						t={t}
						{...item}
					/>
				))}
			</div>

			<div className="grid gap-4">
				{fields.map((field, index) => (
					<TrainHopRow
						key={field.id}
						form={form}
						index={index}
						language={language}
						onRemove={() => remove(index)}
					/>
				))}
			</div>

			<div className="flex flex-wrap justify-between gap-3">
				<Button
					type="button"
					variant="outline"
					onClick={() => append(emptyHopFormRow())}
				>
					<PlusIcon className="mr-1 h-4 w-4" />
					{t("form.general.flights.buttons.add")}
				</Button>
				<LoaderButton
					type="button"
					onClick={onSubmit}
					disabled={isLoading}
					isLoading={isLoading}
					label={
						isCreate
							? t("form.general.buttons.create")
							: t("form.general.buttons.save")
					}
					loadingLabel={t("form.general.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const GeneralInfo = withErrorBoundary(GeneralInfoBase);

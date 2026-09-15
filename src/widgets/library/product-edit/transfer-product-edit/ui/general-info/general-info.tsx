import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { CustomField, LoaderButton, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_TRANSFER_PRODUCT,
	ENUM_FORM_TRANSFER_SECTION
} from "@/entities/supplier";

import { TRANSFER_PRODUCT_NAME_FIELD, type TSlotProps } from "../../model";

const GeneralInfoBase: FC<TSlotProps> = ({
	form,
	onSubmit,
	isLoading,
	isCreate
}) => {
	const { t } = useTranslation("transfer_product_edit_page");
	const { key: nameKey, ...nameField } = TRANSFER_PRODUCT_NAME_FIELD;

	return (
		<div className="grid gap-4">
			<CustomField
				control={form.control}
				name={`${ENUM_FORM_TRANSFER_SECTION.GENERAL}.${nameKey ?? ENUM_FORM_TRANSFER_PRODUCT.NAME}`}
				t={t}
				{...nameField}
			/>
			<div className="flex justify-end">
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

import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { CustomField, LoaderButton, withErrorBoundary } from "@/shared/ui";

import { ENUM_FORM_TRANSFER_SECTION } from "@/entities/supplier";

import { TRANSFER_PRODUCT_NAME_FIELD, type TSlotProps } from "../../model";

const GeneralInfoBase: FC<TSlotProps> = ({
	form,
	onSubmit,
	isLoading,
	isCreate
}) => {
	const { t } = useTranslation("transfer_product_edit_page");

	return (
		<div className="grid gap-4">
			<div className="grid gap-x-4 gap-y-1 grid-cols-2">
				{TRANSFER_PRODUCT_NAME_FIELD.map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form.control}
						name={`${ENUM_FORM_TRANSFER_SECTION.GENERAL}.${key}`}
						t={t}
						{...item}
					/>
				))}
			</div>
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

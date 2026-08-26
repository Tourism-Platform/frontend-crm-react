import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { CustomField, LoaderButton, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_SECTION,
	INFORMATION_DATA_LIST,
	type TSlotProps
} from "../../model";

const GeneralInfoBase: FC<TSlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t } = useTranslation("information_edit_page");
	return (
		<div className="grid gap-12">
			<div className="grid gap-8">
				<div className="grid grid-cols-4 gap-x-4 gap-y-1">
					{INFORMATION_DATA_LIST().map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form?.control}
							name={`${ENUM_FORM_SECTION.GENERAL}.${key}`}
							t={t}
							{...item}
						/>
					))}
				</div>
				<div className="flex justify-end mt-6">
					<LoaderButton
						type="button"
						onClick={onSubmit}
						isLoading={isLoading}
						label={t("form.general.buttons.save")}
						loadingLabel={t("form.general.buttons.saving")}
					/>
				</div>
			</div>
		</div>
	);
};

export const GeneralInfo = withErrorBoundary(GeneralInfoBase);

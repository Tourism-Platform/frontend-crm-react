import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { LoaderButton, withErrorBoundary } from "@/shared/ui";

import { type TSlotProps } from "../../model";

import { GuidesDetails } from "./guides-details";

const GuidesInfoBase: FC<TSlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t } = useTranslation("guide_edit_page");

	return (
		<div className="grid gap-12">
			<GuidesDetails form={form} />

			<div className="flex justify-end mt-6">
				<LoaderButton
					type="button"
					onClick={onSubmit}
					isLoading={isLoading}
					label={t("form.guides.buttons.save")}
					loadingLabel={t("form.guides.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const GuidesInfo = withErrorBoundary(GuidesInfoBase);

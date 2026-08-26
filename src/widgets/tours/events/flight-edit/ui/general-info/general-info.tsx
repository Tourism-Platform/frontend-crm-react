import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { LoaderButton, Separator, withErrorBoundary } from "@/shared/ui";

import { type TSlotProps } from "../../model";

import { DescriptionInfo } from "./description-info";
import { FlightInfo } from "./flight-info";

const GeneralInfoBase: FC<TSlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t } = useTranslation("flight_edit_page");

	return (
		<div className="grid gap-12">
			<FlightInfo form={form} />
			<Separator />
			<DescriptionInfo form={form} />

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
	);
};

export const GeneralInfo = withErrorBoundary(GeneralInfoBase);

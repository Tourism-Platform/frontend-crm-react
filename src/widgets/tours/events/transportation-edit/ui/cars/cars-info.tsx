import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { LoaderButton, withErrorBoundary } from "@/shared/ui";

import { type TSlotProps } from "../../model";

import { CarsDetails } from "./cars-details";

const CarsInfoBase: FC<TSlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t } = useTranslation("transportation_edit_page");

	return (
		<div className="grid gap-12">
			<CarsDetails form={form} />

			<div className="flex justify-end mt-6">
				<LoaderButton
					type="button"
					onClick={onSubmit}
					isLoading={isLoading}
					label={t("form.cars.buttons.save")}
					loadingLabel={t("form.cars.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const CarsInfo = withErrorBoundary(CarsInfoBase);

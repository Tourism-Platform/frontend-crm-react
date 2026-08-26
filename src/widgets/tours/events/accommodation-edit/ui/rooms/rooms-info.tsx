import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { LoaderButton, withErrorBoundary } from "@/shared/ui";

import { type TSlotProps } from "../../model";

import { RoomsDetails } from "./rooms-details";

const RoomsInfoBase: FC<TSlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t } = useTranslation("accommodation_edit_page");

	return (
		<div className="grid gap-12">
			<RoomsDetails form={form} />

			<div className="flex justify-end mt-6">
				<LoaderButton
					type="button"
					onClick={onSubmit}
					isLoading={isLoading}
					label={t("form.rooms.buttons.save")}
					loadingLabel={t("form.rooms.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const RoomsInfo = withErrorBoundary(RoomsInfoBase);

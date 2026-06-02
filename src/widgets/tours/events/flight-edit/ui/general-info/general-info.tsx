import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, Separator, withErrorBoundary } from "@/shared/ui";

import { type ISlotProps } from "../../model";

import { DescriptionInfo } from "./description-info";
import { FlightInfo } from "./flight-info";

const GeneralInfoBase: FC<ISlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t } = useTranslation("flight_edit_page");

	return (
		<div className="grid gap-12">
			<FlightInfo form={form} />
			<Separator />
			<DescriptionInfo form={form} />

			<div className="flex justify-end mt-6">
				<Button type="button" onClick={onSubmit} disabled={isLoading}>
					{isLoading && (
						<Loader className="mr-2 h-4 w-4 animate-spin" />
					)}
					{isLoading
						? t("form.general.buttons.saving")
						: t("form.general.buttons.save")}
				</Button>
			</div>
		</div>
	);
};

export const GeneralInfo = withErrorBoundary(GeneralInfoBase);

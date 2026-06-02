import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, withErrorBoundary } from "@/shared/ui";

import { type ISlotProps } from "../../model";

import { RoomsDetails } from "./rooms-details";

const RoomsInfoBase: FC<ISlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t } = useTranslation("accommodation_edit_page");

	return (
		<div className="grid gap-12">
			<RoomsDetails form={form} />

			<div className="flex justify-end mt-6">
				<Button type="button" onClick={onSubmit} disabled={isLoading}>
					{isLoading && (
						<Loader className="mr-2 h-4 w-4 animate-spin" />
					)}
					{isLoading
						? t("form.rooms.buttons.saving")
						: t("form.rooms.buttons.save")}
				</Button>
			</div>
		</div>
	);
};

export const RoomsInfo = withErrorBoundary(RoomsInfoBase);

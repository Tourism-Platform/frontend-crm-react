import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, withErrorBoundary } from "@/shared/ui";

import { type ISlotProps } from "../../model";

import { ItemsDetails } from "./items-details";

const ItemsInfoBase: FC<ISlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t } = useTranslation("supplement_edit_page");

	return (
		<div className="grid gap-12">
			<ItemsDetails form={form} />

			<div className="flex justify-end mt-6">
				<Button type="button" onClick={onSubmit} disabled={isLoading}>
					{isLoading && (
						<Loader className="mr-2 h-4 w-4 animate-spin" />
					)}
					{isLoading
						? t("form.items.buttons.saving")
						: t("form.items.buttons.save")}
				</Button>
			</div>
		</div>
	);
};

export const ItemsInfo = withErrorBoundary(ItemsInfoBase);

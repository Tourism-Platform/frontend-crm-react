import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { LoaderButton, withErrorBoundary } from "@/shared/ui";

import { ENUM_EVENT_BACKEND } from "@/entities/tour";

import { EventPoolControls, type TEventPoolUiProps } from "@/features/tours";

import { type TSlotProps } from "../../model";

import { ItemsDetails } from "./items-details";

const ItemsInfoBase: FC<TSlotProps & TEventPoolUiProps> = ({
	form,
	onSubmit,
	isLoading,
	poolVariant,
	onPoolSelect
}) => {
	const { t } = useTranslation("supplement_edit_page");

	return (
		<div className="grid gap-12">
			<EventPoolControls
				form={form}
				variant={poolVariant}
				onSelect={onPoolSelect}
				eventTyp={ENUM_EVENT_BACKEND.SUPPLEMENTARY}
			/>
			<ItemsDetails form={form} />

			<div className="flex justify-end mt-6">
				<LoaderButton
					type="button"
					onClick={onSubmit}
					isLoading={isLoading}
					label={t("form.items.buttons.save")}
					loadingLabel={t("form.items.buttons.saving")}
				/>
			</div>
		</div>
	);
};

export const ItemsInfo = withErrorBoundary(ItemsInfoBase);

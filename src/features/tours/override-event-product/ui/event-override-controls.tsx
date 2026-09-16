import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button, LoaderButton } from "@/shared/ui";

import {
	type ENUM_EVENT_BACKEND_TYPE,
	ENUM_EVENT_MODE,
	type TOverrideProductFormValues,
	getOverridePerUnitPricing,
	getOverrideUnitOptions,
	mapEventOverrideFromDetails,
	useEventEditIds,
	useGetTourEventQuery
} from "@/entities/tour";

import { getPerUnitArm, useEventOverrideMutations } from "../model";

import { ClearOverrideAlert } from "./clear-override-alert";
import { OverrideEventDialog } from "./override-event-dialog";

interface IEventOverrideControlsProps {
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	isInherited: boolean;
	hasOverride?: boolean;
	supplyId?: string;
	onAfterChange?: (hasOverride: boolean) => void;
}

export const EventOverrideControls: FC<IEventOverrideControlsProps> = ({
	eventTyp,
	isInherited,
	hasOverride,
	supplyId,
	onAfterChange
}) => {
	const { t } = useTranslation("common_events");
	const { set, clear, isLoading } = useEventOverrideMutations(supplyId);
	const { tourId, optionId, eventId, eventOptionId, mode } =
		useEventEditIds();
	const [dialogOpen, setDialogOpen] = useState(false);
	const [clearOpen, setClearOpen] = useState(false);

	const { data: event } = useGetTourEventQuery(
		{
			tourId,
			optionId,
			eventId,
			...(mode === ENUM_EVENT_MODE.MULTI && { eventOptionId })
		},
		{ skip: !isInherited || !tourId || !optionId || !eventId }
	);

	const initialOverride = mapEventOverrideFromDetails(
		event?.details,
		supplyId
	);
	const units = getOverrideUnitOptions(event?.details, supplyId);
	const perUnitArm = getPerUnitArm(
		eventTyp,
		getOverridePerUnitPricing(event?.details, supplyId)
	);

	if (!isInherited) {
		return null;
	}

	const handleConfirmSet = async (values: TOverrideProductFormValues) => {
		try {
			await set(eventTyp, values);
			toast.success(t("override_product.toasts.set.success"));
			setDialogOpen(false);
			onAfterChange?.(true);
		} catch {
			toast.error(t("override_product.toasts.set.error"));
		}
	};

	const handleClear = async () => {
		try {
			await clear();
			toast.success(t("override_product.toasts.clear.success"));
			setClearOpen(false);
			onAfterChange?.(false);
		} catch {
			toast.error(t("override_product.toasts.clear.error"));
		}
	};

	return (
		<>
			<div className="flex flex-wrap gap-2">
				<LoaderButton
					type="button"
					variant="outline"
					onClick={() => setDialogOpen(true)}
					disabled={isLoading}
					isLoading={isLoading}
					label={
						hasOverride
							? t("override_product.buttons.edit")
							: t("override_product.buttons.set")
					}
					loadingLabel={
						hasOverride
							? t("override_product.buttons.edit")
							: t("override_product.buttons.set")
					}
				/>
				{hasOverride ? (
					<Button
						type="button"
						variant="outline"
						onClick={() => setClearOpen(true)}
						disabled={isLoading}
					>
						{t("override_product.buttons.clear")}
					</Button>
				) : null}
			</div>

			<OverrideEventDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				eventTyp={eventTyp}
				initialOverride={initialOverride}
				units={units}
				perUnitArm={perUnitArm}
				isSubmitting={isLoading}
				onConfirm={handleConfirmSet}
			/>

			<ClearOverrideAlert
				open={clearOpen}
				onOpenChange={setClearOpen}
				onConfirm={handleClear}
			/>
		</>
	);
};

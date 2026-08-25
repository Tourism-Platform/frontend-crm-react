import { Loader } from "lucide-react";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/shared/ui";

import {
	ENUM_EVENT_MODE,
	type TEventOverride,
	mapEventOverrideFromDetails,
	useEventEditIds,
	useGetTourEventQuery
} from "@/entities/tour";

import { type TOverrideEventKind, useEventOverrideMutations } from "../model";

import { ClearOverrideAlert } from "./clear-override-alert";
import { OverrideEventDialog } from "./override-event-dialog";

interface IEventOverrideControlsProps {
	kind: TOverrideEventKind;
	isInherited: boolean;
	hasOverride?: boolean;
	onAfterChange?: (hasOverride: boolean) => void;
}

export const EventOverrideControls: FC<IEventOverrideControlsProps> = ({
	kind,
	isInherited,
	hasOverride,
	onAfterChange
}) => {
	const { t } = useTranslation("common_events");
	const { set, clear, isLoading } = useEventOverrideMutations();
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

	const initialOverride = mapEventOverrideFromDetails(event?.details, kind);

	if (!isInherited) {
		return null;
	}

	const handleConfirmSet = async (data: TEventOverride) => {
		try {
			await set(data);
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
				<Button
					type="button"
					variant="outline"
					onClick={() => setDialogOpen(true)}
					disabled={isLoading}
				>
					{isLoading ? (
						<Loader className="mr-2 h-4 w-4 animate-spin" />
					) : null}
					{hasOverride
						? t("override_product.buttons.edit")
						: t("override_product.buttons.set")}
				</Button>
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
				kind={kind}
				initialOverride={initialOverride}
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

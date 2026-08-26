import { Loader } from "lucide-react";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button, LoaderButton } from "@/shared/ui";

import {
	type TEventOverride,
	mapEventOverrideFromDetails
} from "@/entities/tour";

import {
	ClearOverrideAlert,
	OverrideEventDialog,
	type TOverrideEventKind
} from "@/features/tours/override-event-product";

import { useRevisionEventOverrideMutations } from "../model";

interface IRevisionEventOverrideControlsProps {
	kind: TOverrideEventKind;
	isInherited: boolean;
	hasOverride?: boolean;
	details?: Record<string, unknown>;
	bookingId: string;
	eventId: string;
	optionIndex?: number | null;
	onAfterChange?: (hasOverride: boolean) => void;
}

export const RevisionEventOverrideControls: FC<
	IRevisionEventOverrideControlsProps
> = ({
	kind,
	isInherited,
	hasOverride,
	details,
	bookingId,
	eventId,
	optionIndex,
	onAfterChange
}) => {
	const { t } = useTranslation("common_events");
	const { set, clear, isSetting, isClearing, isLoading } =
		useRevisionEventOverrideMutations({
			bookingId,
			eventId,
			optionIndex
		});
	const [dialogOpen, setDialogOpen] = useState(false);
	const [clearOpen, setClearOpen] = useState(false);

	const initialOverride = mapEventOverrideFromDetails(details, kind);

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

	const setButtonLabel = () => {
		if (isSetting) {
			return t("override_product.buttons.setting");
		}
		if (hasOverride) {
			return t("override_product.buttons.edit");
		}
		return t("override_product.buttons.set");
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
					{isSetting ? (
						<Loader className="mr-2 h-4 w-4 animate-spin" />
					) : null}
					{setButtonLabel()}
				</Button>
				{hasOverride ? (
					<LoaderButton
						type="button"
						variant="outline"
						onClick={() => setClearOpen(true)}
						isLoading={isClearing}
						disabled={isLoading}
						label={t("override_product.buttons.clear")}
						loadingLabel={t("override_product.buttons.clearing")}
					/>
				) : null}
			</div>

			<OverrideEventDialog
				open={dialogOpen}
				onOpenChange={setDialogOpen}
				kind={kind}
				initialOverride={initialOverride}
				isSubmitting={isSetting}
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

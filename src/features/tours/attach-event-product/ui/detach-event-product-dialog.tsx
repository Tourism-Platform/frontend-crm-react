import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	Checkbox,
	Label,
	LoaderButton
} from "@/shared/ui";

import type { IEventProductDetach } from "@/entities/tour";

interface IDetachEventProductDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	hasOverride?: boolean;
	isSubmitting?: boolean;
	onConfirm: (data: IEventProductDetach) => void | Promise<void>;
}

/**
 * Detach confirmation (contract 3.1): the operator picks what the event keeps
 * of the product — `keep: "spec"` copies the resolved spec into the event,
 * `keep: "nothing"` leaves it empty — and whether the override is dropped.
 */
export const DetachEventProductDialog: FC<IDetachEventProductDialogProps> = ({
	open,
	onOpenChange,
	hasOverride,
	isSubmitting,
	onConfirm
}) => {
	const { t } = useTranslation("common_events");
	const [keep, setKeep] = useState<IEventProductDetach["keep"]>("spec");
	const [dropOverride, setDropOverride] = useState(true);

	useEffect(() => {
		if (open) {
			setKeep("spec");
			setDropOverride(true);
		}
	}, [open]);

	const handleConfirm = async () => {
		await onConfirm({
			keep,
			...(hasOverride ? { dropOverride } : {})
		});
	};

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{t("attach_product.detach_dialog.title")}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{t("attach_product.detach_dialog.description")}
					</AlertDialogDescription>
				</AlertDialogHeader>

				<div className="grid gap-3 py-2">
					<div className="flex items-start gap-2">
						<Checkbox
							id="detach-keep-spec"
							checked={keep === "spec"}
							onCheckedChange={(checked) => {
								if (checked === true) setKeep("spec");
							}}
						/>
						<Label
							htmlFor="detach-keep-spec"
							className="cursor-pointer font-normal"
						>
							{t("attach_product.detach_dialog.keep_spec")}
						</Label>
					</div>
					<div className="flex items-start gap-2">
						<Checkbox
							id="detach-keep-nothing"
							checked={keep === "nothing"}
							onCheckedChange={(checked) => {
								if (checked === true) setKeep("nothing");
							}}
						/>
						<Label
							htmlFor="detach-keep-nothing"
							className="cursor-pointer font-normal"
						>
							{t("attach_product.detach_dialog.keep_nothing")}
						</Label>
					</div>
					{hasOverride ? (
						<div className="flex items-start gap-2">
							<Checkbox
								id="detach-drop-override"
								checked={dropOverride}
								onCheckedChange={(checked) =>
									setDropOverride(checked === true)
								}
							/>
							<Label
								htmlFor="detach-drop-override"
								className="cursor-pointer font-normal"
							>
								{t(
									"attach_product.detach_dialog.drop_override"
								)}
							</Label>
						</div>
					) : null}
				</div>

				<AlertDialogFooter>
					<AlertDialogCancel disabled={isSubmitting}>
						{t("attach_product.detach_dialog.cancel")}
					</AlertDialogCancel>
					<LoaderButton
						type="button"
						onClick={(event) => {
							event.preventDefault();
							void handleConfirm();
						}}
						isLoading={Boolean(isSubmitting)}
						label={t("attach_product.detach_dialog.confirm")}
						loadingLabel={t(
							"attach_product.detach_dialog.confirming"
						)}
					/>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

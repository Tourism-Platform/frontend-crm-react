import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button, LoaderButton } from "@/shared/ui";

import type { ENUM_SUPPLIER_TYPE_TYPE } from "@/entities/supplier";
import type { IEventProductDetach, IEventProductLink } from "@/entities/tour";

import { useEventProductLinkMutations } from "../model";

import { AttachEventProductDialog } from "./attach-event-product-dialog";
import { DetachEventProductDialog } from "./detach-event-product-dialog";
import { OverrideChangeAlert } from "./override-change-alert";

interface IEventProductLinkControlsProps {
	typ: ENUM_SUPPLIER_TYPE_TYPE;
	productId?: string;
	variantId?: string | null;
	hasOverride?: boolean;
	supplyId?: string;
}

/**
 * Attach / change (relink) / detach controls.
 * Contract 3.1: "Change product" on a linked event is a RELINK (not attach);
 * detach is a POST with an explicit `{ keep, drop_override? }` body.
 */
export const EventProductLinkControls: FC<IEventProductLinkControlsProps> = ({
	typ,
	productId,
	variantId,
	hasOverride,
	supplyId
}) => {
	const { t } = useTranslation("common_events");
	const { attach, relink, detach, isLoading } =
		useEventProductLinkMutations(supplyId);
	const [open, setOpen] = useState(false);
	const [overrideWarnOpen, setOverrideWarnOpen] = useState(false);
	const [detachOpen, setDetachOpen] = useState(false);

	const isLinked = Boolean(productId);

	const handleChangeClick = () => {
		if (hasOverride) {
			setOverrideWarnOpen(true);
			return;
		}
		setOpen(true);
	};

	const handleConfirmLink = async (link: IEventProductLink) => {
		try {
			if (isLinked) {
				// Relink: the override warning was confirmed before the dialog
				// opened, so a confirmed change drops the stale override.
				await relink({
					...link,
					...(hasOverride ? { dropOverride: true } : {})
				});
			} else {
				await attach(link);
			}
			toast.success(t("attach_product.toasts.attach.success"));
			setOpen(false);
		} catch {
			toast.error(t("attach_product.toasts.attach.error"));
		}
	};

	const handleConfirmDetach = async (data: IEventProductDetach) => {
		try {
			await detach(data);
			toast.success(t("attach_product.toasts.detach.success"));
			setDetachOpen(false);
		} catch {
			toast.error(t("attach_product.toasts.detach.error"));
		}
	};

	return (
		<>
			<div className="flex flex-wrap gap-2">
				{!isLinked ? (
					<LoaderButton
						type="button"
						variant="outline"
						onClick={() => setOpen(true)}
						isLoading={isLoading}
						label={t("attach_product.buttons.attach")}
						loadingLabel={t("attach_product.buttons.attaching")}
					/>
				) : (
					<>
						<Button
							type="button"
							variant="outline"
							onClick={handleChangeClick}
							disabled={isLoading}
						>
							{t("attach_product.buttons.change")}
						</Button>
						<Button
							type="button"
							variant="outline"
							onClick={() => setDetachOpen(true)}
							disabled={isLoading}
						>
							{t("attach_product.buttons.detach")}
						</Button>
					</>
				)}
			</div>

			<AttachEventProductDialog
				open={open}
				onOpenChange={setOpen}
				typ={typ}
				initialProductId={productId}
				initialVariantId={variantId}
				isSubmitting={isLoading}
				onConfirm={handleConfirmLink}
			/>

			<OverrideChangeAlert
				open={overrideWarnOpen}
				onOpenChange={setOverrideWarnOpen}
				onConfirm={() => {
					setOverrideWarnOpen(false);
					setOpen(true);
				}}
			/>

			<DetachEventProductDialog
				open={detachOpen}
				onOpenChange={setDetachOpen}
				hasOverride={hasOverride}
				isSubmitting={isLoading}
				onConfirm={handleConfirmDetach}
			/>
		</>
	);
};

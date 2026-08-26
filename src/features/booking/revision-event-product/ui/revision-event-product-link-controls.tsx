import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button, LoaderButton } from "@/shared/ui";

import type { ENUM_SUPPLIER_TYPE_TYPE } from "@/entities/supplier";
import type { IEventProductLink } from "@/entities/tour";

import {
	AttachEventProductDialog,
	OverrideChangeAlert
} from "@/features/tours/attach-event-product";

import { useRevisionEventProductMutations } from "../model";

import { RevisionFrozenPriceNote } from "./revision-frozen-price-note";

interface IRevisionEventProductLinkControlsProps {
	bookingId: string;
	eventId: string;
	optionIndex?: number | null;
	typ: ENUM_SUPPLIER_TYPE_TYPE;
	productId?: string;
	variantId?: string | null;
	hasOverride?: boolean;
	onAfterChange?: () => void;
}

export const RevisionEventProductLinkControls: FC<
	IRevisionEventProductLinkControlsProps
> = ({
	bookingId,
	eventId,
	optionIndex,
	typ,
	productId,
	variantId,
	hasOverride,
	onAfterChange
}) => {
	const { t } = useTranslation("common_events");
	const { attach, detach, isAttaching, isDetaching, isLoading } =
		useRevisionEventProductMutations({
			bookingId,
			eventId,
			optionIndex
		});
	const [open, setOpen] = useState(false);
	const [overrideWarnOpen, setOverrideWarnOpen] = useState(false);

	const isLinked = Boolean(productId);

	const handleChangeClick = () => {
		if (hasOverride) {
			setOverrideWarnOpen(true);
			return;
		}
		setOpen(true);
	};

	const handleConfirmAttach = async (link: IEventProductLink) => {
		try {
			await attach(link);
			toast.success(t("attach_product.toasts.attach.success"));
			setOpen(false);
			onAfterChange?.();
		} catch {
			toast.error(t("attach_product.toasts.attach.error"));
		}
	};

	const handleDetach = async () => {
		try {
			await detach();
			toast.success(t("attach_product.toasts.detach.success"));
			onAfterChange?.();
		} catch {
			toast.error(t("attach_product.toasts.detach.error"));
		}
	};

	return (
		<>
			<div className="flex flex-col gap-2">
				{isLinked ? <RevisionFrozenPriceNote /> : null}
				<div className="flex flex-wrap gap-2">
					{!isLinked ? (
						<LoaderButton
							type="button"
							variant="outline"
							onClick={() => setOpen(true)}
							isLoading={isAttaching}
							disabled={isLoading}
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
							<LoaderButton
								type="button"
								variant="outline"
								onClick={handleDetach}
								isLoading={isDetaching}
								disabled={isLoading}
								label={t("attach_product.buttons.detach")}
								loadingLabel={t(
									"attach_product.buttons.detaching"
								)}
							/>
						</>
					)}
				</div>
			</div>

			<AttachEventProductDialog
				open={open}
				onOpenChange={setOpen}
				typ={typ}
				initialProductId={productId}
				initialVariantId={variantId}
				isSubmitting={isAttaching}
				onConfirm={handleConfirmAttach}
			/>

			<OverrideChangeAlert
				open={overrideWarnOpen}
				onOpenChange={setOverrideWarnOpen}
				onConfirm={() => {
					setOverrideWarnOpen(false);
					setOpen(true);
				}}
			/>
		</>
	);
};

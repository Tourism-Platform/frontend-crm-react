import { Loader } from "lucide-react";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/shared/ui";

import type { ENUM_SUPPLIER_TYPE_TYPE } from "@/entities/supplier";
import type { IEventProductLink } from "@/entities/tour";

import { useEventProductLinkMutations } from "../model";

import { AttachEventProductDialog } from "./attach-event-product-dialog";
import { OverrideChangeAlert } from "./override-change-alert";

interface IEventProductLinkControlsProps {
	typ: ENUM_SUPPLIER_TYPE_TYPE;
	productId?: string;
	variantId?: string | null;
	hasOverride?: boolean;
}

export const EventProductLinkControls: FC<IEventProductLinkControlsProps> = ({
	typ,
	productId,
	variantId,
	hasOverride
}) => {
	const { t } = useTranslation("common_events");
	const { attach, detach, isLoading } = useEventProductLinkMutations();
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
		} catch {
			toast.error(t("attach_product.toasts.attach.error"));
		}
	};

	const handleDetach = async () => {
		try {
			await detach();
			toast.success(t("attach_product.toasts.detach.success"));
		} catch {
			toast.error(t("attach_product.toasts.detach.error"));
		}
	};

	return (
		<>
			<div className="flex flex-wrap gap-2">
				{!isLinked ? (
					<Button
						type="button"
						variant="outline"
						onClick={() => setOpen(true)}
						disabled={isLoading}
					>
						{isLoading ? (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						) : null}
						{isLoading
							? t("attach_product.buttons.attaching")
							: t("attach_product.buttons.attach")}
					</Button>
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
							onClick={handleDetach}
							disabled={isLoading}
						>
							{isLoading ? (
								<Loader className="mr-2 h-4 w-4 animate-spin" />
							) : null}
							{isLoading
								? t("attach_product.buttons.detaching")
								: t("attach_product.buttons.detach")}
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

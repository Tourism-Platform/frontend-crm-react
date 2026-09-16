import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle
} from "@/shared/ui";

import type { ENUM_SUPPLIER_TYPE_TYPE } from "@/entities/supplier";
import {
	type ENUM_EVENT_BACKEND_TYPE,
	type IEventProductLink,
	type TAddPoolMemberIntent
} from "@/entities/tour";

import { AttachEventProductDialog } from "@/features/tours/attach-event-product";

import { resolvePoolErrorMessage } from "../model";

import { AttachEventSupplierDialog } from "./attach-event-supplier-dialog";

interface IAddEventPoolMemberDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	eventTyp: ENUM_EVENT_BACKEND_TYPE;
	supplierTyp?: ENUM_SUPPLIER_TYPE_TYPE;
	isSubmitting?: boolean;
	onAdd: (intent: TAddPoolMemberIntent) => Promise<void>;
}

const choiceClassName =
	"rounded-xl border bg-card p-4 text-left transition-colors hover:bg-muted/40 disabled:pointer-events-none disabled:opacity-50";

export const AddEventPoolMemberDialog: FC<IAddEventPoolMemberDialogProps> = ({
	open,
	onOpenChange,
	eventTyp,
	supplierTyp,
	isSubmitting,
	onAdd
}) => {
	const { t } = useTranslation("common_events");
	const [productOpen, setProductOpen] = useState(false);
	const [supplierOpen, setSupplierOpen] = useState(false);

	const handleInline = async () => {
		try {
			await onAdd({ kind: "empty", typ: eventTyp });
			onOpenChange(false);
			toast.success(t("pool.toasts.add.success"));
		} catch (error) {
			toast.error(
				t(resolvePoolErrorMessage(error, "pool.toasts.add.error"))
			);
		}
	};

	const handleProduct = async (link: IEventProductLink) => {
		try {
			await onAdd({ kind: "product", typ: eventTyp, link });
			setProductOpen(false);
			onOpenChange(false);
			toast.success(t("pool.toasts.add.success"));
		} catch (error) {
			toast.error(
				t(resolvePoolErrorMessage(error, "pool.toasts.add.error"))
			);
		}
	};

	return (
		<>
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t("pool.add.title")}</DialogTitle>
						<DialogDescription>
							{t("pool.add.description")}
						</DialogDescription>
					</DialogHeader>
					<div className="grid gap-3">
						<button
							type="button"
							disabled={isSubmitting}
							onClick={handleInline}
							className={choiceClassName}
						>
							<p className="font-semibold">
								{t("pool.add.inline.title")}
							</p>
							<p className="mt-1 text-sm text-muted-foreground">
								{t("pool.add.inline.description")}
							</p>
						</button>
						{supplierTyp ? (
							<>
								<button
									type="button"
									disabled={isSubmitting}
									onClick={() => setSupplierOpen(true)}
									className={choiceClassName}
								>
									<p className="font-semibold">
										{t("pool.add.supplier.title")}
									</p>
									<p className="mt-1 text-sm text-muted-foreground">
										{t("pool.add.supplier.description")}
									</p>
								</button>
								<button
									type="button"
									disabled={isSubmitting}
									onClick={() => setProductOpen(true)}
									className={choiceClassName}
								>
									<p className="font-semibold">
										{t("pool.add.product.title")}
									</p>
									<p className="mt-1 text-sm text-muted-foreground">
										{t("pool.add.product.description")}
									</p>
								</button>
							</>
						) : null}
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="ghost"
							onClick={() => onOpenChange(false)}
							disabled={isSubmitting}
						>
							{t("pool.cancel")}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{supplierTyp ? (
				<>
					<AttachEventSupplierDialog
						open={supplierOpen}
						onOpenChange={setSupplierOpen}
						eventTyp={eventTyp}
						supplierTyp={supplierTyp}
						isSubmitting={isSubmitting}
						onAdd={onAdd}
						onAdded={() => onOpenChange(false)}
					/>
					<AttachEventProductDialog
						open={productOpen}
						onOpenChange={setProductOpen}
						typ={supplierTyp}
						isSubmitting={isSubmitting}
						onConfirm={handleProduct}
					/>
				</>
			) : null}
		</>
	);
};

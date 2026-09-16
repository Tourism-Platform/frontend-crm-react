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
	DialogTitle,
	LoaderButton
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

	const handleSupplier = async (supplierId: string) => {
		try {
			await onAdd({
				kind: "supplier",
				typ: eventTyp,
				supplierId
			});
			setSupplierOpen(false);
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
						<DialogTitle>{t("pool.add")}</DialogTitle>
						<DialogDescription>
							{t("pool.add_description")}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="flex flex-wrap gap-2 sm:justify-start">
						<LoaderButton
							type="button"
							variant="outline"
							onClick={handleInline}
							isLoading={Boolean(isSubmitting)}
							label={t("pool.add_inline")}
							loadingLabel={t("pool.adding")}
						/>
						{supplierTyp ? (
							<>
								<Button
									type="button"
									variant="outline"
									onClick={() => setSupplierOpen(true)}
									disabled={isSubmitting}
								>
									{t("pool.add_supplier")}
								</Button>
								<Button
									type="button"
									variant="outline"
									onClick={() => setProductOpen(true)}
									disabled={isSubmitting}
								>
									{t("pool.add_product")}
								</Button>
							</>
						) : null}
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
						supplierTyp={supplierTyp}
						isSubmitting={isSubmitting}
						onConfirm={handleSupplier}
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

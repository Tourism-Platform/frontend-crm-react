import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/shared/ui";

interface IClearOverrideAlertProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
}

export const ClearOverrideAlert: FC<IClearOverrideAlertProps> = ({
	open,
	onOpenChange,
	onConfirm
}) => {
	const { t } = useTranslation("common_events");

	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						{t("override_product.clear_warn.title")}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{t("override_product.clear_warn.description")}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>
						{t("override_product.clear_warn.cancel")}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={(event) => {
							event.preventDefault();
							onConfirm();
						}}
					>
						{t("override_product.clear_warn.confirm")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

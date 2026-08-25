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

interface IOverrideChangeAlertProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirm: () => void;
}

export const OverrideChangeAlert: FC<IOverrideChangeAlertProps> = ({
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
						{t("attach_product.override_warn.title")}
					</AlertDialogTitle>
					<AlertDialogDescription>
						{t("attach_product.override_warn.description")}
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>
						{t("attach_product.override_warn.cancel")}
					</AlertDialogCancel>
					<AlertDialogAction
						onClick={(event) => {
							event.preventDefault();
							onConfirm();
						}}
					>
						{t("attach_product.override_warn.confirm")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

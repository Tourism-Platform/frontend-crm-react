import { type FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "../../../shadcn-ui/alert-dialog";
import { buttonVariants } from "../../../shadcn-ui/button";
import { type IConfirmRequest, subscribeConfirm } from "../model/confirm-store";

/** Renders `requestConfirm` dialogs; mount once in the app root. */
export const ConfirmHost: FC = () => {
	const { t } = useTranslation("common");
	const [request, setRequest] = useState<IConfirmRequest | null>(null);

	useEffect(() => subscribeConfirm(setRequest), []);

	return (
		<AlertDialog
			open={Boolean(request)}
			onOpenChange={(open) => {
				if (!open) request?.resolve(false);
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{request?.title}</AlertDialogTitle>
					{request?.description ? (
						<AlertDialogDescription>
							{request.description}
						</AlertDialogDescription>
					) : null}
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={() => request?.resolve(false)}>
						{request?.cancelLabel ?? t("confirm.cancel")}
					</AlertDialogCancel>
					<AlertDialogAction
						className={cn(
							request?.destructive &&
								buttonVariants({ variant: "destructive" })
						)}
						onClick={() => request?.resolve(true)}
					>
						{request?.confirmLabel ?? t("confirm.ok")}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

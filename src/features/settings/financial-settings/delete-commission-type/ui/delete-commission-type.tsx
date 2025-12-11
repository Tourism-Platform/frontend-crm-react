import { type FC, type ReactNode } from "react";
import { useTranslation } from "react-i18next";

import {
	Button,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Separator
} from "@/shared/ui";

interface IDeleteCommissionTypeProps {
	trigger: ReactNode;
	className?: string;
	onDelete: () => void;
}

export const DeleteCommissionType: FC<IDeleteCommissionTypeProps> = ({
	trigger,
	className,
	onDelete
}) => {
	const { t } = useTranslation("financial_settings_page");

	return (
		<Dialog>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent className="max-w-[450px]">
				<DialogHeader>
					<DialogTitle>
						{t("commission_type.menu.delete.form.title")}
					</DialogTitle>
					<DialogDescription className="sr-only">
						{t("commission_type.menu.delete.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						{t("commission_type.menu.delete.form.warning")}
					</p>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							{t(
								"commission_type.menu.delete.form.buttons.decline"
							)}
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							type="button"
							variant="destructive"
							onClick={onDelete}
						>
							{t(
								"commission_type.menu.delete.form.buttons.confirm"
							)}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

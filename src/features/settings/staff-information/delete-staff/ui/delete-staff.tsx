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

interface IDeleteStaffProps {
	trigger: ReactNode;
	className?: string;
	id?: string;
	onDelete?: (id: string) => void;
}

export const DeleteStaff: FC<IDeleteStaffProps> = ({
	trigger,
	className,
	id,
	onDelete
}) => {
	const { t } = useTranslation("staff_information_page");

	function handleDelete() {
		console.log("Staff deleted");
		if (onDelete && id) {
			onDelete(id);
		}
	}

	return (
		<Dialog>
			<DialogTrigger asChild className={className}>
				{trigger}
			</DialogTrigger>
			<DialogContent className="max-w-[450px]">
				<DialogHeader>
					<DialogTitle>{t("menu.delete.form.title")}</DialogTitle>
					<DialogDescription className="sr-only">
						{t("menu.delete.form.title")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="py-4">
					<p className="text-sm text-muted-foreground">
						{t("menu.delete.form.warning")}
					</p>
				</div>
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant="outline">
							{t("menu.delete.form.buttons.decline")}
						</Button>
					</DialogClose>
					<DialogClose asChild>
						<Button
							type="button"
							variant="destructive"
							onClick={handleDelete}
						>
							{t("menu.delete.form.buttons.confirm")}
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

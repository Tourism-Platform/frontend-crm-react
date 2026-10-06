import { MoreHorizontal } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/shared/ui";

interface IDraggableDayItemMenuProps {
	onRemove?: () => void;
	/** Whole-event copy — omitted for nested alternatives. */
	onDuplicate?: () => void;
	/** Saves this alternative as a library entry — omitted for choice slots. */
	onSaveToLibrary?: () => void;
}

export const DraggableDayItemMenu: FC<IDraggableDayItemMenuProps> = ({
	onRemove,
	onDuplicate,
	onSaveToLibrary
}) => {
	const { t } = useTranslation("tour_itinerary_page");

	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger onClick={(e) => e.preventDefault()} asChild>
				<Button
					variant={"ghost"}
					size={"icon"}
					type="button"
					className="hover:!bg-transparent !text-muted-foreground"
				>
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				{onDuplicate && (
					<DropdownMenuItem
						onClick={(e) => {
							e.preventDefault();
							onDuplicate();
						}}
					>
						{t("menu.duplicate")}
					</DropdownMenuItem>
				)}
				{onSaveToLibrary && (
					<DropdownMenuItem
						onClick={(e) => {
							e.preventDefault();
							onSaveToLibrary();
						}}
					>
						{t("menu.save_to_library")}
					</DropdownMenuItem>
				)}
				<DropdownMenuItem
					onClick={(e) => {
						e.preventDefault();
						onRemove?.();
					}}
				>
					{t("menu.remove")}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

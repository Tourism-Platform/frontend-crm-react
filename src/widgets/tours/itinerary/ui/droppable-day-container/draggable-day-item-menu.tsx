import { MoreHorizontal } from "lucide-react";
import { type FC } from "react";

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/shared/ui";

interface IDraggableDayItemMenuProps {
	onRemove?: () => void;
}

export const DraggableDayItemMenu: FC<IDraggableDayItemMenuProps> = ({
	onRemove
}) => {
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
				<DropdownMenuItem
					onClick={(e) => {
						e.preventDefault();
						console.log("Remove DraggableDayItemMenu");
						onRemove?.();
					}}
				>
					Remove
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

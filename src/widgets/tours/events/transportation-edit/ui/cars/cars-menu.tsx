import { MoreHorizontal } from "lucide-react";
import { type FC } from "react";

import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/shared/ui";

interface ICarsMenuProps {
	onRemove: () => void;
}

export const CarsMenu: FC<ICarsMenuProps> = ({ onRemove }) => {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
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
				<DropdownMenuItem onClick={onRemove}>Remove</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

import type { Table } from "@tanstack/react-table";
import { Columns3Icon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from "@/shared/ui";

interface IVisibilityFilterProps {
	table: Table<any>;
}

export const VisibilityFilter: FC<IVisibilityFilterProps> = ({ table }) => {
	const { t } = useTranslation("common");
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Columns3Icon
						className="-ms-1 opacity-60"
						size={16}
						aria-hidden="true"
					/>
					{t("table.view.title")}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>{t("table.view.toggle")}</DropdownMenuLabel>
				{table
					.getAllColumns()
					.filter((column) => column.getCanHide())
					.map((column) => {
						return (
							<DropdownMenuCheckboxItem
								key={column.id}
								className="capitalize"
								checked={column.getIsVisible()}
								onCheckedChange={(value) =>
									column.toggleVisibility(!!value)
								}
								onSelect={(event) => event.preventDefault()}
							>
								{column.id}
							</DropdownMenuCheckboxItem>
						);
					})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

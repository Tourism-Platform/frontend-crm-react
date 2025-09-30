import type { Table } from "@tanstack/react-table";
import { CircleXIcon, ListFilterIcon } from "lucide-react";
import { type FC, type RefObject } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Input } from "@/shared/ui";

import type { IItem } from "../../model";

interface ISearchFilterProps {
	// add your props here
	id: string;
	inputRef: RefObject<HTMLInputElement | null>;
	table: Table<IItem>;
}

export const SearchFilter: FC<ISearchFilterProps> = ({
	id,
	inputRef,
	table
}) => {
	const { t } = useTranslation("common");
	return (
		<div className="relative">
			<Input
				id={`${id}-input`}
				ref={inputRef}
				className={cn(
					"peer min-w-60 ps-9",
					Boolean(table.getColumn("name")?.getFilterValue()) && "pe-9"
				)}
				value={
					(table.getColumn("name")?.getFilterValue() ?? "") as string
				}
				onChange={(e) =>
					table.getColumn("name")?.setFilterValue(e.target.value)
				}
				placeholder={t("table.search")}
				type="text"
				aria-label={t("table.search")}
			/>
			<div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
				<ListFilterIcon size={16} aria-hidden="true" />
			</div>
			{Boolean(table.getColumn("name")?.getFilterValue()) && (
				<button
					className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
					aria-label="Clear filter"
					onClick={() => {
						table.getColumn("name")?.setFilterValue("");
						if (inputRef.current) {
							inputRef.current.focus();
						}
					}}
				>
					<CircleXIcon size={16} aria-hidden="true" />
				</button>
			)}
		</div>
	);
};

import { CircleXIcon, ListFilterIcon } from "lucide-react";
import type { FC, RefObject } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Input } from "@/shared/ui";

type TCatalogToursSearchInputProps = {
	inputRef: RefObject<HTMLInputElement | null>;
	value: string;
	onChange: (value: string) => void;
};

export const CatalogToursSearchInput: FC<TCatalogToursSearchInputProps> = ({
	inputRef,
	value,
	onChange
}) => {
	const { t } = useTranslation("common");

	return (
		<div className="relative">
			<Input
				ref={inputRef}
				className={cn("peer min-w-60 ps-9", Boolean(value) && "pe-9")}
				value={value}
				onChange={(event) => {
					onChange(event.target.value);
				}}
				placeholder={t("table.search")}
				type="text"
				aria-label={t("table.search")}
			/>
			<div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
				<ListFilterIcon size={16} aria-hidden="true" />
			</div>
			{Boolean(value) && (
				<button
					type="button"
					className="absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md text-muted-foreground/80 outline-none transition-[color,box-shadow] hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus:z-10"
					aria-label={t("table.search")}
					onClick={() => {
						onChange("");
						inputRef.current?.focus();
					}}
				>
					<CircleXIcon size={16} aria-hidden="true" />
				</button>
			)}
		</div>
	);
};

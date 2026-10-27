import type { FC, ReactNode } from "react";

import { cn } from "@/shared/lib";

import { CopyableValue, type TCopyableKind } from "../../copyable-value";

const EMPTY = "—";

export interface ICustomFieldPreviewProps {
	label: string;
	value?: string | number | null;
	valueNode?: ReactNode;
	/** Значение копируется по клику; тип задаёт начертание (UUID, ИНН — моноширинным) */
	copy?: TCopyableKind;
	/**
	 * stacked — подпись над значением (по умолчанию);
	 * inline — «подпись: значение» одной мелкой строкой, пустое значение — прочерк
	 */
	layout?: "stacked" | "inline";
	className?: string;
}

export const CustomFieldPreview: FC<ICustomFieldPreviewProps> = ({
	label,
	value,
	valueNode,
	copy,
	layout = "stacked",
	className
}) => {
	if (layout === "inline") {
		return (
			<p
				className={cn(
					"flex max-w-full min-w-0 items-center gap-1 text-xs text-muted-foreground",
					className
				)}
			>
				<span className="shrink-0">{label}:</span>
				{valueNode ??
					(copy ? (
						<CopyableValue value={value} kind={copy} />
					) : (
						<span className="truncate">
							{value === null ||
							value === undefined ||
							value === ""
								? EMPTY
								: value}
						</span>
					))}
			</p>
		);
	}

	return (
		<div className={cn("flex flex-col gap-1", className)}>
			<span className="text-muted-foreground text-xs font-semibold">
				{label}:
			</span>
			{valueNode ??
				(copy ? (
					<CopyableValue
						value={value}
						kind={copy}
						className="self-start font-medium"
					/>
				) : (
					<span className="font-medium whitespace-pre-wrap">
						{value}
					</span>
				))}
		</div>
	);
};

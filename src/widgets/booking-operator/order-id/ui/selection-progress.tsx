import { CircleCheckBig } from "lucide-react";
import { type FC } from "react";

import { cn } from "@/shared/lib";
import { Badge } from "@/shared/ui";

interface ISelectionProgressProps {
	selected: number;
	total: number;
	label: string;
	ariaLabel?: string;
}

export const SelectionProgress: FC<ISelectionProgressProps> = ({
	selected,
	total,
	label,
	ariaLabel
}) => {
	const percent = total > 0 ? (selected / total) * 100 : 0;
	const complete = total > 0 && selected === total;

	return (
		<div className="flex min-w-[168px] flex-col items-end gap-1.5">
			<Badge
				variant={complete ? "green" : "cyan"}
				size="md"
				className="gap-1.5 rounded-full px-3 w-full"
				aria-label={ariaLabel ?? `${selected} / ${total} ${label}`}
			>
				<CircleCheckBig className="size-3.5" />
				<span className="tabular-nums font-semibold">
					{selected} / {total}
				</span>
				<span className="font-normal">{label}</span>
			</Badge>
			<div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
				<div
					className={cn(
						"h-full rounded-full transition-all duration-300",
						complete ? "bg-green-500" : "bg-cyan-500"
					)}
					style={{ width: `${percent}%` }}
				/>
			</div>
		</div>
	);
};

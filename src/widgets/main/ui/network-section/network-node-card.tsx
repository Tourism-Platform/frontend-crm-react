import type { LucideIcon } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/shared/lib";

interface INetworkNodeCardProps {
	label: string;
	icon: LucideIcon;
	iconClassName?: string;
	compact?: boolean;
}

export const NetworkNodeCard = forwardRef<
	HTMLDivElement,
	INetworkNodeCardProps
>(({ label, icon: Icon, iconClassName, compact = false }, ref) => (
	<div
		ref={ref}
		className={cn(
			"flex items-center rounded-[10px] border bg-card shadow-sm",
			compact ? "gap-2 px-3 py-2" : "gap-3 px-3 py-3"
		)}
	>
		<div
			className={cn(
				"flex shrink-0 items-center justify-center rounded-md bg-muted text-foreground",
				compact ? "size-6" : "size-9",
				iconClassName
			)}
		>
			<Icon className={compact ? "size-3" : "size-4"} />
		</div>
		<span
			className={cn(
				"min-w-0 font-medium leading-tight",
				compact ? "text-xs" : "text-sm"
			)}
		>
			{label}
		</span>
	</div>
));

NetworkNodeCard.displayName = "NetworkNodeCard";

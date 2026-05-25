import type { LucideIcon } from "lucide-react";
import { forwardRef } from "react";

import { cn } from "@/shared/lib";
import { Card, CardContent } from "@/shared/ui";

interface INetworkNodeCardProps {
	label: string;
	icon: LucideIcon;
	iconClassName?: string;
}

export const NetworkNodeCard = forwardRef<
	HTMLDivElement,
	INetworkNodeCardProps
>(({ label, icon: Icon, iconClassName }, ref) => (
	<Card ref={ref} className="py-3">
		<CardContent className="px-3 flex items-center gap-3">
			<div
				className={cn(
					"flex size-9 shrink-0 items-center justify-center rounded-md bg-muted text-foreground",
					iconClassName
				)}
			>
				<Icon className="size-4" />
			</div>
			<span className="text-sm font-medium">{label}</span>
		</CardContent>
	</Card>
));

NetworkNodeCard.displayName = "NetworkNodeCard";

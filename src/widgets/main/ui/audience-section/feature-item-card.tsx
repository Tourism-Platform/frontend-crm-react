import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

import { cn } from "@/shared/lib";

interface IFeatureItemCardProps {
	icon: LucideIcon;
	name: string;
	desc: string;
	iconClassName?: string;
}

export const FeatureItemCard: FC<IFeatureItemCardProps> = ({
	icon: Icon,
	name,
	desc,
	iconClassName
}) => (
	<div className="flex gap-3">
		<div
			className={cn(
				"flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground",
				iconClassName
			)}
		>
			<Icon className="size-4" />
		</div>
		<div>
			<p className="text-sm font-semibold">{name}</p>
			<p className="text-sm text-muted-foreground">{desc}</p>
		</div>
	</div>
);

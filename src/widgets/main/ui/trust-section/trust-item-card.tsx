import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

interface ITrustItemCardProps {
	icon: LucideIcon;
	name: string;
	desc: string;
}

export const TrustItemCard: FC<ITrustItemCardProps> = ({
	icon: Icon,
	name,
	desc
}) => (
	<div className="flex items-start gap-3">
		<div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground">
			<Icon className="size-4" />
		</div>
		<div>
			<p className="text-sm font-semibold">{name}</p>
			<p className="text-sm text-muted-foreground">{desc}</p>
		</div>
	</div>
);

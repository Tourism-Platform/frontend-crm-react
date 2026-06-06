import type { FC, ReactNode } from "react";

import { cn } from "@/shared/lib";

interface INetworkPhaseVisualCardProps {
	label: string;
	children: ReactNode;
	className?: string;
}

export const NetworkPhaseVisualCard: FC<INetworkPhaseVisualCardProps> = ({
	label,
	children,
	className
}) => (
	<div
		className={cn(
			"relative w-full overflow-visible rounded-2xl border bg-card p-5 shadow-md md:p-6",
			className
		)}
	>
		<p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
			{label}
		</p>
		{children}
	</div>
);

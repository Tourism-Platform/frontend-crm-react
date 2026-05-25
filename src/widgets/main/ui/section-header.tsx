import type { FC } from "react";

import { cn } from "@/shared/lib";

interface ISectionHeaderProps {
	eyebrow?: string;
	title: string;
	subtitle?: string;
	className?: string;
}

export const SectionHeader: FC<ISectionHeaderProps> = ({
	eyebrow,
	title,
	subtitle,
	className
}) => (
	<div className={cn("mx-auto mb-12 max-w-3xl text-center", className)}>
		{eyebrow ? (
			<p className="mb-3 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
				{eyebrow}
			</p>
		) : null}
		<h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
			{title}
		</h2>
		{subtitle ? (
			<p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
		) : null}
	</div>
);

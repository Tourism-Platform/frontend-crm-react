import type { FC, ReactNode } from "react";

import { cn } from "@/shared/lib";

export type TNavRichItemProps = {
	icon?: ReactNode;
	title: string;
	description?: string;
	iconOnly?: boolean;
	className?: string;
};

export const NavRichItem: FC<TNavRichItemProps> = ({
	icon,
	title,
	description,
	iconOnly = false,
	className
}) => {
	return (
		<span className={cn("flex min-w-0 items-start gap-2.5", className)}>
			{icon && (
				<span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary [&_svg]:size-4 [&_svg]:!text-primary">
					{icon}
				</span>
			)}
			{!iconOnly && (
				<span className="min-w-0">
					<span className="block text-[13px] font-medium leading-tight">
						{title}
					</span>
					{description && (
						<span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
							{description}
						</span>
					)}
				</span>
			)}
		</span>
	);
};

export const NAV_RICH_ROW_CLASSNAME =
	"flex w-full items-start gap-2.5 rounded-lg px-3 py-2 text-left transition-colors cursor-pointer hover:bg-muted focus-visible:bg-muted focus-visible:outline-none";

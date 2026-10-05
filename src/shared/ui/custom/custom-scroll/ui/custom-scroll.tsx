import { type ComponentProps, type FC } from "react";

import { cn } from "@/shared/lib";

interface ICustomScrollProps extends ComponentProps<"div"> {
	orientation?: "vertical" | "horizontal";
}

export const CustomScroll: FC<ICustomScrollProps> = ({
	orientation = "vertical",
	className,
	children,
	...props
}) => {
	return (
		<div
			className={cn(
				"min-h-0",
				"[scrollbar-width:thin] [scrollbar-color:var(--border)_transparent]",
				"[&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar]:w-1.5",
				"[&::-webkit-scrollbar-track]:bg-transparent",
				"[&::-webkit-scrollbar-thumb]:rounded-full",
				"[&::-webkit-scrollbar-thumb]:bg-border/60",
				"hover:[&::-webkit-scrollbar-thumb]:bg-border",
				orientation === "vertical" &&
					"overflow-y-auto overscroll-y-contain",
				orientation === "horizontal" &&
					"overflow-x-auto overscroll-x-contain",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
};

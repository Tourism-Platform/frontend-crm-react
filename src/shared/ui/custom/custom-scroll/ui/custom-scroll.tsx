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
				"min-h-0 custom-scrollbar",
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

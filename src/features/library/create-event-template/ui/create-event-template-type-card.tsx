import {
	type ComponentProps,
	type ComponentType,
	type FC,
	type SVGProps
} from "react";

import { cn } from "@/shared/lib";
import { Card, CardContent } from "@/shared/ui";

export interface ICreateEventTemplateTypeCardProps
	extends ComponentProps<typeof Card> {
	title: string;
	description: string;
	icon: ComponentType<SVGProps<SVGSVGElement>>;
	iconBgClassName?: string;
}

export const CreateEventTemplateTypeCard: FC<
	ICreateEventTemplateTypeCardProps
> = ({
	title,
	description,
	icon: Icon,
	iconBgClassName,
	className,
	...props
}) => {
	return (
		<Card
			className={cn(
				"flex h-full cursor-pointer py-4 transition-colors hover:bg-accent",
				className
			)}
			{...props}
		>
			<CardContent className="flex h-full items-center gap-3">
				<div
					className={cn(
						"shrink-0 rounded-md p-2 text-white",
						iconBgClassName
					)}
				>
					<Icon className="size-5" />
				</div>
				<div className="min-w-0">
					<p className="font-semibold">{title}</p>
					<p className="text-sm text-muted-foreground">
						{description}
					</p>
				</div>
			</CardContent>
		</Card>
	);
};

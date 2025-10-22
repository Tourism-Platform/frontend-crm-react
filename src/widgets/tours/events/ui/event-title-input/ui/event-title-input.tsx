import { type FC } from "react";

import { cn } from "@/shared/lib";
import { Input } from "@/shared/ui";

interface IEventTitleInputProps {
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
	className?: string;
	placeholder: string;
}

export const EventTitleInput: FC<IEventTitleInputProps> = ({
	icon: Icon,
	className,
	placeholder
}) => {
	return (
		<div className="grid grid-cols-[auto_1fr] gap-5 items-center ">
			<div
				className={cn(
					"flex items-center justify-center p-2 rounded-full bg-primary size-9",
					className
				)}
			>
				<Icon className="h-4 text-white" />
			</div>
			<Input placeholder={placeholder} className="bg-card" />
		</div>
	);
};

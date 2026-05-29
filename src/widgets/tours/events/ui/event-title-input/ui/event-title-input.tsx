import { type FC } from "react";
import { type Control, Controller } from "react-hook-form";

import { cn } from "@/shared/lib";
import { Input } from "@/shared/ui";

interface IEventTitleInputProps {
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
	className?: string;
	placeholder: string;
	control?: Control<any>;
}

export const EventTitleInput: FC<IEventTitleInputProps> = ({
	icon: Icon,
	className,
	placeholder,
	control
}) => {
	if (!control) {
		return null;
	}
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
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<Input
						{...field}
						placeholder={placeholder}
						className="bg-card"
					/>
				)}
			/>
		</div>
	);
};

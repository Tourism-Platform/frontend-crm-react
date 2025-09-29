import type { TFunction } from "i18next";
import { type FC } from "react";
import type { Control } from "react-hook-form";

import { cn } from "@/shared/lib";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	PasswordInput,
	Textarea
} from "@/shared/ui";

interface ICustomFieldProps extends React.HTMLAttributes<HTMLDivElement> {
	control: Control<any>;
	name: string;
	label: string;
	placeholder: string;
	t: TFunction<any>;
	type?: "password" | "input" | "textarea";
}

export const CustomField: FC<ICustomFieldProps> = ({
	control,
	name,
	label,
	placeholder,
	t,
	type = "input",
	...props
}) => {
	let Component;
	switch (type) {
		case "password":
			Component = PasswordInput;
			break;
		case "input":
			Component = Input;
			break;
		case "textarea":
			Component = Textarea;
			break;
		default:
			Component = Input;
			break;
	}
	const { className, ...rest } = props;
	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("relative mb-5", className)} {...rest}>
					<FormLabel>{t(label)}:</FormLabel>
					<FormControl>
						<Component placeholder={t(placeholder)} {...field} />
					</FormControl>
					<FormMessage t={t} className="absolute bottom-[-20px]" />
				</FormItem>
			)}
		/>
	);
};

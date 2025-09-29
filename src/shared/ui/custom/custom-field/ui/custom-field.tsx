import type { TFunction } from "i18next";
import { type FC } from "react";
import type { Control } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	PasswordInput
} from "@/shared/ui";

interface ICustomFieldProps {
	control: Control<any>;
	name: string;
	label: string;
	placeholder: string;
	t: TFunction<any>;
	type?: "password" | "input";
}

export const CustomField: FC<ICustomFieldProps> = ({
	control,
	name,
	label,
	placeholder,
	t,
	type = "input"
}) => {
	const Component = type === "password" ? PasswordInput : Input;

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className="relative mb-5">
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

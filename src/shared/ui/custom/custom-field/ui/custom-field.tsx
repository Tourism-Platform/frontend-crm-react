import type { TFunction } from "i18next";
import type { FC, HTMLInputTypeAttribute } from "react";
import type { Control } from "react-hook-form";

import { cn } from "@/shared/lib";
import {
	DatePickerInput,
	type DatePickerInputProps,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	PasswordInput,
	SelectPicker,
	type SelectPickerProps,
	Textarea,
	TimePickerInput,
	type TimePickerInputProps
} from "@/shared/ui";

export type CustomFieldVariant =
	| "input"
	| "password"
	| "textarea"
	| "time"
	| "date"
	| "select";

type BaseFieldProps = {
	control: Control<any>;
	name: string;
	label: string;
	t: TFunction<any>;
	className?: string;
};

type TextFieldVariant = BaseFieldProps & {
	fieldType?: Extract<CustomFieldVariant, "input">;
	placeholder: string;
	inputType?: HTMLInputTypeAttribute;
};

type PasswordFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "password">;
	placeholder: string;
};

type TextareaFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "textarea">;
	placeholder: string;
	rows?: number;
};

type TimeFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "time">;
} & TimePickerInputProps;

type DateFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "date">;
} & DatePickerInputProps;

type SelectFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "select">;
} & SelectPickerProps;

type CustomFieldProps =
	| TextFieldVariant
	| PasswordFieldVariant
	| TextareaFieldVariant
	| TimeFieldVariant
	| DateFieldVariant
	| SelectFieldVariant;

export const CustomField: FC<CustomFieldProps> = (props) => {
	const { control, name, label, t, className, fieldType, ...rest } = props;

	const renderInput = (field: any) => {
		switch (fieldType) {
			case "input":
				return (
					<Input
						placeholder={t(props.placeholder)}
						type={props.inputType}
						{...field}
					/>
				);
			case "password":
				return (
					<PasswordInput
						placeholder={t(props.placeholder)}
						{...rest}
						{...field}
					/>
				);
			case "textarea":
				return (
					<Textarea
						{...rest}
						placeholder={t(props.placeholder)}
						{...field}
					/>
				);
			case "time":
				return (
					<TimePickerInput
						aria-label={t(label)}
						hourCycle={24}
						{...rest}
						{...field}
					/>
				);
			case "date":
				return (
					<DatePickerInput
						aria-label={t(label)}
						{...rest}
						{...field}
					/>
				);
			case "select":
				return (
					<SelectPicker
						placeholder={t(props.placeholder)}
						{...rest}
						{...field}
					/>
				);
			default:
				return (
					<Input
						placeholder={t(props.placeholder)}
						type={props.inputType}
						{...field}
					/>
				);
		}
	};

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => (
				<FormItem className={cn("relative mb-5", className)}>
					<FormLabel className="ml-1">{t(label)}:</FormLabel>
					<FormControl>{renderInput(field)}</FormControl>
					<FormMessage
						t={t}
						className="absolute bottom-[-20px] left-1"
					/>
				</FormItem>
			)}
		/>
	);
};

import type { TFunction } from "i18next";
import type { ComponentProps, FC } from "react";
import type { Control } from "react-hook-form";

import { cn } from "@/shared/lib";
import {
	CustomEditor,
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
	| "select"
	| "editor";

type BaseFieldProps = {
	control: Control<any>;
	name: string;
	label: string;
	t: TFunction<any>;
	className?: string;
	disabled?: boolean;
};

type TextFieldVariant = BaseFieldProps & {
	fieldType?: Extract<CustomFieldVariant, "input">;
} & React.ComponentProps<"input">;

type PasswordFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "password">;
} & Omit<ComponentProps<typeof Input>, "type">;

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

type EditorFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "editor">;
	defaultValue?: string;
};

type CustomFieldProps =
	| TextFieldVariant
	| PasswordFieldVariant
	| TextareaFieldVariant
	| TimeFieldVariant
	| DateFieldVariant
	| SelectFieldVariant
	| EditorFieldVariant;

export const CustomField: FC<CustomFieldProps> = (props) => {
	const { control, name, label, t, className, fieldType, ...rest } = props;

	const renderInput = (field: any) => {
		switch (fieldType) {
			case "input":
				return (
					<Input
						{...rest}
						placeholder={t(props.placeholder)}
						{...field}
						onChange={(event) => {
							if (props.type === "number") {
								field.onChange(event.target.valueAsNumber);
							} else {
								field.onChange(event);
							}
						}}
					/>
				);
			case "password":
				return (
					<PasswordInput
						{...rest}
						placeholder={t(props.placeholder)}
						{...field}
					/>
				);
			case "textarea":
				return (
					<Textarea
						{...rest}
						className="resize-none h-32"
						placeholder={t(props.placeholder)}
						{...field}
					/>
				);
			case "time":
				return (
					<TimePickerInput
						{...rest}
						aria-label={t(label)}
						hourCycle={24}
						{...field}
					/>
				);
			case "date":
				return (
					<DatePickerInput
						{...rest}
						aria-label={t(label)}
						{...field}
					/>
				);
			case "select":
				return (
					<SelectPicker
						{...rest}
						placeholder={t(props.placeholder)}
						{...field}
					/>
				);
			case "editor":
				return (
					<CustomEditor
						field={field}
						defaultValue={props?.defaultValue}
					/>
				);

			default:
				return (
					<Input
						{...rest}
						placeholder={t(props.placeholder)}
						{...field}
						onChange={(event) => {
							if (props.type === "number") {
								field.onChange(event.target.valueAsNumber);
							} else {
								field.onChange(event);
							}
						}}
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

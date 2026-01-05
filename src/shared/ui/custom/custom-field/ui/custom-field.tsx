import type { TFunction } from "i18next";
import type { ComponentProps, FC } from "react";
import type { Control } from "react-hook-form";

import { cn } from "@/shared/lib";
import type { BadgeVariant, ICustomUploadFilesProps } from "@/shared/ui";
import {
	CustomEditor,
	CustomUploadFilesField,
	DatePickerInput,
	type DatePickerInputProps,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	MultipleSelector,
	type MultipleSelectorDisplayMode,
	type Option as MultipleSelectorOption,
	PasswordInput,
	PhoneInput,
	SelectPicker,
	type SelectPickerProps,
	Textarea,
	TimePickerInput,
	type TimePickerInputProps
} from "@/shared/ui";

export type CustomFieldVariant =
	| "input"
	| "password"
	| "phone"
	| "textarea"
	| "time"
	| "date"
	| "select"
	| "multiselect"
	| "editor"
	| "upload";

type BaseFieldProps = {
	control: Control<any>;
	name: string;
	label: string;
	t: TFunction<any>;
	className?: string;
	disabled?: boolean;
	externalError?: string;
};

type TextFieldVariant = BaseFieldProps & {
	fieldType?: Extract<CustomFieldVariant, "input">;
} & React.ComponentProps<"input">;

type PasswordFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "password">;
} & Omit<ComponentProps<typeof Input>, "type">;

type PhoneFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "phone">;
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

type MultiselectFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "multiselect">;
	options: MultipleSelectorOption[];
	placeholder?: string;
	displayMode?: MultipleSelectorDisplayMode;
	badgeVariant?: BadgeVariant;
	hideClearAllButton?: boolean;
};

type UploadFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "upload">;
} & ICustomUploadFilesProps;

type CustomFieldProps =
	| TextFieldVariant
	| PasswordFieldVariant
	| PhoneFieldVariant
	| TextareaFieldVariant
	| TimeFieldVariant
	| DateFieldVariant
	| SelectFieldVariant
	| MultiselectFieldVariant
	| EditorFieldVariant
	| UploadFieldVariant;

export const CustomField: FC<CustomFieldProps> = (props) => {
	const {
		control,
		name,
		label,
		t,
		className,
		fieldType,
		externalError,
		...rest
	} = props;

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
			case "phone":
				return (
					<PhoneInput
						{...rest}
						international
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
			case "multiselect":
				return (
					<MultipleSelector
						defaultOptions={props.options}
						placeholder={
							props.placeholder ? t(props.placeholder) : undefined
						}
						value={field.value}
						onChange={(options) => field.onChange(options)}
						displayMode={props.displayMode}
						badgeVariant={props.badgeVariant}
						hideClearAllButton={props.hideClearAllButton}
						// emptyIndicator={<p className="text-center text-sm text-muted-foreground">No results found</p>}
					/>
				);
			case "upload":
				return (
					<CustomUploadFilesField
						{...props}
						readOnly={props.readOnly || props.disabled}
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
					>
						{externalError}
					</FormMessage>
				</FormItem>
			)}
		/>
	);
};

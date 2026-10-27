import { parseDate, parseTime } from "@internationalized/date";
import type { TFunction } from "i18next";
import type { ComponentProps, FC, ReactNode, RefObject } from "react";
import type { DateValue, TimeValue } from "react-aria-components";
import type { Control } from "react-hook-form";

import { cn } from "@/shared/lib";
import type {
	BadgeSize,
	BadgeVariant,
	CustomAutocompleteProps,
	CustomCountrySelectProps,
	CustomGeoSelectProps,
	ICustomCheckboxGroupProps,
	ICustomUploadFilesProps,
	RatingButtonSize,
	RatingButtonVariant,
	TCustomAsyncSelectProps
} from "@/shared/ui";
import {
	CustomAsyncSelect,
	CustomAutocomplete,
	CustomCalendarRange,
	CustomCheckboxGroup,
	CustomCountrySelect,
	CustomGeoSelect,
	CustomTagInput,
	CustomUploadFilesField,
	DatePickerInput,
	type DatePickerInputProps,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
	MultipleSelector,
	type MultipleSelectorDisplayMode,
	type Option as MultipleSelectorOption,
	PasswordInput,
	Rating,
	RatingButton,
	SelectPicker,
	type SelectPickerProps,
	Switch,
	Textarea,
	TimePickerInput,
	type TimePickerInputProps
} from "@/shared/ui";
import { CustomEditor } from "@/shared/ui/custom/custom-editor";
import { CustomSlider } from "@/shared/ui/custom/custom-slider";
import { DatePicker } from "@/shared/ui/date-picker";
import { PhoneInput } from "@/shared/ui/shadcn-ui/phone-input";

export type CustomFieldVariant =
	| "input"
	| "password"
	| "phone"
	| "textarea"
	| "time"
	| "date"
	| "select"
	| "multiselect"
	| "tags"
	| "editor"
	| "upload"
	| "autocomplete"
	| "country"
	| "geo"
	| "asyncSelect"
	| "dateRange"
	| "datePicker"
	| "switch"
	| "rating"
	| "slider"
	| "checkboxGroup";
type BaseFieldProps = {
	control: Control<any>;
	name: string;
	label?: string;
	t: TFunction<any>;
	className?: string;
	disabled?: boolean;
	externalError?: string;
	hideLabel?: boolean;
	/** Содержимое справа от подписи — счётчик, подсказка */
	labelAside?: ReactNode;
	/** Пишется в RHF через FormField/Controller при регистрации поля */
	defaultValue?: unknown;
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
	/** Классы самого textarea (className уходит на FormItem) */
	inputClassName?: string;
	/** Доступ к DOM-элементу — например, для работы с выделением */
	inputRef?: RefObject<HTMLTextAreaElement | null>;
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
};

type MultiselectFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "multiselect">;
	options: MultipleSelectorOption[];
	placeholder?: string;
	displayMode?: MultipleSelectorDisplayMode;
	badgeVariant?: BadgeVariant;
	badgeSize?: BadgeSize;
	hideClearAllButton?: boolean;
};

type TagsFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "tags">;
	placeholder?: string;
	badgeVariant?: BadgeVariant;
	badgeSize?: BadgeSize;
	getTagVariant?: (tag: string) => BadgeVariant;
	normalizeValue?: (value: string[]) => string[];
	delimiterList?: string[];
	addTagsOnBlur?: boolean;
};

type CheckboxGroupFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "checkboxGroup">;
} & Omit<ICustomCheckboxGroupProps, "value" | "onChange">;

type UploadFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "upload">;
} & ICustomUploadFilesProps;

type AutocompleteFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "autocomplete">;
} & Omit<CustomAutocompleteProps, "value" | "onChange">;

type CountryFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "country">;
} & Omit<CustomCountrySelectProps, "value" | "onChange">;

type GeoFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "geo">;
} & Omit<CustomGeoSelectProps, "value" | "onChange">;

type AsyncSelectFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "asyncSelect">;
} & Omit<TCustomAsyncSelectProps, "value" | "onChange">;

type DateRangeFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "dateRange">;
	placeholder?: string;
};

type DatePickerFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "datePicker">;
};

type SwitchFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "switch">;
	description?: string;
};

type RatingFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "rating">;
	max?: number;
	size?: RatingButtonSize;
	variant?: RatingButtonVariant;
	readOnly?: boolean;
	previewOnHover?: boolean;
};

type SliderFieldVariant = BaseFieldProps & {
	fieldType: Extract<CustomFieldVariant, "slider">;
	min?: number;
	max?: number;
	femaleLabel: string;
};

type CustomFieldProps =
	| TextFieldVariant
	| PasswordFieldVariant
	| PhoneFieldVariant
	| TextareaFieldVariant
	| TimeFieldVariant
	| DateFieldVariant
	| SelectFieldVariant
	| MultiselectFieldVariant
	| TagsFieldVariant
	| EditorFieldVariant
	| UploadFieldVariant
	| AutocompleteFieldVariant
	| CountryFieldVariant
	| GeoFieldVariant
	| AsyncSelectFieldVariant
	| DateRangeFieldVariant
	| DatePickerFieldVariant
	| SwitchFieldVariant
	| RatingFieldVariant
	| SliderFieldVariant
	| CheckboxGroupFieldVariant;

/** Собственные пропсы варианта — без общих полей формы (control, name, t и т. д.) */
type TVariantRest<V> = Omit<V, keyof BaseFieldProps | "fieldType">;

// helpers
const toDateValue = (v: unknown): DateValue | null => {
	if (!v || typeof v !== "string") return null;
	try {
		return parseDate(v);
	} catch {
		return null;
	}
};

const toTimeValue = (v: unknown): TimeValue | null => {
	if (!v || typeof v !== "string") return null;
	try {
		return parseTime(v);
	} catch {
		return null;
	}
};

export const CustomField: FC<CustomFieldProps> = (props) => {
	const {
		control,
		name,
		label,
		t,
		className,
		fieldType,
		externalError,
		hideLabel,
		labelAside,
		defaultValue,
		...rest
	} = props;

	const renderInput = (field: any) => {
		switch (fieldType) {
			case "input":
			default:
				return (
					<Input
						{...rest}
						placeholder={t(props.placeholder)}
						{...field}
						value={
							props.type === "number"
								? (field.value ?? "")
								: field.value
						}
						onChange={(event) => {
							if (props.type === "number") {
								const value = event.target.valueAsNumber;
								field.onChange(
									Number.isFinite(value) ? value : null
								);
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
			case "textarea": {
				const { inputClassName, inputRef, ...textareaRest } =
					rest as Omit<
						TextareaFieldVariant,
						keyof BaseFieldProps | "fieldType"
					>;

				return (
					<Textarea
						{...textareaRest}
						className={cn("resize-none h-32", inputClassName)}
						placeholder={t(props.placeholder)}
						{...field}
						ref={(element) => {
							field.ref(element);
							if (inputRef) inputRef.current = element;
						}}
					/>
				);
			}
			case "time": {
				const timeRest = rest as Omit<
					TimePickerInputProps,
					"defaultValue"
				>;

				return (
					<TimePickerInput
						{...timeRest}
						aria-label={label ? t(label) : undefined}
						hourCycle={24}
						value={toTimeValue(field.value)}
						onChange={(val) =>
							field.onChange(val?.toString() ?? null)
						}
						onBlur={field.onBlur}
					/>
				);
			}

			case "date": {
				const dateRest = rest as Omit<
					DatePickerInputProps,
					"defaultValue"
				>;

				return (
					<DatePickerInput
						{...dateRest}
						aria-label={label ? t(label) : undefined}
						value={toDateValue(field.value)}
						onChange={(val) =>
							field.onChange(val?.toString() ?? null)
						}
						onBlur={field.onBlur}
					/>
				);
			}
			case "select":
				return (
					<SelectPicker
						{...rest}
						placeholder={t(props.placeholder)}
						{...field}
					/>
				);
			case "editor":
				return <CustomEditor field={field} />;
			case "multiselect":
				return (
					<MultipleSelector
						defaultOptions={props.options}
						placeholder={t(props.placeholder)}
						value={props.options.filter(
							(opt: MultipleSelectorOption) =>
								(field.value || []).includes(opt.value)
						)}
						onChange={(options: MultipleSelectorOption[]) =>
							field.onChange(
								options.map(
									(opt: MultipleSelectorOption) => opt.value
								)
							)
						}
						displayMode={props.displayMode}
						badgeVariant={props.badgeVariant}
						badgeSize={props.badgeSize}
						hideClearAllButton={props.hideClearAllButton}
					/>
				);
			case "tags":
				return (
					<CustomTagInput
						value={Array.isArray(field.value) ? field.value : []}
						onChange={field.onChange}
						placeholder={
							props.placeholder ? t(props.placeholder) : undefined
						}
						disabled={props.disabled}
						badgeVariant={props.badgeVariant}
						badgeSize={props.badgeSize}
						getTagVariant={props.getTagVariant}
						normalizeValue={props.normalizeValue}
						delimiterList={props.delimiterList}
						addTagsOnBlur={props.addTagsOnBlur}
					/>
				);
			case "checkboxGroup":
				return (
					<CustomCheckboxGroup
						options={props.options}
						toggle={props.toggle}
						appearance={props.appearance}
						disabled={props.disabled}
						value={Array.isArray(field.value) ? field.value : []}
						onChange={field.onChange}
					/>
				);
			case "upload":
				/** CustomUploadFilesField сам вызывает useController — ему нужны control и name */
				return (
					<CustomUploadFilesField
						{...props}
						readOnly={props.readOnly || props.disabled}
					/>
				);
			case "autocomplete": {
				const autocompleteRest =
					rest as TVariantRest<AutocompleteFieldVariant>;

				return (
					<CustomAutocomplete
						{...autocompleteRest}
						placeholder={t(props.placeholder)}
						emptyText={t(props.emptyText)}
						value={field.value}
						onChange={field.onChange}
					/>
				);
			}
			case "country": {
				const countryRest = rest as TVariantRest<CountryFieldVariant>;

				return (
					<CustomCountrySelect
						{...countryRest}
						placeholder={
							props.placeholder ? t(props.placeholder) : undefined
						}
						emptyText={
							props.emptyText ? t(props.emptyText) : undefined
						}
						value={field.value ?? ""}
						onChange={field.onChange}
					/>
				);
			}
			case "geo": {
				const geoRest = rest as TVariantRest<GeoFieldVariant>;

				return (
					<CustomGeoSelect
						{...geoRest}
						placeholder={t(props.placeholder)}
						emptyText={t(props.emptyText)}
						value={field.value ?? null}
						onChange={field.onChange}
					/>
				);
			}
			case "asyncSelect": {
				const asyncSelectRest =
					rest as TVariantRest<AsyncSelectFieldVariant>;

				return (
					<CustomAsyncSelect
						{...asyncSelectRest}
						placeholder={
							props.placeholder ? t(props.placeholder) : undefined
						}
						emptyText={
							props.emptyText ? t(props.emptyText) : undefined
						}
						value={field.value ?? ""}
						onChange={(value) => field.onChange(value || null)}
					/>
				);
			}
			case "dateRange": {
				const dateRangeRest =
					rest as TVariantRest<DateRangeFieldVariant>;

				return (
					<CustomCalendarRange
						{...dateRangeRest}
						placeholder={t(props.placeholder)}
						{...field}
					/>
				);
			}
			case "datePicker": {
				const value = field.value as
					{ from?: Date; to?: Date } | null | undefined;

				return (
					<DatePicker
						from={value?.from}
						to={value?.to}
						onChange={field.onChange}
					/>
				);
			}
			case "switch":
				return (
					<Switch
						checked={field.value}
						onCheckedChange={field.onChange}
						disabled={props.disabled}
					/>
				);
			case "rating": {
				const max = props.max ?? 5;

				return (
					<Rating
						value={
							typeof field.value === "number" ? field.value : 0
						}
						onValueChange={field.onChange}
						readOnly={props.readOnly || props.disabled}
						previewOnHover={props.previewOnHover}
					>
						{Array.from({ length: max }, (_, index) => (
							<RatingButton
								key={index}
								size={props.size}
								variant={props.variant}
							/>
						))}
					</Rating>
				);
			}
			case "slider": {
				return (
					<CustomSlider
						min={props.min}
						max={props.max}
						disabled={props.disabled}
						value={
							typeof field.value === "number"
								? field.value
								: props.min
						}
						onChange={field.onChange}
						startLabel={label ? t(label) : ""}
						endLabel={t(props.femaleLabel)}
					/>
				);
			}
		}
	};

	const formFieldDefaultValueProps =
		defaultValue !== undefined ? { defaultValue } : {};

	if (fieldType === "switch") {
		return (
			<FormField
				control={control}
				name={name}
				{...formFieldDefaultValueProps}
				render={({ field }) => (
					<FormItem
						className={cn(
							"flex flex-row items-center justify-between gap-4",
							className
						)}
					>
						<div className="flex flex-col gap-1">
							<FormLabel className="cursor-pointer">
								{t(label)}
							</FormLabel>
							{props.description ? (
								<FormDescription>
									{t(props.description)}
								</FormDescription>
							) : null}
						</div>
						<FormControl>{renderInput(field)}</FormControl>
					</FormItem>
				)}
			/>
		);
	}

	return (
		<FormField
			control={control}
			name={name}
			{...formFieldDefaultValueProps}
			render={({ field }) => (
				<FormItem
					className={cn("relative", !hideLabel && "mb-5", className)}
				>
					{label && !hideLabel && fieldType !== "slider" ? (
						labelAside ? (
							<div className="flex items-baseline justify-between gap-3">
								<FormLabel className="ml-1">
									{t(label)}:
								</FormLabel>
								{labelAside}
							</div>
						) : (
							<FormLabel className="ml-1">{t(label)}:</FormLabel>
						)
					) : null}
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

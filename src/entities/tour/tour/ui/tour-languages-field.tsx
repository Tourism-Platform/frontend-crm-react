import {
	type Control,
	type FieldPath,
	type FieldValues
} from "react-hook-form";

import {
	Button,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import { type ENUM_LANGUAGES_TYPE, LANGUAGES_LABELS } from "../../landing";

type TTourLanguagesFieldProps<T extends FieldValues> = {
	control: Control<T>;
	name: FieldPath<T>;
	label: string;
};

export const TourLanguagesField = <T extends FieldValues>({
	control,
	name,
	label
}: TTourLanguagesFieldProps<T>) => {
	const languagesOptions = useValueToTranslateLabel(LANGUAGES_LABELS);

	return (
		<FormField
			control={control}
			name={name}
			render={({ field }) => {
				const selected = (field.value as ENUM_LANGUAGES_TYPE[]) ?? [];

				const toggleLanguage = (value: ENUM_LANGUAGES_TYPE) => {
					const next = selected.includes(value)
						? selected.filter((lang) => lang !== value)
						: [...selected, value];
					field.onChange(next);
				};

				return (
					<FormItem className="col-span-2 flex flex-col gap-2">
						<FormLabel>{label}</FormLabel>
						<div className="flex flex-wrap gap-2">
							{languagesOptions.map((lang) => {
								const value = lang.value as ENUM_LANGUAGES_TYPE;
								const isSelected = selected.includes(value);

								return (
									<Button
										key={lang.value}
										type="button"
										variant={
											isSelected
												? "outlineActive"
												: "outline"
										}
										onClick={() => toggleLanguage(value)}
									>
										{lang.label}
									</Button>
								);
							})}
						</div>
						<FormMessage />
					</FormItem>
				);
			}}
		/>
	);
};

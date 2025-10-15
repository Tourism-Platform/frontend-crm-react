import { forwardRef } from "react";
import {
	Label,
	TimeField,
	type TimeFieldProps,
	type TimeValue
} from "react-aria-components";

import { DateInput } from "@/shared/ui";

export type TimePickerInputProps = TimeFieldProps<TimeValue>;

export const TimePickerInput = forwardRef<HTMLDivElement, TimePickerInputProps>(
	({ "aria-label": ariaLabel, value, ...props }, ref) => {
		return (
			<TimeField ref={ref} {...props} value={value ?? null}>
				<Label className="sr-only">{ariaLabel || "Time"}</Label>
				<DateInput />
			</TimeField>
		);
	}
);

TimePickerInput.displayName = "TimePickerInput";

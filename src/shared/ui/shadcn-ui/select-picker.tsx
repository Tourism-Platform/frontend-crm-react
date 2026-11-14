"use client";

import * as React from "react";

import { cn } from "@/shared/lib";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue
} from "@/shared/ui";

export interface SelectPickerOption {
	label: string;
	value: string;
}

export interface SelectPickerProps {
	value?: string;
	onChange?: (value: string) => void;
	options: SelectPickerOption[];
	/** Иконки по значению опции — в списке и в выбранном значении (`*_ICONS` из entity или виджета) */
	optionIcons?: Partial<
		Record<string, React.ComponentType<{ className?: string }>>
	>;
	placeholder?: string;
	className?: string;
	disabled?: boolean;
}

export const SelectPicker = React.forwardRef<
	HTMLButtonElement,
	SelectPickerProps
>(
	(
		{
			value,
			onChange,
			options,
			optionIcons,
			placeholder,
			className,
			disabled,
			...props
		},
		ref
	) => {
		const resolvedValue = value ?? "";

		return (
			<Select
				key={resolvedValue}
				value={resolvedValue}
				onValueChange={onChange}
				disabled={disabled}
			>
				<SelectTrigger
					ref={ref}
					className={cn("w-full", className)}
					{...props}
				>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map((option) => {
						const Icon = optionIcons?.[option.value];

						return (
							<SelectItem key={option.value} value={option.value}>
								{Icon ? (
									<span className="flex items-center gap-2">
										<Icon className="size-4" />
										{option.label}
									</span>
								) : (
									option.label
								)}
							</SelectItem>
						);
					})}
				</SelectContent>
			</Select>
		);
	}
);

SelectPicker.displayName = "SelectPicker";

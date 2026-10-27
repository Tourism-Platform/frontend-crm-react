import { useId } from "react";

import { cn } from "@/shared/lib";
import { Card, Checkbox, Label } from "@/shared/ui";

import {
	ENUM_CHECKBOX_GROUP_APPEARANCE,
	type ICustomCheckboxGroupProps
} from "../model/custom-checkbox-group.types";

const defaultToggle = <V extends string>(value: V[], option: V): V[] =>
	value.includes(option)
		? value.filter((item) => item !== option)
		: [...value, option];

export const CustomCheckboxGroup = <V extends string>({
	options,
	value,
	onChange,
	toggle = defaultToggle,
	appearance = ENUM_CHECKBOX_GROUP_APPEARANCE.PILL,
	disabled,
	className
}: ICustomCheckboxGroupProps<V>) => {
	const groupId = useId();
	const isCard = appearance === ENUM_CHECKBOX_GROUP_APPEARANCE.CARD;

	return (
		<div
			role="group"
			className={cn(
				isCard ? "grid gap-3 sm:grid-cols-3" : "flex flex-wrap gap-2",
				className
			)}
		>
			{options.map(
				({ value: option, label, description, icon: Icon, extra }) => {
					const checked = value.includes(option);
					const id = `${groupId}-${option}`;
					const checkbox = (
						<Checkbox
							id={id}
							checked={checked}
							disabled={disabled}
							onCheckedChange={() =>
								onChange(toggle(value, option))
							}
						/>
					);

					if (!isCard) {
						return (
							<Label
								key={option}
								htmlFor={id}
								className={cn(
									"cursor-pointer rounded-md border px-3 py-2 font-normal transition-colors",
									checked
										? "border-primary bg-accent font-medium text-accent-foreground"
										: "border-border hover:bg-accent/50"
								)}
							>
								{checkbox}
								{label}
							</Label>
						);
					}

					return (
						<Card
							key={option}
							className={cn(
								"gap-0 py-0 transition-colors",
								checked
									? "border-primary"
									: "hover:border-ring/50"
							)}
						>
							<Label
								htmlFor={id}
								className="flex h-full cursor-pointer flex-col items-start gap-2 p-4 font-normal leading-normal"
							>
								<span className="flex w-full items-start justify-between gap-2">
									{Icon ? (
										<Icon className="size-5 text-muted-foreground" />
									) : (
										<span />
									)}
									{checkbox}
								</span>
								<span className="font-semibold">{label}</span>
								{description ? (
									<span className="text-sm text-muted-foreground">
										{description}
									</span>
								) : null}
								{extra ? (
									<span className="mt-auto">{extra}</span>
								) : null}
							</Label>
						</Card>
					);
				}
			)}
		</div>
	);
};

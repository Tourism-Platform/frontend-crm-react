import { type ReactNode } from "react";
import {
	type Control,
	type FieldPath,
	type FieldValues,
	get,
	useFormState
} from "react-hook-form";

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger
} from "@/shared/ui/shadcn-ui/accordion";

interface ICustomCollapsibleListItemProps<T extends FieldValues> {
	/** Accordion value: the item index as a string. */
	value: string;
	control: Control<T>;
	/** Path of the list item: any error under it highlights the card. */
	name: FieldPath<T>;
	title: ReactNode;
	/** Summary next to the title, visible while collapsed. */
	description?: ReactNode;
	/** Header actions (item menu), outside the trigger. */
	actions?: ReactNode;
	children: ReactNode;
}

export const CustomCollapsibleListItem = <T extends FieldValues>({
	value,
	control,
	name,
	title,
	description,
	actions,
	children
}: ICustomCollapsibleListItemProps<T>) => {
	const { errors } = useFormState({ control, name });
	const isInvalid = Boolean(get(errors, name));

	return (
		<AccordionItem
			value={value}
			data-invalid={isInvalid || undefined}
			className="rounded-xl border bg-card px-6 shadow-sm last:border-b transition-[box-shadow,border-color] data-[invalid]:border-destructive/50 data-[invalid]:ring-2 data-[invalid]:ring-destructive/30"
		>
			<div className="flex items-center gap-1">
				<AccordionTrigger className="text-base">
					{/* The summary wraps: the Radix header has no min-w-0, so truncate cannot shrink it. */}
					<span className="flex flex-wrap items-baseline gap-x-2">
						<span>{title}</span>
						{description ? (
							<span className="text-sm font-normal text-muted-foreground">
								{description}
							</span>
						) : null}
					</span>
				</AccordionTrigger>
				{actions}
			</div>
			<AccordionContent className="pb-6">{children}</AccordionContent>
		</AccordionItem>
	);
};

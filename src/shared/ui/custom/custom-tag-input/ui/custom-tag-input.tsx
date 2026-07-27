"use client";

import { type Tag, TagInput } from "emblor-maintained";
import { XIcon } from "lucide-react";
import { type FC, useId, useState } from "react";

import { cn } from "@/shared/lib";
import { Badge, type BadgeSize, type BadgeVariant } from "@/shared/ui";

const toTags = (value: string[]): Tag[] =>
	value.map((text) => ({ id: text, text }));

export interface CustomTagInputProps {
	value?: string[];
	onChange?: (value: string[]) => void;
	placeholder?: string;
	disabled?: boolean;
	className?: string;
	badgeVariant?: BadgeVariant;
	badgeSize?: BadgeSize;
}

export const CustomTagInput: FC<CustomTagInputProps> = ({
	value = [],
	onChange,
	placeholder,
	disabled,
	className,
	badgeVariant = "secondary",
	badgeSize = "md"
}) => {
	const id = useId();
	const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
	const tags = toTags(value);

	const removeTag = (tagText: string) => {
		if (disabled) return;
		onChange?.(value.filter((item) => item !== tagText));
	};

	return (
		<div className={className}>
			<TagInput
				id={id}
				tags={tags}
				setTags={(newTags) => {
					const next =
						typeof newTags === "function" ? newTags(tags) : newTags;
					onChange?.(next.map((tag) => tag.text));
				}}
				activeTagIndex={activeTagIndex}
				setActiveTagIndex={setActiveTagIndex}
				placeholder={placeholder}
				disabled={disabled}
				inlineTags={false}
				inputFieldPosition="top"
				customTagRenderer={(tag, isActive) => (
					<Badge
						key={tag.id}
						variant={badgeVariant}
						size={badgeSize}
						className={cn(
							"pl-3 pr-8 text-sm relative",
							isActive && "ring-2 ring-ring"
						)}
					>
						{tag.text}
						{!disabled && (
							<button
								type="button"
								aria-label="Remove"
								className="flex items-center justify-center rounded-full text-current opacity-70 hover:opacity-100 transition-opacity cursor-pointer absolute end-0 top-1/2 -translate-y-1/2 p-2"
								onClick={() => removeTag(tag.text)}
								onMouseDown={(e) => {
									e.preventDefault();
									e.stopPropagation();
								}}
							>
								<XIcon aria-hidden="true" size={12} />
							</button>
						)}
					</Badge>
				)}
				styleClasses={{
					input: "rounded-md transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
					tagList: {
						container: "gap-1"
					}
				}}
			/>
		</div>
	);
};

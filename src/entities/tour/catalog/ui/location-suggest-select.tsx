import type { Icon } from "@solar-icons/react/lib/types";
import { MapPointIcon } from "@solar-icons/react/outline";
import { Loader2Icon } from "lucide-react";
import {
	type FC,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState
} from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Input,
	Popover,
	PopoverAnchor,
	PopoverContent,
	ScrollArea
} from "@/shared/ui";

import {
	LOCATION_SUGGEST_KIND_LABEL_KEYS,
	getLocationSuggestKindBadgeClass,
	getLocationSuggestKindIcon
} from "../config";
import {
	type TLocationSuggestOption,
	encodeLocationSuggestValue
} from "../converters/location-suggest.converters";
import type { TLocationSuggestFormValue } from "../schema/search-tours.schema";

export interface ILocationSuggestSelectProps {
	options: TLocationSuggestOption[];
	value?: TLocationSuggestFormValue | null;
	onChange: (value: TLocationSuggestFormValue | null) => void;
	onQueryChange: (query: string) => void;
	isLoading?: boolean;
	minQueryLength?: number;
	placeholder?: string;
	emptyText?: string;
	disabled?: boolean;
	className?: string;
	icon?: Icon;
}

export const LocationSuggestSelect: FC<ILocationSuggestSelectProps> = ({
	options,
	value,
	onChange,
	onQueryChange,
	isLoading = false,
	minQueryLength = 2,
	placeholder = "Search location...",
	emptyText = "No results found.",
	disabled,
	className,
	icon: DefaultIcon = MapPointIcon
}) => {
	const { t } = useTranslation("common_tours");
	const [open, setOpen] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const anchorRef = useRef<HTMLDivElement>(null);
	const [popoverWidth, setPopoverWidth] = useState<number>();

	const selectedValueKey = useMemo(
		() =>
			value
				? encodeLocationSuggestValue(value.kind, value.value)
				: undefined,
		[value]
	);

	const selectedOption = useMemo(
		() => options.find((option) => option.value === selectedValueKey),
		[options, selectedValueKey]
	);

	const closedDisplayValue = value?.label ?? selectedOption?.label ?? "";
	const displayValue = open ? searchValue : closedDisplayValue;

	const InputIcon = useMemo(() => {
		if (value?.kind) {
			return getLocationSuggestKindIcon(value.kind);
		}

		return DefaultIcon;
	}, [DefaultIcon, value?.kind]);

	const showEmpty =
		!isLoading &&
		searchValue.trim().length >= minQueryLength &&
		options.length === 0;

	const showOptions = !isLoading && options.length > 0;

	const updatePopoverWidth = useCallback(() => {
		if (anchorRef.current) {
			setPopoverWidth(anchorRef.current.offsetWidth);
		}
	}, []);

	useEffect(() => {
		if (open) {
			updatePopoverWidth();
		}
	}, [open, updatePopoverWidth]);

	const handleInputChange = (val: string) => {
		setSearchValue(val);
		onQueryChange(val);

		if (val === "") {
			onChange(null);
			return;
		}

		if (!open) {
			setOpen(true);
		}
	};

	const handleSelect = (option: TLocationSuggestOption) => {
		onChange(option.suggestion);
		setSearchValue("");
		onQueryChange("");
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverAnchor asChild>
				<div
					ref={anchorRef}
					className={cn("relative w-full", className)}
				>
					<InputIcon className="pointer-events-none absolute top-1/2 start-3 size-5 -translate-y-1/2 text-primary opacity-50" />
					<Input
						value={displayValue}
						placeholder={placeholder}
						disabled={disabled}
						className="ps-10 text-base"
						onFocus={() => {
							setSearchValue(closedDisplayValue);
							setOpen(true);
						}}
						onBlur={() => {
							window.setTimeout(() => setOpen(false), 150);
						}}
						onChange={(event) =>
							handleInputChange(event.target.value)
						}
					/>
				</div>
			</PopoverAnchor>
			<PopoverContent
				className="p-2"
				align="start"
				style={popoverWidth ? { width: popoverWidth } : undefined}
				onOpenAutoFocus={(e) => e.preventDefault()}
			>
				{isLoading ? (
					<div className="flex items-center justify-center py-6">
						<Loader2Icon className="size-5 animate-spin" />
					</div>
				) : null}
				{showEmpty ? (
					<p className="py-6 text-center text-sm text-muted-foreground">
						{emptyText}
					</p>
				) : null}
				{showOptions ? (
					<ScrollArea className="h-64 w-full">
						<ul className="flex flex-col gap-1.5 p-0.5 pr-2">
							{options.map((option) => {
								const kind = option.suggestion.kind;
								const KindIcon =
									getLocationSuggestKindIcon(kind);

								return (
									<li key={option.value}>
										<button
											type="button"
											className="flex w-full items-center gap-3.5 rounded-md px-3 py-3 text-left transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:outline-none"
											onMouseDown={(e) =>
												e.preventDefault()
											}
											onClick={() => handleSelect(option)}
										>
											<span
												className={cn(
													"flex size-11 shrink-0 items-center justify-center rounded-lg",
													getLocationSuggestKindBadgeClass(
														kind
													)
												)}
											>
												<KindIcon className="size-5" />
											</span>
											<span className="min-w-0 flex-1">
												<span className="block truncate text-base font-medium leading-snug">
													{option.label}
												</span>
												<span className="block truncate text-sm text-muted-foreground">
													{t(
														LOCATION_SUGGEST_KIND_LABEL_KEYS[
															kind
														]
													)}
												</span>
											</span>
										</button>
									</li>
								);
							})}
						</ul>
					</ScrollArea>
				) : null}
			</PopoverContent>
		</Popover>
	);
};

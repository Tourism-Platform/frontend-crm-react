"use client";

import {
	type ReactNode,
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useRef,
	useState
} from "react";

import { cn } from "@/shared/lib";
import { Input } from "@/shared/ui/shadcn-ui/input";
import {
	Popover,
	PopoverAnchor,
	PopoverContent
} from "@/shared/ui/shadcn-ui/popover";
import { ScrollArea } from "@/shared/ui/shadcn-ui/scroll-area";
import { Skeleton } from "@/shared/ui/shadcn-ui/skeleton";

export type TAsyncSelectOption = {
	label: string;
	value: string;
};

export type TCustomAsyncSelectProps = {
	value?: string;
	onChange?: (value: string) => void;
	options: TAsyncSelectOption[];
	onQueryChange?: (query: string) => void;
	onLoadMore?: () => void;
	hasMore?: boolean;
	isLoading?: boolean;
	isLoadingMore?: boolean;
	placeholder?: string;
	emptyText?: string;
	disabled?: boolean;
	className?: string;
	selectedLabel?: string;
	/** Approx. item height used to prefetch N items before the end */
	loadMoreThreshold?: number;
	renderOption?: (option: TAsyncSelectOption) => ReactNode;
	/** Строки в разметке опций (px-2 py-1.5 как у кнопки) — и при первой загрузке, и при подгрузке */
	renderSkeleton?: () => ReactNode;
};

const DEFAULT_SKELETON_COUNT = 5;
const DEFAULT_LOAD_MORE_THRESHOLD = 3;
const APPROX_OPTION_HEIGHT_PX = 36;

/** Строка — как кнопка опции: те же отступы и высота строки text-sm */
const DefaultSkeleton = ({ count }: { count: number }) =>
	Array.from({ length: count }).map((_, index) => (
		<div key={index} className="px-2 py-1.5">
			<Skeleton className="w-full text-sm">&nbsp;</Skeleton>
		</div>
	));

export const CustomAsyncSelect = forwardRef<
	HTMLDivElement,
	TCustomAsyncSelectProps
>(
	(
		{
			value,
			onChange,
			options,
			onQueryChange,
			onLoadMore,
			hasMore = false,
			isLoading = false,
			isLoadingMore = false,
			placeholder,
			emptyText = "No results found.",
			disabled,
			className,
			selectedLabel,
			loadMoreThreshold = DEFAULT_LOAD_MORE_THRESHOLD,
			renderOption,
			renderSkeleton
		},
		ref
	) => {
		const [open, setOpen] = useState(false);
		const [searchValue, setSearchValue] = useState("");
		const [cachedSelected, setCachedSelected] =
			useState<TAsyncSelectOption | null>(null);
		const anchorRef = useRef<HTMLDivElement>(null);
		const [popoverWidth, setPopoverWidth] = useState<number>();
		/** State, а не ref: сентинел монтируется позже открытия поповера, эффект должен это увидеть */
		const [loadMoreNode, setLoadMoreNode] = useState<HTMLLIElement | null>(
			null
		);
		const loadMoreLockedRef = useRef(false);
		const isLoadingRef = useRef(isLoading);
		const isLoadingMoreRef = useRef(isLoadingMore);

		isLoadingRef.current = isLoading;
		isLoadingMoreRef.current = isLoadingMore;

		useImperativeHandle(ref, () => anchorRef.current as HTMLDivElement);

		const selectedFromOptions = useMemo(
			() => options.find((option) => option.value === value),
			[options, value]
		);

		useEffect(() => {
			/** Тот же выбор в новом массиве опций — без нового state, иначе цикл рендеров */
			if (selectedFromOptions) {
				setCachedSelected((prev) =>
					prev?.value === selectedFromOptions.value &&
					prev.label === selectedFromOptions.label
						? prev
						: selectedFromOptions
				);
			}
		}, [selectedFromOptions]);

		useEffect(() => {
			if (!value) {
				setCachedSelected(null);
			}
		}, [value]);

		const closedDisplayValue =
			selectedLabel ??
			selectedFromOptions?.label ??
			cachedSelected?.label ??
			"";

		const displayValue = open ? searchValue : closedDisplayValue;

		const showInitialLoading = isLoading && options.length === 0;
		const showEmpty = !isLoading && options.length === 0;
		const showOptions = options.length > 0;

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

		/**
		 * Новые опции тоже снимают блокировку: страница из кеша RTK приходит
		 * без isLoadingMore, и без этого подгрузка останавливается навсегда
		 */
		useEffect(() => {
			if (!isLoadingMore) {
				loadMoreLockedRef.current = false;
			}
		}, [isLoadingMore, options.length]);

		useEffect(() => {
			if (!open || !hasMore || !onLoadMore) {
				return;
			}

			const node = loadMoreNode;
			if (!node) {
				return;
			}

			const root = node.closest("[data-slot='scroll-area-viewport']");
			const rootMarginBottom =
				loadMoreThreshold * APPROX_OPTION_HEIGHT_PX;

			const tryLoadMore = () => {
				if (
					loadMoreLockedRef.current ||
					isLoadingRef.current ||
					isLoadingMoreRef.current
				) {
					return;
				}

				loadMoreLockedRef.current = true;
				onLoadMore();
			};

			const observer = new IntersectionObserver(
				(entries) => {
					if (entries[0]?.isIntersecting) {
						tryLoadMore();
					}
				},
				{
					root,
					rootMargin: `0px 0px ${rootMarginBottom}px 0px`,
					threshold: 0
				}
			);

			observer.observe(node);

			const frameId = window.requestAnimationFrame(() => {
				if (!root) {
					return;
				}

				const rootRect = root.getBoundingClientRect();
				const nodeRect = node.getBoundingClientRect();
				if (nodeRect.top <= rootRect.bottom + rootMarginBottom) {
					tryLoadMore();
				}
			});

			return () => {
				observer.disconnect();
				window.cancelAnimationFrame(frameId);
			};
		}, [
			open,
			hasMore,
			onLoadMore,
			isLoadingMore,
			options.length,
			loadMoreThreshold,
			loadMoreNode
		]);

		const handleInputChange = (val: string) => {
			setSearchValue(val);
			onQueryChange?.(val);

			if (val === "") {
				onChange?.("");
			}

			if (!open) {
				setOpen(true);
			}
		};

		const handleSelect = (option: TAsyncSelectOption) => {
			setCachedSelected(option);
			onChange?.(option.value);
			setSearchValue("");
			onQueryChange?.("");
			setOpen(false);
		};

		const handleOpenChange = (nextOpen: boolean) => {
			setOpen(nextOpen);
			if (nextOpen) {
				setSearchValue("");
				onQueryChange?.("");
				return;
			}
			setSearchValue("");
		};

		return (
			<Popover modal open={open} onOpenChange={handleOpenChange}>
				<PopoverAnchor asChild>
					<div
						ref={anchorRef}
						className={cn("relative w-full", className)}
					>
						<Input
							value={displayValue}
							placeholder={placeholder}
							disabled={disabled}
							autoComplete="off"
							className="cursor-pointer"
							onFocus={() => {
								if (!open) {
									setSearchValue("");
									onQueryChange?.("");
									setOpen(true);
								}
							}}
							onChange={(event) =>
								handleInputChange(event.target.value)
							}
						/>
					</div>
				</PopoverAnchor>
				<PopoverContent
					className="z-[100] p-1"
					align="start"
					style={popoverWidth ? { width: popoverWidth } : undefined}
					onOpenAutoFocus={(e) => e.preventDefault()}
					onCloseAutoFocus={(e) => e.preventDefault()}
				>
					{showInitialLoading ? (
						<div className="flex flex-col gap-0.5 p-0.5 pr-3">
							{renderSkeleton?.() ?? (
								<DefaultSkeleton
									count={DEFAULT_SKELETON_COUNT}
								/>
							)}
						</div>
					) : null}
					{showEmpty ? (
						<p className="py-6 text-center text-sm text-muted-foreground">
							{emptyText}
						</p>
					) : null}
					{showOptions ? (
						<ScrollArea className="h-60 w-full">
							<ul className="flex flex-col gap-0.5 p-0.5 pr-3">
								{options.map((option) => (
									<li key={option.value}>
										<button
											type="button"
											className={cn(
												"w-full cursor-pointer rounded-sm px-2 py-1.5 text-left text-sm hover:bg-accent hover:text-accent-foreground",
												value === option.value &&
													"bg-accent text-accent-foreground"
											)}
											onMouseDown={(e) =>
												e.preventDefault()
											}
											onClick={() => handleSelect(option)}
										>
											{renderOption?.(option) ??
												option.label}
										</button>
									</li>
								))}
								{hasMore ? (
									<li
										ref={setLoadMoreNode}
										className="h-px"
										aria-hidden
									/>
								) : null}
								{isLoadingMore ? (
									<li className="flex flex-col gap-0.5">
										{renderSkeleton?.() ?? (
											<DefaultSkeleton
												count={DEFAULT_SKELETON_COUNT}
											/>
										)}
									</li>
								) : null}
							</ul>
						</ScrollArea>
					) : null}
				</PopoverContent>
			</Popover>
		);
	}
);

CustomAsyncSelect.displayName = "CustomAsyncSelect";

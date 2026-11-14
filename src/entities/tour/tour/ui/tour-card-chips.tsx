import {
	type CSSProperties,
	type FC,
	type MouseEvent,
	type ReactNode,
	useState
} from "react";

import { cn } from "@/shared/lib";
import { Badge, LocaleFlag } from "@/shared/ui";

/** Чип категории и «+N» на обложке: светлая подложка, чтобы читаться поверх фото */
const COVER_CHIP_CLASS =
	"rounded-md bg-card/90 px-1.5 py-0.5 text-[11px] leading-4 font-medium text-foreground shadow-sm backdrop-blur-sm";

/** Появление раскрытых значений: проявление со сдвигом и лёгким увеличением, по очереди */
const APPEAR_CLASS =
	"animate-in fade-in zoom-in-90 slide-in-from-bottom-1 animation-duration-300 fill-mode-both ease-out motion-reduce:animate-none";

/** Задержка между соседними раскрытыми значениями, мс */
const APPEAR_STAGGER_MS = 40;

interface ITourCardChipsProps {
	items: string[];
	/** Сколько видно в свёрнутом виде; остальные — «+N», клик показывает все */
	visible: number;
	/** `flags` — флаги языков, `chips` — чип на каждое значение (категории) */
	mode: "flags" | "chips";
	/** `cover` — поверх обложки карточки, `table` — в ячейке таблицы (`Badge secondary`) */
	appearance?: "cover" | "table";
	className?: string;
}

/**
 * Языки и категории тура на карточке и в строке таблицы.
 * Свёрнуто — первые `visible` и «+N»; клик раскрывает все (плавное появление),
 * повторный — сворачивает. Клик не уходит в ссылку карточки
 */
export const TourCardChips: FC<ITourCardChipsProps> = ({
	items,
	visible,
	mode,
	appearance = "cover",
	className
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	if (!items.length) return null;

	const isCover = appearance === "cover";
	const hiddenCount = Math.max(items.length - visible, 0);
	const canExpand = hiddenCount > 0;
	const shown = isExpanded ? items : items.slice(0, visible);
	const moreLabel = canExpand && !isExpanded ? `+${hiddenCount}` : null;

	// Значения сверх `visible` появились при раскрытии — анимируются по очереди
	const appear = (index: number) =>
		index >= visible
			? {
					className: APPEAR_CLASS,
					style: {
						animationDelay: `${(index - visible) * APPEAR_STAGGER_MS}ms`
					}
				}
			: { className: undefined, style: undefined };

	const renderChip = (
		key: string,
		label: ReactNode,
		appearClass?: string,
		style?: CSSProperties
	) =>
		isCover ? (
			<span
				key={key}
				className={cn(COVER_CHIP_CLASS, appearClass)}
				style={style}
			>
				{label}
			</span>
		) : (
			<Badge
				key={key}
				variant="secondary"
				className={appearClass}
				style={style}
			>
				{label}
			</Badge>
		);

	const content =
		mode === "flags" ? (
			<>
				{shown.map((item, index) => {
					const { className: appearClass, style } = appear(index);
					return (
						<span
							key={item}
							className={cn(
								"flex items-center",
								isCover && "rounded-sm shadow-sm",
								appearClass
							)}
							style={style}
						>
							<LocaleFlag
								code={item}
								title={item.toUpperCase()}
							/>
						</span>
					);
				})}
				{moreLabel && renderChip("more", moreLabel)}
			</>
		) : (
			<>
				{shown.map((item, index) => {
					const { className: appearClass, style } = appear(index);
					return renderChip(item, item, appearClass, style);
				})}
				{moreLabel && renderChip("more", moreLabel)}
			</>
		);

	const groupClassName = cn(
		"inline-flex flex-wrap items-center gap-1",
		mode === "flags" && isCover && "justify-end",
		className
	);

	if (!canExpand) {
		return <div className={groupClassName}>{content}</div>;
	}

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		event.stopPropagation();
		setIsExpanded((value) => !value);
	};

	return (
		<button
			type="button"
			aria-expanded={isExpanded}
			title={(mode === "flags"
				? items.map((item) => item.toUpperCase())
				: items
			).join(", ")}
			onClick={handleClick}
			className={cn(groupClassName, "cursor-pointer text-left")}
		>
			{content}
		</button>
	);
};

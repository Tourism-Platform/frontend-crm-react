import { CheckIcon, CopyIcon } from "lucide-react";
import {
	type FC,
	type MouseEvent,
	useCallback,
	useEffect,
	useState
} from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { useCopyToClipboard } from "@/shared/hooks";
import { cn } from "@/shared/lib";

import {
	COPYABLE_KIND_CLASS,
	ENUM_COPYABLE_KIND,
	type TCopyableKind
} from "../model/copyable-value.config";

const EMPTY = "—";
const COPIED_MS = 1_500;

interface ICopyableValueProps {
	value: string | number | null | undefined;
	kind?: TCopyableKind;
	/** Значение ещё и ссылка: текст навигирует, копирует отдельная иконка */
	to?: string;
	className?: string;
}

/**
 * Единое копирование значения по клику. Размер и цвет наследуются от места,
 * начертание — по `kind`; на наведении — курсор копирования, подсветка и иконка,
 * после копирования — галочка и общий тост
 */
export const CopyableValue: FC<ICopyableValueProps> = ({
	value,
	kind = ENUM_COPYABLE_KIND.TEXT,
	to,
	className
}) => {
	const { t } = useTranslation("common");
	const [copied, setCopied] = useState(false);
	const copy = useCopyToClipboard({
		success: t("clipboard.copied"),
		error: t("clipboard.copy_failed")
	});
	const text = value === null || value === undefined ? "" : String(value);

	useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), COPIED_MS);
		return () => clearTimeout(timer);
	}, [copied]);

	const handleCopy = useCallback(
		async (event: MouseEvent) => {
			/** Значение может стоять внутри кликабельной строки или карточки */
			event.preventDefault();
			event.stopPropagation();
			if (await copy(text)) setCopied(true);
		},
		[copy, text]
	);

	if (!text) return <span className={className}>{EMPTY}</span>;

	const Icon = copied ? CheckIcon : CopyIcon;
	const icon = (
		<Icon
			aria-hidden="true"
			className={cn(
				"size-3.5 shrink-0 transition-opacity",
				copied
					? "text-green-600 opacity-100"
					: "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
			)}
		/>
	);
	const label = `${t("clipboard.copy")}: ${text}`;

	if (to) {
		return (
			<span
				className={cn(
					"group inline-flex max-w-full min-w-0 items-center gap-1.5 align-middle",
					className
				)}
			>
				<Link
					to={to}
					title={text}
					className={cn(
						"truncate hover:underline",
						COPYABLE_KIND_CLASS[kind]
					)}
				>
					{text}
				</Link>
				<button
					type="button"
					title={t("clipboard.copy")}
					aria-label={label}
					onClick={handleCopy}
					className="inline-flex shrink-0 cursor-copy text-muted-foreground hover:text-primary"
				>
					{icon}
				</button>
			</span>
		);
	}

	return (
		<button
			type="button"
			title={text}
			aria-label={label}
			onClick={handleCopy}
			className={cn(
				"group inline-flex max-w-full min-w-0 cursor-copy items-center gap-1.5 text-left align-middle",
				className
			)}
		>
			<span
				className={cn(
					"truncate decoration-dotted underline-offset-4 group-hover:text-primary group-hover:underline",
					COPYABLE_KIND_CLASS[kind]
				)}
			>
				{text}
			</span>
			{icon}
		</button>
	);
};

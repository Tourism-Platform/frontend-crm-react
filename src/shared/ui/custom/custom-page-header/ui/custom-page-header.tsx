import type { FC, ReactNode } from "react";

import { cn } from "@/shared/lib";

export interface ICustomPageHeaderProps {
	title: ReactNode;
	/** Пояснение под заголовком */
	subtitle?: ReactNode;
	/** Счётчик рядом с заголовком; 0 и undefined — без него */
	count?: number;
	/** Кнопки справа; на узком экране переносятся под заголовок */
	actions?: ReactNode;
	className?: string;
}

/** Шапка страницы кабинета: акцент слева, заголовок, счётчик, подзаголовок и действия, линия снизу */
export const CustomPageHeader: FC<ICustomPageHeaderProps> = ({
	title,
	subtitle,
	count,
	actions,
	className
}) => (
	<header
		className={cn(
			"flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-border/60 pb-4",
			className
		)}
	>
		<div className="flex min-w-0 items-stretch gap-3">
			<span
				aria-hidden
				className="w-1 shrink-0 rounded-full bg-primary"
			/>
			<div className="flex min-w-0 flex-col gap-1">
				<div className="flex min-w-0 items-center gap-2.5">
					<h1 className="truncate text-2xl font-semibold tracking-tight md:text-3xl">
						{title}
					</h1>
					{count ? (
						<span className="shrink-0 rounded-md bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground tabular-nums">
							{count}
						</span>
					) : null}
				</div>
				{subtitle ? (
					<p className="max-w-2xl text-sm text-muted-foreground">
						{subtitle}
					</p>
				) : null}
			</div>
		</div>
		{actions ? (
			<div className="flex flex-wrap items-center gap-2">{actions}</div>
		) : null}
	</header>
);

import { type VariantProps, cva } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/shared/lib";

/**
 * Таблица на стекле — только контейнер таблицы (`data-slot="data-grid"`): шапка на приглушённой
 * подложке мелкими прописными, лёгкая «зебра», строка под курсором — акцентная подсветка и полоска
 * слева, цифры моноширинные; внутри стеклянной карточки — без своей заливки, тени и размытия
 * (второго слоя стекла нет)
 */
const GLASS_TABLE_PARTS =
	"data-[slot=data-grid]:[&_thead_tr]:bg-muted/70 data-[slot=data-grid]:[&_thead_th]:text-xs data-[slot=data-grid]:[&_thead_th]:font-semibold data-[slot=data-grid]:[&_thead_th]:uppercase data-[slot=data-grid]:[&_thead_th]:tracking-wider data-[slot=data-grid]:[&_tbody_tr]:transition-colors data-[slot=data-grid]:[&_tbody_tr:nth-child(even):not(:hover)]:bg-muted/30 data-[slot=data-grid]:[&_tbody_tr:hover]:bg-accent/60 data-[slot=data-grid]:[&_tbody_tr:hover>td:first-child]:shadow-[inset_3px_0_0_0_var(--primary)] data-[slot=data-grid]:[&_tbody_td]:tabular-nums data-[slot=data-grid]:in-data-[variant=glass]:bg-transparent data-[slot=data-grid]:in-data-[variant=glass]:shadow-none data-[slot=data-grid]:in-data-[variant=glass]:backdrop-blur-none dark:data-[slot=data-grid]:in-data-[variant=glass]:bg-transparent dark:data-[slot=data-grid]:in-data-[variant=glass]:shadow-none";

/**
 * Стекло (Blogix, D10): полупрозрачная заливка с размытием точечного фона, световая грань сверху.
 * Под стеклом только точки, без цветных пятен — поэтому заливка плотная, граница — токен темы,
 * без диагонального блика и усиления насыщенности (они давали серую муть).
 * Без backdrop-filter — обычная заливка.
 * Отдельно от карточки — для других поверхностей (контейнер таблицы, шапка, кнопки)
 */
const GLASS_SURFACE = `relative isolate border-border/70 bg-card/75 shadow-[inset_0_1px_0_0_rgb(255_255_255/0.9),0_1px_2px_0_hsl(211_30%_25%/0.06),0_12px_32px_-16px_hsl(211_30%_25%/0.22)] backdrop-blur-xl dark:border-border dark:bg-card/80 dark:shadow-[inset_0_1px_0_0_rgb(255_255_255/0.05),0_10px_30px_-12px_rgb(0_0_0/0.5)] supports-[not(backdrop-filter:blur(0))]:bg-card ${GLASS_TABLE_PARTS}`;

const cardVariants = cva(
	"text-card-foreground flex flex-col gap-6 rounded-xl border py-6",
	{
		variants: {
			variant: {
				default: "bg-card shadow-sm",
				glass: GLASS_SURFACE
			}
		},
		defaultVariants: {
			variant: "default"
		}
	}
);

function Card({
	className,
	variant,
	...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
	return (
		<div
			data-slot="card"
			data-variant={variant ?? "default"}
			className={cn(cardVariants({ variant }), className)}
			{...props}
		/>
	);
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-header"
			className={cn(
				"@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
				className
			)}
			{...props}
		/>
	);
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-title"
			className={cn("leading-none font-semibold", className)}
			{...props}
		/>
	);
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-description"
			className={cn("text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-action"
			className={cn(
				"col-start-2 row-span-2 row-start-1 self-start justify-self-end",
				className
			)}
			{...props}
		/>
	);
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-content"
			className={cn("px-6", className)}
			{...props}
		/>
	);
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="card-footer"
			className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
			{...props}
		/>
	);
}

export {
	Card,
	CardHeader,
	CardFooter,
	CardTitle,
	CardAction,
	CardDescription,
	CardContent,
	cardVariants,
	GLASS_SURFACE
};

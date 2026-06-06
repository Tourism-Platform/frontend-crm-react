import type { CSSProperties, FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";

import { PROBLEM_APP_ICON_CLASS, PROBLEM_TOOL_ITEMS_LIST } from "../../model";
import type { IProblemToolItem } from "../../model";

const ORBIT_RADIUS = 38;

const formatBadgeCount = (count: number): string =>
	count > 99 ? "99+" : String(count);

const getOrbitPosition = (index: number, total: number) => {
	const angle = (index / total) * 2 * Math.PI - Math.PI / 2;

	return {
		left: `${50 + ORBIT_RADIUS * Math.cos(angle)}%`,
		top: `${50 + ORBIT_RADIUS * Math.sin(angle)}%`
	};
};

interface IProblemToolTileProps {
	item: IProblemToolItem;
	label: string;
	style?: CSSProperties;
}

const ProblemToolTile: FC<IProblemToolTileProps> = ({ item, label, style }) => {
	const { icon: Icon, badgeCount, rotate, iconClass, isAnchor } = item;

	return (
		<div
			className="absolute flex w-[68px] flex-col items-center gap-1"
			style={{
				left: style?.left,
				top: style?.top,
				transform: `translate(-50%, -50%) rotate(${isAnchor ? 0 : rotate}deg)`
			}}
		>
			<div className="relative">
				<div
					className={cn(
						"flex items-center justify-center",
						PROBLEM_APP_ICON_CLASS,
						isAnchor
							? "size-16 rounded-[1.35rem]"
							: "size-14 rounded-[1.15rem]"
					)}
				>
					<Icon
						className={cn(
							isAnchor ? "size-8" : "size-7",
							iconClass
						)}
						strokeWidth={2}
					/>
				</div>

				{badgeCount > 0 ? (
					<span className="absolute -right-1.5 -top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-background bg-destructive px-0.5 text-[9px] font-bold leading-none text-destructive-foreground">
						{formatBadgeCount(badgeCount)}
					</span>
				) : null}
			</div>

			<span
				className="max-w-[72px] truncate text-center text-[10px] font-medium leading-tight text-muted-foreground"
				style={{
					transform: isAnchor ? undefined : `rotate(${-rotate}deg)`
				}}
			>
				{label}
			</span>
		</div>
	);
};

interface IProblemChaosPanelProps {
	className?: string;
}

export const ProblemChaosPanel: FC<IProblemChaosPanelProps> = ({
	className
}) => {
	const { t } = useTranslation("main");

	const anchor = PROBLEM_TOOL_ITEMS_LIST.find(({ isAnchor }) => isAnchor);
	const orbitItems = PROBLEM_TOOL_ITEMS_LIST.filter(
		({ isAnchor }) => !isAnchor
	);

	return (
		<div
			className={cn(
				"relative flex min-h-[420px] flex-col overflow-hidden bg-card p-5",
				className
			)}
		>
			<div className="space-y-1">
				<span className="inline-flex rounded-full border border-border bg-muted px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
					{t("problem.visual.beforeBadge")}
				</span>
				<p className="text-sm font-semibold leading-snug">
					{t("problem.visual.chaosLabel")}
				</p>
				<p className="text-xs text-muted-foreground">
					{t("problem.visual.beforeSummary")}
				</p>
			</div>

			<div className="relative mx-auto mt-4 min-h-[300px] w-full max-w-[360px] flex-1">
				<div
					className="pointer-events-none absolute left-1/2 top-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border/50"
					style={{ width: `${ORBIT_RADIUS * 2}%` }}
					aria-hidden
				/>

				{anchor ? (
					<ProblemToolTile
						item={anchor}
						label={t(`problem.visual.tools.${anchor.id}`)}
						style={{ left: "50%", top: "50%" }}
					/>
				) : null}

				{orbitItems.map((item, index) => (
					<ProblemToolTile
						key={item.id}
						item={item}
						label={t(`problem.visual.tools.${item.id}`)}
						style={getOrbitPosition(index, orbitItems.length)}
					/>
				))}
			</div>
		</div>
	);
};

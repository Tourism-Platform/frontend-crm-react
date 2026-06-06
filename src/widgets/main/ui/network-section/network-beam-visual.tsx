import { type FC, type RefObject, useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";

import {
	NETWORK_BEAM_ITEMS_LIST,
	NETWORK_SUPPLIER_ITEMS_LIST,
	NETWORK_USER_ITEMS_LIST
} from "../../model";
import type { TNetworkNode } from "../../model";

import { NetworkBeam } from "./network-beam";
import { NetworkNodeCard } from "./network-node-card";

const createRefBucket = (count: number) =>
	Array.from({ length: count }, () => ({
		current: null as HTMLDivElement | null
	}));

interface INetworkBeamVisualProps {
	className?: string;
	compact?: boolean;
}

export const NetworkBeamVisual: FC<INetworkBeamVisualProps> = ({
	className,
	compact = false
}) => {
	const { t } = useTranslation("main");
	const containerRef = useRef<HTMLDivElement>(null);
	const hubRef = useRef<HTMLDivElement>(null);

	const suppliers = t("roadmap.network.suppliers", {
		returnObjects: true
	}) as TNetworkNode[];
	const users = t("roadmap.network.users", {
		returnObjects: true
	}) as TNetworkNode[];

	const supplierRefBucket = useMemo(
		() => createRefBucket(suppliers.length),
		[suppliers.length]
	);
	const userRefBucket = useMemo(
		() => createRefBucket(users.length),
		[users.length]
	);

	const setSupplierRef =
		(index: number) => (element: HTMLDivElement | null) => {
			supplierRefBucket[index].current = element;
		};

	const setUserRef = (index: number) => (element: HTMLDivElement | null) => {
		userRefBucket[index].current = element;
	};

	return (
		<div
			ref={containerRef}
			className={cn(
				"relative w-full overflow-visible",
				!compact && "min-h-[300px] md:min-h-[340px]",
				className
			)}
		>
			<div
				className={cn(
					"relative z-[2] grid w-full grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center",
					compact ? "gap-3 sm:gap-4" : "gap-6 md:gap-[50px]"
				)}
			>
				<div className="flex min-w-0 flex-col gap-2.5">
					<p className="mb-1 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
						{t("roadmap.network.suppliers_title")}
					</p>
					{suppliers.map((node, index) => {
						const Icon = NETWORK_SUPPLIER_ITEMS_LIST[index].icon;

						return (
							<NetworkNodeCard
								key={node.label}
								ref={setSupplierRef(index)}
								label={node.label}
								icon={Icon}
								compact={compact}
							/>
						);
					})}
				</div>

				<div className="relative shrink-0">
					<div
						ref={hubRef}
						className={cn(
							"relative z-[3] flex flex-col items-center justify-center rounded-full bg-gradient-to-br from-primary to-violet-600 text-center text-white shadow-[0_12px_30px_rgba(54,191,250,0.35)]",
							"before:pointer-events-none before:absolute before:-inset-2 before:rounded-full before:border before:border-primary/30",
							"after:pointer-events-none after:absolute after:-inset-[18px] after:rounded-full after:border after:border-primary/20",
							compact ? "size-[90px]" : "size-24 md:size-[90px]"
						)}
					>
						<span className="text-[8px] uppercase tracking-[0.1em] opacity-[0.85]">
							{t("roadmap.network.hub.label")}
						</span>
						<span className="text-[13px] font-bold tracking-tight">
							{t("roadmap.network.hub.name")}
						</span>
					</div>
				</div>

				<div className="flex min-w-0 flex-col gap-2.5">
					<p className="mb-1 text-center text-[10px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
						{t("roadmap.network.users_title")}
					</p>
					{users.map((node, index) => {
						const Icon = NETWORK_USER_ITEMS_LIST[index].icon;

						return (
							<NetworkNodeCard
								key={node.label}
								ref={setUserRef(index)}
								label={node.label}
								icon={Icon}
								compact={compact}
							/>
						);
					})}
				</div>
			</div>

			{suppliers.map((node, index) => {
				const config =
					NETWORK_BEAM_ITEMS_LIST[index] ??
					NETWORK_BEAM_ITEMS_LIST[2];

				return (
					<NetworkBeam
						key={`supplier-beam-${node.label}`}
						containerRef={containerRef}
						fromRef={
							supplierRefBucket[
								index
							] as RefObject<HTMLElement | null>
						}
						toRef={hubRef}
						fromSide="right"
						curvature={config.curvature}
						endYOffset={config.endYOffset}
						pathColor="var(--primary)"
						gradientStartColor="var(--primary)"
						gradientStopColor="var(--primary)"
					/>
				);
			})}
			{users.map((node, index) => {
				const config =
					NETWORK_BEAM_ITEMS_LIST[index] ??
					NETWORK_BEAM_ITEMS_LIST[2];

				return (
					<NetworkBeam
						key={`user-beam-${node.label}`}
						containerRef={containerRef}
						fromRef={
							userRefBucket[
								index
							] as RefObject<HTMLElement | null>
						}
						toRef={hubRef}
						fromSide="left"
						curvature={config.curvature}
						endYOffset={config.endYOffset}
						pathColor="var(--primary)"
						gradientStartColor="var(--primary)"
						gradientStopColor="var(--primary)"
					/>
				);
			})}
		</div>
	);
};

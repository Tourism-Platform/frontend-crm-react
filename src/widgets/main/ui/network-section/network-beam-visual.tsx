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
}

export const NetworkBeamVisual: FC<INetworkBeamVisualProps> = ({
	className
}) => {
	const { t } = useTranslation("main");
	const containerRef = useRef<HTMLDivElement>(null);
	const hubRef = useRef<HTMLDivElement>(null);

	const suppliers = t("network.suppliers", {
		returnObjects: true
	}) as TNetworkNode[];
	const users = t("network.users", { returnObjects: true }) as TNetworkNode[];

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
				"relative grid min-h-[380px] w-full items-stretch overflow-hidden md:min-h-[420px] w-full",
				className
			)}
		>
			<div className="grid grid-cols-[1fr_auto_1fr] w-full justify-between gap-20">
				<p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					{t("network.suppliers_title")}
				</p>
				<div></div>
				<p className="text-center text-xs font-semibold uppercase tracking-widest text-muted-foreground">
					{t("network.users_title")}
				</p>
			</div>
			<div className="relative z-10 grid grid-cols-[1fr_auto_1fr] w-full items-stretch justify-between gap-20">
				<div className="flex flex-1 flex-col justify-between gap-3 py-2">
					{suppliers.map((node, index) => {
						const Icon = NETWORK_SUPPLIER_ITEMS_LIST[index].icon;

						return (
							<NetworkNodeCard
								key={node.label}
								ref={setSupplierRef(index)}
								label={node.label}
								icon={Icon}
							/>
						);
					})}
				</div>

				<div className="flex shrink-0 items-center justify-center">
					<div
						ref={hubRef}
						className="z-10 flex size-24 flex-col items-center justify-center rounded-full border-2 border-primary/20 bg-card text-center text-foreground shadow-md md:size-28"
					>
						<span className="text-[10px] uppercase tracking-widest opacity-90">
							{t("network.hub.label")}
						</span>
						<span className="text-base font-bold text-primary md:text-lg">
							{t("network.hub.name")}
						</span>
					</div>
				</div>

				<div className="flex flex-1 flex-col justify-between gap-3 py-2">
					{users.map((node, index) => {
						const Icon = NETWORK_USER_ITEMS_LIST[index].icon;
						return (
							<NetworkNodeCard
								key={node.label}
								ref={setUserRef(index)}
								label={node.label}
								icon={Icon}
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

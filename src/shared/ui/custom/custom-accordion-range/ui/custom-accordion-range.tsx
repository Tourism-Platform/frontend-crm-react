"use client";

import { type FC, useEffect, useMemo, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell } from "recharts";

import { cn } from "@/shared/lib";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent
} from "@/shared/ui";

import { CustomPriceFilter } from "../../custom-price-filter";

import { CustomAccordionRangeSkeleton } from "./custom-accordion-range-skeleton";

interface IPriceRange {
	from: number;
	to: number;
}

interface ICustomAccordionRangeProps {
	id: string;
	title: string;
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	min: number;
	max: number;
	from?: number;
	to?: number;
	step?: number;
	useHistogram?: boolean;
	histogramData?: { range: string; count: number }[];
	isLoading?: boolean;
	onChange: (value: IPriceRange) => void;
	className?: string;
}

const CHART_CONFIG = {
	count: {
		label: "Tours",
		color: "var(--primary)"
	}
} satisfies ChartConfig;

export const CustomAccordionRange: FC<ICustomAccordionRangeProps> = ({
	id,
	title,
	icon: Icon,
	min,
	max,
	from = 0,
	to = 3000,
	step = 200,
	useHistogram,
	histogramData = [],
	isLoading,
	onChange,
	className
}) => {
	const [localValue, setLocalValue] = useState<IPriceRange>({
		from: from ?? min,
		to: to ?? max
	});

	useEffect(() => {
		setLocalValue({
			from: from ?? min,
			to: to ?? max
		});
	}, [from, to, min, max]);

	const isRangeInPriceFilter = (rangeStr: string): boolean => {
		const [rangeStart, rangeEnd] = rangeStr.split("-").map(Number);
		const filterStart = Math.floor(localValue.from / step) * step;
		const filterEnd = Math.ceil(localValue.to / step) * step;

		return rangeStart >= filterStart && rangeEnd <= filterEnd;
	};

	const histogramColors = useMemo(() => {
		return histogramData.map((item) =>
			isRangeInPriceFilter(item.range) ? "var(--primary)" : "var(--muted)"
		);
	}, [histogramData, localValue, step]);

	const handleSliderChange = (newValue: IPriceRange) => {
		setLocalValue(newValue);
		onChange(newValue);
	};

	return (
		<Accordion
			type="single"
			collapsible
			defaultValue={id}
			className={cn("w-full", className)}
		>
			<AccordionItem value={id} className="gap-3 grid border-none">
				<AccordionTrigger className="py-2 hover:no-underline">
					<div className="flex items-center gap-2 font-semibold text-foreground">
						{Icon && <Icon className="text-primary h-5 w-5" />}
						<span>{title}</span>
					</div>
				</AccordionTrigger>
				<AccordionContent className="pb-4">
					<div className="flex flex-col gap-4 px-1">
						{useHistogram && isLoading && (
							<CustomAccordionRangeSkeleton
								count={(to - from) / step}
							/>
						)}

						{useHistogram &&
							!isLoading &&
							histogramData.length > 0 && (
								<ChartContainer
									config={CHART_CONFIG}
									className="h-[100px] w-full"
								>
									<BarChart
										accessibilityLayer
										data={histogramData}
									>
										<CartesianGrid vertical={false} />
										<ChartTooltip
											cursor={false}
											content={
												<ChartTooltipContent
													hideLabel
												/>
											}
										/>
										<Bar dataKey="count" radius={4}>
											{histogramData.map((_, index) => (
												<Cell
													key={`cell-${index}`}
													fill={
														histogramColors[index]
													}
												/>
											))}
										</Bar>
									</BarChart>
								</ChartContainer>
							)}

						<CustomPriceFilter
							min={min}
							max={max}
							from={localValue.from}
							to={localValue.to}
							onChange={handleSliderChange}
						/>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
};

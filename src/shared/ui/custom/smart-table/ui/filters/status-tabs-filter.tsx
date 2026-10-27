import useEmblaCarousel from "embla-carousel-react";
import { type FC } from "react";

import { cn } from "@/shared/lib";
import {
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger
} from "@/shared/ui";

import type { IStatusTabs } from "../../model";

interface IStatusTabsFilterProps {
	statusTabs: IStatusTabs[];
	activeStatusTab?: string;
	onStatusTabChange?: (value: string) => void;
	className?: string;
}

export const StatusTabsFilter: FC<IStatusTabsFilterProps> = ({
	statusTabs,
	activeStatusTab,
	onStatusTabChange,
	className
}) => {
	// Табы листаются свайпом/drag, когда не помещаются по ширине.
	// slides — только триггеры, чтобы индикатор не считался слайдом.
	// keepSnaps — snap index совпадает с индексом таба.
	const [viewportRef, emblaApi] = useEmblaCarousel({
		dragFree: true,
		containScroll: "keepSnaps",
		align: "start",
		slides: '[role="tab"]'
	});

	// Как в marketplace (slideTo): выбранный таб докручивается в начало ленты
	const handleChange = (value: string) => {
		if (value === activeStatusTab) return;
		onStatusTabChange?.(value);
		emblaApi?.scrollTo(statusTabs.findIndex((tab) => tab.value === value));
	};

	return (
		<CustomOptionTabs
			value={activeStatusTab}
			onValueChange={handleChange}
			className={cn("min-w-0 flex-[0_1_auto]", className)}
		>
			{/* Фон на viewport: контейнер embla шириной во viewport, табы выходят за него.
			    relative — embla меряет через offsetLeft, контейнер и табы должны
			    считаться в одной системе координат (список уже relative из-за индикатора) */}
			<div
				ref={viewportRef}
				className="relative min-w-0 overflow-hidden rounded-lg bg-muted"
			>
				<CustomOptionTabsList
					indicator="measured"
					className="flex w-full justify-start gap-2 bg-transparent"
				>
					{statusTabs.map((tab) => (
						<CustomOptionTabsTrigger
							key={tab.value}
							value={tab.value}
							className="shrink-0"
							// Radix активирует таб на mousedown — тогда drag
							// карусели переключал бы статус. Активируем по click:
							// embla сам гасит click после перетаскивания.
							onMouseDown={(event) => event.preventDefault()}
							onClick={() => handleChange(tab.value)}
						>
							{tab.label}
						</CustomOptionTabsTrigger>
					))}
				</CustomOptionTabsList>
			</div>
		</CustomOptionTabs>
	);
};

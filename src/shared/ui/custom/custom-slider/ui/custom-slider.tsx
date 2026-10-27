import type { FC } from "react";

import { Slider } from "@/shared/ui/shadcn-ui/slider";

export interface ICustomSliderProps {
	value?: number | null;
	onChange: (value: number) => void;
	min?: number;
	max?: number;
	disabled?: boolean;
	startLabel: string;
	endLabel: string;
}

export const CustomSlider: FC<ICustomSliderProps> = ({
	value,
	onChange,
	min = 0,
	max = 100,
	disabled,
	startLabel,
	endLabel
}) => {
	const current =
		typeof value === "number" && Number.isFinite(value) ? value : min;
	const end = max - current;

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between text-sm">
				<span>
					{startLabel} {current}%
				</span>
				<span>
					{endLabel} {end}%
				</span>
			</div>
			<Slider
				min={min}
				max={max}
				step={1}
				disabled={disabled}
				value={[current]}
				onValueChange={([next]) => onChange(next ?? min)}
			/>
		</div>
	);
};

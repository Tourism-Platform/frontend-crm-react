"use client";

import { type FC, useEffect, useState } from "react";

import { Input, Slider } from "@/shared/ui";

export interface IPriceRange {
	from: number;
	to: number;
}

interface ICustomPriceFilterProps {
	min?: number;
	max?: number;
	from?: number;
	to?: number;
	onChange?: (value: IPriceRange) => void;
}

export const CustomPriceFilter: FC<ICustomPriceFilterProps> = ({
	min = 0,
	max = 3000,
	from,
	to,
	onChange
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

	const handleSliderChange = (val: number[]) => {
		const newValue: IPriceRange = { from: val[0], to: val[1] };
		setLocalValue(newValue);
		onChange?.(newValue);
	};

	const handleInputChange = (field: keyof IPriceRange, val: string) => {
		const numVal = Number(val);
		if (isNaN(numVal)) return;

		const newValue: IPriceRange = { ...localValue, [field]: numVal };
		setLocalValue(newValue);
		onChange?.(newValue);
	};

	return (
		<div className="space-y-4">
			<Slider
				min={min}
				max={max}
				step={10}
				value={[localValue.from, localValue.to]}
				onValueChange={handleSliderChange}
				className="py-4"
			/>

			<div className="flex items-center gap-2">
				<div className="relative flex-1">
					<Input
						type="number"
						value={localValue.from}
						onChange={(e) =>
							handleInputChange("from", e.target.value)
						}
						className="h-9 pr-3 text-sm"
					/>
				</div>
				<div className="relative flex-1">
					<Input
						type="number"
						value={localValue.to}
						onChange={(e) =>
							handleInputChange("to", e.target.value)
						}
						className="h-9 pr-3 text-sm"
					/>
				</div>
			</div>
		</div>
	);
};

import { Plus } from "lucide-react";
import { type FC } from "react";

import {
	Button,
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger
} from "@/shared/ui";

import type { IPricingReviewOption } from "@/entities/tour";

interface IPricingReviewTabsProps {
	options: IPricingReviewOption[];
	activeId: number;
	onChange: (id: number) => void;
}

export const PricingReviewTabs: FC<IPricingReviewTabsProps> = ({
	options,
	activeId,
	onChange
}) => {
	return (
		<div className="flex items-center gap-2">
			<CustomOptionTabs
				value={activeId.toString()}
				onValueChange={(val) => onChange(Number(val))}
			>
				<CustomOptionTabsList className="grid grid-flow-col">
					{options.map((option) => (
						<CustomOptionTabsTrigger
							key={option.id}
							value={option.id.toString()}
							variant="tongue"
							className="min-w-[120px]"
						>
							{option.name}
						</CustomOptionTabsTrigger>
					))}
				</CustomOptionTabsList>
			</CustomOptionTabs>
			<Button variant="ghost" size="icon" className="h-10 w-10">
				<Plus className="h-5 w-5 text-muted-foreground" />
			</Button>
		</div>
	);
};

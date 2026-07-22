import { type FC } from "react";

import {
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger
} from "@/shared/ui";

import type { IOption } from "@/entities/tour";

interface IPricingReviewTabsProps {
	options: IOption[];
	activeId: string;
	onChange: (id: string) => void;
}

export const PricingReviewTabs: FC<IPricingReviewTabsProps> = ({
	options,
	activeId,
	onChange
}) => {
	return (
		<div className="flex items-center gap-2">
			<CustomOptionTabs value={activeId} onValueChange={onChange}>
				<CustomOptionTabsList className="grid grid-flow-col">
					{options.map((option) => (
						<CustomOptionTabsTrigger
							key={option.id}
							value={option.id}
							variant="tongue"
							className="min-w-[120px] max-w-[200px] truncate"
						>
							<div className="truncate">
								<p>{option.name || option.id}</p>
							</div>
						</CustomOptionTabsTrigger>
					))}
				</CustomOptionTabsList>
			</CustomOptionTabs>
		</div>
	);
};

import { FilterIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Button,
	Checkbox,
	Label,
	Popover,
	PopoverContent,
	PopoverTrigger
} from "@/shared/ui";

interface IStatusFilterProps {
	id: string;
	selectedStatuses: string[];
	uniqueStatusValues: any[];
	handleStatusChange: (checked: boolean, value: string) => void;
}

export const StatusFilter: FC<IStatusFilterProps> = ({
	id,
	selectedStatuses,
	uniqueStatusValues,
	handleStatusChange
}) => {
	const { t } = useTranslation("common");
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="outline">
					<FilterIcon
						className="-ms-1 opacity-60"
						size={16}
						aria-hidden="true"
					/>
					{t("table.status")}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-auto min-w-36 p-3" align="start">
				<div className="space-y-3">
					<div className="space-y-3">
						{uniqueStatusValues.map((value, i) => (
							<div
								key={value}
								className="flex items-center gap-2"
							>
								<Checkbox
									id={`${id}-${i}`}
									checked={selectedStatuses.includes(value)}
									onCheckedChange={(checked: boolean) =>
										handleStatusChange(checked, value)
									}
								/>
								<Label
									htmlFor={`${id}-${i}`}
									className="flex grow justify-between gap-2 font-normal"
								>
									{value}
								</Label>
							</div>
						))}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

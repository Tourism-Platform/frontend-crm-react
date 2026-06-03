import { MoreVertical } from "lucide-react";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import {
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/shared/ui";

import type { IOption } from "@/entities/tour";

import { CreateOption, DeleteOption, EditOption } from "@/features/tours";

const menuItemClassName =
	"w-full hover:bg-accent cursor-pointer px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50";

interface IBoardTabsProps {
	tourId: string;
	activeOption: string;
	setActiveOption: React.Dispatch<React.SetStateAction<string>>;
	options: IOption[];
	onOptionDeleted: (optionId: string) => void;
}

export const BoardTabs: FC<IBoardTabsProps> = ({
	tourId,
	activeOption,
	setActiveOption,
	options,
	onOptionDeleted
}) => {
	const { t } = useTranslation("tour_itinerary_page");
	const [draggedTab, setDraggedTab] = useState<string | null>(null);

	const handleTabDragStart = (e: React.DragEvent, optionId: string) => {
		setDraggedTab(optionId);
		e.dataTransfer.effectAllowed = "move";
	};

	const handleTabDrop = (e: React.DragEvent, targetOptionId: string) => {
		e.preventDefault();
		if (draggedTab === targetOptionId || draggedTab === null) return;
		setDraggedTab(null);
	};

	return (
		<div className="px-4 py-2 flex items-center gap-2">
			<CustomOptionTabs
				defaultValue={activeOption}
				value={activeOption}
				onValueChange={(val) => setActiveOption(val)}
			>
				<CustomOptionTabsList className="flex items-center gap-2">
					{options.map((option) => (
						<div
							key={option.id}
							className="relative"
							draggable
							onDragStart={(e) =>
								handleTabDragStart(e, option.id)
							}
							onDrop={(e) => handleTabDrop(e, option.id)}
							onDragEnd={() => setDraggedTab(null)}
						>
							<CustomOptionTabsTrigger
								value={option.id}
								className="flex gap-2 items-center min-w-[120px] max-w-[200px] pr-0"
								variant="tongue"
								asChild
							>
								<div>
									<p className="truncate">
										{option.name || option.id}
									</p>
									<DropdownMenu>
										<DropdownMenuTrigger
											className="cursor-pointer py-1 px-2"
											onClick={(e) => e.stopPropagation()}
										>
											<MoreVertical className="w-4 h-4" />
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end">
											<DropdownMenuItem asChild>
												<EditOption
													tourId={tourId}
													option={option}
													trigger={
														<div
															className={
																menuItemClassName
															}
														>
															{t(
																"option.actions.edit"
															)}
														</div>
													}
												/>
											</DropdownMenuItem>
											<DropdownMenuItem asChild>
												<DeleteOption
													tourId={tourId}
													optionId={option.id}
													onDeleted={() =>
														onOptionDeleted(
															option.id
														)
													}
													trigger={
														<div
															className={
																menuItemClassName
															}
														>
															{t(
																"option.actions.delete"
															)}
														</div>
													}
													className="text-destructive focus:text-destructive hover:bg-accent"
												/>
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</div>
							</CustomOptionTabsTrigger>
						</div>
					))}
				</CustomOptionTabsList>
			</CustomOptionTabs>

			<CreateOption tourId={tourId} />
		</div>
	);
};

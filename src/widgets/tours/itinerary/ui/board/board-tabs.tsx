import { MoreVertical, Plus } from "lucide-react";
import { type FC, useRef, useState } from "react";

import {
	Button,
	CustomOptionTabs,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/shared/ui";

import type { IOption } from "../../model";

interface IBoardTabsProps {
	activeOption: string;
	setActiveOption: React.Dispatch<React.SetStateAction<string>>;
	options: IOption[];
	onAddOption: () => void;
	onDeleteOption: (optionId: string) => void;
}

export const BoardTabs: FC<IBoardTabsProps> = ({
	activeOption,
	setActiveOption,
	options,
	onAddOption,
	onDeleteOption
}) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	// tabs states
	const [editingOption, setEditingOption] = useState<string | null>(null);
	const [editingName, setEditingName] = useState("");
	const [draggedTab, setDraggedTab] = useState<string | null>(null);

	const [localNames, setLocalNames] = useState<Record<string, string>>({});

	const getOptionName = (option: IOption) =>
		localNames[option.id] || option.name;

	const startEditingOption = (option: IOption) => {
		setEditingOption(option.id);
		setEditingName(getOptionName(option));
		setTimeout(() => inputRef.current?.focus(), 0);
	};

	const saveOptionName = () => {
		if (editingName.trim() && editingOption) {
			setLocalNames((prev) => ({
				...prev,
				[editingOption]: editingName.trim()
			}));
		}
		setEditingOption(null);
		setEditingName("");
	};

	const cancelEditingOption = () => {
		setEditingOption(null);
		setEditingName("");
	};

	const handleTabDragStart = (e: React.DragEvent, optionId: string) => {
		setDraggedTab(optionId);
		e.dataTransfer.effectAllowed = "move";
	};

	const handleTabDrop = (e: React.DragEvent, targetOptionId: string) => {
		e.preventDefault();
		if (draggedTab === targetOptionId || draggedTab === null) return;
		// Локальная перестановка табов (UI-only, бэкенд не поддерживает порядок опций)
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
							draggable={editingOption !== option.id}
							onDragStart={(e) =>
								handleTabDragStart(e, option.id)
							}
							onDrop={(e) => handleTabDrop(e, option.id)}
							onDragEnd={() => {
								setDraggedTab(null);
							}}
						>
							{editingOption === option.id ? (
								<input
									ref={inputRef}
									type="text"
									value={editingName}
									onChange={(e) =>
										setEditingName(e.target.value)
									}
									onBlur={saveOptionName}
									onKeyDown={(e) => {
										if (e.key === "Enter") saveOptionName();
										if (e.key === "Escape")
											cancelEditingOption();
									}}
									className="px-4 py-2 border-2 border-primary rounded-t-lg outline-none"
								/>
							) : (
								<CustomOptionTabsTrigger
									key={option.id}
									value={option.id}
									onDoubleClick={() =>
										startEditingOption(option)
									}
									className={
										"flex gap-2 items-center min-w-[120px] max-w-[200px] pr-0"
									}
									variant={"tongue"}
									asChild
								>
									<div>
										<p className="truncate">
											{getOptionName(option)}
										</p>
										<DropdownMenu>
											<DropdownMenuTrigger className="cursor-pointer py-1 px-2">
												<MoreVertical className="w-4 h-4" />
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onClick={() =>
														onDeleteOption(
															option.id
														)
													}
													className=" !text-red-400"
												>
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</CustomOptionTabsTrigger>
							)}
						</div>
					))}
				</CustomOptionTabsList>
			</CustomOptionTabs>

			<Button onClick={onAddOption} size={"icon"} variant={"ghost"}>
				<Plus className="w-5 h-5 text-muted-foreground" />
			</Button>
		</div>
	);
};

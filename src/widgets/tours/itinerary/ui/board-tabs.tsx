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

import type { IOption, TOptionsData } from "../model";

interface IBoardTabsProps {
	optionsData: TOptionsData;
	setOptionsData: React.Dispatch<React.SetStateAction<TOptionsData>>;
	activeOption: number;
	setActiveOption: React.Dispatch<React.SetStateAction<number>>;
}

export const BoardTabs: FC<IBoardTabsProps> = ({
	setOptionsData,
	activeOption,
	setActiveOption
}) => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	// tabs
	const [options, setOptions] = useState<IOption[]>([
		{ id: 1, name: "Option 1" },
		{ id: 2, name: "Option 2" }
	]);
	const [editingOption, setEditingOption] = useState<number | null>(null);
	const [editingName, setEditingName] = useState("");
	const [draggedTab, setDraggedTab] = useState<number | null>(null);
	// const [_, setDragOverTab] = useState<number | null>(null);
	// Tabs logic (add/delete/edit) — preserved from original
	const addOption = () => {
		const newId = options.length
			? Math.max(...options.map((o) => o.id)) + 1
			: 1;
		setOptions((prev) => [...prev, { id: newId, name: `Option ${newId}` }]);
		setOptionsData((prev) => ({
			...prev,
			[newId]: { tripDetails: [], days: { 1: [], 2: [], 3: [], 4: [] } }
		}));
		setActiveOption(newId);
	};

	const deleteOption = (id: number) => {
		if (options.length === 1) return;
		setOptions((prev) => prev.filter((o) => o.id !== id));
		setOptionsData((prev) => {
			const copy = { ...prev };
			delete copy[id];
			return copy;
		});
		if (activeOption === id) {
			const remaining = options.filter((o) => o.id !== id);
			setActiveOption(remaining[0].id);
		}
	};

	const startEditingOption = (option: IOption) => {
		setEditingOption(option.id);
		setEditingName(option.name);
		setTimeout(() => inputRef.current?.focus(), 0);
	};

	const saveOptionName = () => {
		if (editingName.trim())
			setOptions((prev) =>
				prev.map((o) =>
					o.id === editingOption
						? { ...o, name: editingName.trim() }
						: o
				)
			);
		setEditingOption(null);
		setEditingName("");
	};

	const cancelEditingOption = () => {
		setEditingOption(null);
		setEditingName("");
	};

	const handleTabDragStart = (e: React.DragEvent, optionId: number) => {
		setDraggedTab(optionId);
		e.dataTransfer.effectAllowed = "move";
	};

	// const handleTabDragOver = (e: React.DragEvent, optionId: number) => {
	// 	e.preventDefault();
	// 	// if (draggedTab !== optionId) setDragOverTab(optionId);
	// };

	const handleTabDrop = (e: React.DragEvent, targetOptionId: number) => {
		e.preventDefault();
		if (draggedTab === targetOptionId || draggedTab === null) return;
		setOptions((prev) => {
			const draggedIndex = prev.findIndex((o) => o.id === draggedTab);
			const targetIndex = prev.findIndex((o) => o.id === targetOptionId);
			if (draggedIndex === -1 || targetIndex === -1) return prev;
			const newOptions = [...prev];
			const [removed] = newOptions.splice(draggedIndex, 1);
			newOptions.splice(targetIndex, 0, removed);
			return newOptions;
		});
		setDraggedTab(null);
		// setDragOverTab(null);
	};
	return (
		<div className="px-4 py-2 flex items-center gap-2">
			<CustomOptionTabs
				defaultValue={`${activeOption}`}
				value={`${activeOption}`}
				onValueChange={(val) => setActiveOption(parseInt(val))}
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
							// onDragOver={(e) => handleTabDragOver(e, option.id)}
							onDrop={(e) => handleTabDrop(e, option.id)}
							onDragEnd={() => {
								setDraggedTab(null);
								// setDragOverTab(null);
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
									key={`${option.id}`}
									value={`${option.id}`}
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
											{option.name}
										</p>
										<DropdownMenu>
											<DropdownMenuTrigger className="cursor-pointer py-1 px-2">
												<MoreVertical className="w-4 h-4" />
											</DropdownMenuTrigger>
											<DropdownMenuContent align="end">
												<DropdownMenuItem
													onClick={() =>
														deleteOption(option.id)
													}
													className=" !text-red-400"
												>
													Delete
												</DropdownMenuItem>
											</DropdownMenuContent>
										</DropdownMenu>
									</div>
								</CustomOptionTabsTrigger>

								// <CustomOptionTab
								// 	onClick={() => setActiveOption(option.id)}
								// 	onDoubleClick={() => startEditingOption(option)}
								// 	isActive={activeOption === option.id}
								// 	className={cn(
								// 		"flex gap-2 items-center min-w-[120px] max-w-[200px]",
								// 		dragOverTab === option.id &&
								// 			draggedTab !== option.id &&
								// 			"bg-blue-50"
								// 	)}
								// >
								// 	<p className="truncate">{option.name}</p>
								// 	<DropdownMenu>
								// 		<DropdownMenuTrigger className="cursor-pointer py-1 px-2">
								// 			<MoreVertical className="w-4 h-4" />
								// 		</DropdownMenuTrigger>
								// 		<DropdownMenuContent align="end">
								// 			<DropdownMenuItem
								// 				onClick={() => deleteOption(option.id)}
								// 				className=" !text-red-400"
								// 			>
								// 				Delete
								// 			</DropdownMenuItem>
								// 		</DropdownMenuContent>
								// 	</DropdownMenu>
								// </CustomOptionTab>
							)}
						</div>
					))}
				</CustomOptionTabsList>
			</CustomOptionTabs>

			<Button onClick={addOption} size={"icon"} variant={"ghost"}>
				<Plus className="w-5 h-5 text-muted-foreground" />
			</Button>
		</div>
	);
};

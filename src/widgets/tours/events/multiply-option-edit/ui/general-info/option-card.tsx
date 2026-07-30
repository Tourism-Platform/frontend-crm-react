import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { cva } from "class-variance-authority";
import { GripVertical, MoreHorizontal } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { InfoCircleIcon } from "@/shared/assets";
import { buildRoute } from "@/shared/config";
import { cn } from "@/shared/lib";
import {
	Button,
	Card,
	CardContent,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
	PreviewerSimple
} from "@/shared/ui";

import {
	EVENT_METADATA,
	EVENT_TYPE_TO_OPTION_PATH,
	type ITourEventOption,
	useEventEditIds
} from "@/entities/tour";

const variants = cva("p-3 bg-background hover:text-primary", {
	variants: {
		dragging: {
			over: "opacity-50",
			overlay: "ring-2 ring-primary"
		}
	}
});

interface IOptionCardProps {
	option: ITourEventOption;
	isOverlay?: boolean;
	onRemove?: (optionId: string) => void;
}

export const OptionCard: FC<IOptionCardProps> = ({
	option,
	isOverlay,
	onRemove
}) => {
	const { t } = useTranslation("multiply_option_edit_page");
	const { tourId, optionId, eventId } = useEventEditIds();
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging
	} = useSortable({ id: option.id });

	const meta = EVENT_METADATA[option.eventType];
	const Icon = meta?.icon || InfoCircleIcon;
	const colorBg = meta?.color_bg || "bg-gray-500";

	const path = EVENT_TYPE_TO_OPTION_PATH[option.eventType];
	const href = path
		? buildRoute(path, {
				tourId,
				optionId,
				eventId,
				eventOptionId: option.id
			})
		: "";

	const mainInfo = (
		<>
			<div
				className={cn(
					"rounded-full p-2.5 flex items-center shadow-sm shrink-0",
					colorBg
				)}
			>
				<Icon className="size-4 text-white" />
			</div>
			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium truncate">
					{option.name || meta?.title}
				</p>
				{option.description ? (
					<PreviewerSimple
						text={option.description}
						lines={1}
						className="text-xs text-muted-foreground"
					/>
				) : null}
			</div>
		</>
	);

	return (
		<Card
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition
			}}
			className={variants({
				dragging: isOverlay
					? "overlay"
					: isDragging
						? "over"
						: undefined
			})}
		>
			<CardContent className="flex flex-col gap-3 p-0 relative">
				<div className="flex items-center gap-3 justify-between w-full">
					{href && !isOverlay ? (
						<Link
							to={href}
							className="flex flex-1 min-w-0 items-center gap-3"
						>
							{mainInfo}
						</Link>
					) : (
						<div className="flex flex-1 min-w-0 items-center gap-3">
							{mainInfo}
						</div>
					)}

					{!isOverlay ? (
						<>
							{/* <Checkbox
								checked={option.isOptional}
								onCheckedChange={(checked) => {
									onToggleOptional?.(
										option.id,
										checked === true
									);
								}}
								className="shrink-0"
							/> */}
							<Button
								type="button"
								variant="ghost"
								size="icon"
								{...attributes}
								{...listeners}
								className="cursor-grab mr-3"
							>
								<GripVertical className="w-5 h-5 text-muted-foreground" />
							</Button>
							<div className="absolute -right-3 -top-4">
								<DropdownMenu modal={false}>
									<DropdownMenuTrigger asChild>
										<Button
											type="button"
											variant="ghost"
											size="icon"
											className="hover:!bg-transparent !text-muted-foreground"
										>
											<MoreHorizontal />
										</Button>
									</DropdownMenuTrigger>
									<DropdownMenuContent align="end">
										<DropdownMenuItem
											onClick={() => {
												onRemove?.(option.id);
											}}
										>
											{t("general.options.remove")}
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</>
					) : (
						<Button
							type="button"
							variant="ghost"
							size="icon"
							className="cursor-grab mr-3"
						>
							<GripVertical className="w-5 h-5 text-muted-foreground" />
						</Button>
					)}
				</div>
			</CardContent>
		</Card>
	);
};

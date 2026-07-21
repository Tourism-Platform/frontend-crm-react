import { EllipsisIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import {
	Button,
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger
} from "@/shared/ui";

import {
	ENUM_EVENT,
	type IEventLibraryItem,
	mapEventTypeToLibraryPathSegment
} from "@/entities/tour";

import { DeleteEventTemplate } from "@/features/library";

interface IEventTemplatesActionsProps {
	item?: IEventLibraryItem;
}

export const EventTemplatesActions: FC<IEventTemplatesActionsProps> = ({
	item
}) => {
	const { t } = useTranslation("event_templates_page");
	const navigate = useNavigate();

	if (!item) return null;

	const handleEdit = () => {
		const segment = mapEventTypeToLibraryPathSegment(item.eventType);
		if (item.eventType === ENUM_EVENT.TRANSPORTATION && segment) {
			navigate(
				buildRoute(ENUM_PATH.LIBRARY.EVENT_TRANSFER, {
					libraryId: item.id
				})
			);
			return;
		}
		toast.info(t("menu.edit.unavailable"));
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<div className="flex justify-end">
					<Button
						size="icon"
						variant="ghost"
						className="shadow-none"
						aria-label="Actions"
					>
						<EllipsisIcon size={16} aria-hidden="true" />
					</Button>
				</div>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={handleEdit}>
					{t("menu.edit.button")}
				</DropdownMenuItem>
				<DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
					<DeleteEventTemplate
						trigger={
							<div className="w-full h-full cursor-pointer text-destructive focus:text-destructive hover:bg-accent px-2 py-1.5 text-sm">
								{t("menu.delete.button")}
							</div>
						}
						className="w-full justify-start px-2 py-1.5"
						id={item.id}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

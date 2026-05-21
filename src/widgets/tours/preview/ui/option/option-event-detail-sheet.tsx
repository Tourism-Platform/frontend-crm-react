import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle
} from "@/shared/ui/shadcn-ui/sheet";

interface IOptionEventDetailSheetProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	title: string;
	image: string;
	description: string;
}

export const OptionEventDetailSheet: FC<IOptionEventDetailSheetProps> = ({
	open,
	onOpenChange,
	title,
	image,
	description
}) => {
	const { t } = useTranslation("preview_option_page");

	return (
		<Sheet open={open} onOpenChange={onOpenChange}>
			<SheetContent
				side="right"
				className="w-full sm:max-w-[540px] overflow-y-auto"
			>
				<SheetHeader>
					<SheetTitle className="text-xl">{title}</SheetTitle>
					<SheetDescription className="sr-only">
						{title}
					</SheetDescription>
				</SheetHeader>

				<div className="flex flex-col gap-6 px-4 pb-6">
					<img
						src={image}
						alt={title}
						className="w-full h-[280px] object-cover rounded-lg"
					/>

					<div>
						<h4 className="font-semibold mb-3">
							{t("sections.option.details")}
						</h4>
						<p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
							{description}
						</p>
					</div>
				</div>
			</SheetContent>
		</Sheet>
	);
};

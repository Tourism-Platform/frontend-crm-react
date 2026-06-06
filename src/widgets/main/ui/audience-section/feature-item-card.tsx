import type { LucideIcon } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Badge } from "@/shared/ui";

interface IFeatureItemCardProps {
	icon: LucideIcon;
	name: string;
	desc: string;
	isSoon?: boolean;
	iconClassName?: string;
}

export const FeatureItemCard: FC<IFeatureItemCardProps> = ({
	icon: Icon,
	name,
	desc,
	isSoon,
	iconClassName
}) => {
	const { t } = useTranslation("main");

	return (
		<div className={cn("flex gap-3", isSoon && "opacity-60")}>
			<div
				className={cn(
					"flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground",
					isSoon && "bg-muted/50 text-muted-foreground",
					iconClassName
				)}
			>
				<Icon className="size-4" />
			</div>
			<div>
				<div className="flex flex-wrap items-center gap-2">
					<p
						className={cn(
							"text-sm font-semibold",
							isSoon && "text-muted-foreground"
						)}
					>
						{name}
					</p>
					{isSoon ? (
						<Badge
							variant="secondary"
							className="h-5 border-none px-1.5 py-0 text-[10px] font-medium"
						>
							{t("coming_soon")}
						</Badge>
					) : null}
				</div>
				<p className="text-sm text-muted-foreground">{desc}</p>
			</div>
		</div>
	);
};

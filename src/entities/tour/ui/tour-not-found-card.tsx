import { FileSearch } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

export const TourNotFoundCard: FC = () => {
	const { t } = useTranslation("tours_page");

	return (
		<div className="flex flex-col items-center gap-4 text-center">
			<div className="p-6 rounded-full bg-muted">
				<FileSearch className="h-12 w-12 text-primary" />
			</div>
			<h1 className="text-2xl font-bold tracking-tight">
				{t("not_found.title")}
			</h1>
			<p className="text-muted-foreground max-w-[600px]">
				{t("not_found.description")}
			</p>
		</div>
	);
};

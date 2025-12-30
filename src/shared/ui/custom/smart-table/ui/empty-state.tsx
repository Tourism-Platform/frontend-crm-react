import { PackageOpenIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

export function EmptyState() {
	const { t } = useTranslation("common");

	return (
		<div className="flex flex-col items-center justify-center h-[260px] text-center p-8">
			<div className="flex items-center justify-center w-12 h-12 rounded-full mb-4">
				<PackageOpenIcon className="w-10 h-10 text-muted-foreground" />
			</div>
			<h3 className="text-lg font-semibold text-foreground mb-1">
				{t("table.empty_state.title")}
			</h3>
			<p className="text-sm text-muted-foreground max-w-[300px]">
				{t("table.empty_state.description")}
			</p>
		</div>
	);
}

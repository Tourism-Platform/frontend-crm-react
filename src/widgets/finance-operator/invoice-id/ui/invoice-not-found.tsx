import { ChevronLeft, FileSearch } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { Button } from "@/shared/ui";

export const InvoiceNotFound: FC = () => {
	const { t } = useTranslation("invoice_id_page");

	return (
		<div className="flex flex-col gap-6 font-poppins h-[60vh] items-center justify-center">
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

			<Button variant="ghost" size="sm" asChild className="text-primary">
				<Link to={ENUM_PATH.FINANCE.INVOICES}>
					<ChevronLeft className="mr-2 h-4 w-4" />
					{t("buttons.back")}
				</Link>
			</Button>
		</div>
	);
};

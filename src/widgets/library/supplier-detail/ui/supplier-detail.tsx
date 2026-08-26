import { ChevronLeft } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { Button, withErrorBoundary } from "@/shared/ui";

import { SupplierForm } from "./supplier-form";
import { SupplierProducts } from "./supplier-products";

interface ISupplierDetailProps {
	supplierId: string;
}

const SupplierDetailBase: FC<ISupplierDetailProps> = ({ supplierId }) => {
	const { t } = useTranslation("supplier_id_page");

	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<Button variant="ghost" className="w-fit px-0" asChild>
					<Link to={ENUM_PATH.LIBRARY.SUPPLIERS}>
						<ChevronLeft className="mr-1 h-4 w-4" />
						{t("back")}
					</Link>
				</Button>
				<h1 className="text-3xl">{t("page_name")}</h1>
			</div>

			<SupplierForm supplierId={supplierId} />
			<SupplierProducts supplierId={supplierId} />
		</section>
	);
};

export const SupplierDetail = withErrorBoundary(SupplierDetailBase);

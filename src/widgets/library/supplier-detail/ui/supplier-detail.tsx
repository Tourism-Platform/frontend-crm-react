import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { useOptionalResourceQuery } from "@/shared/hooks";
import { useSetBreadcrumbLabels, withErrorBoundary } from "@/shared/ui";

import { useGetSupplierQuery } from "@/entities/supplier";

import { SupplierForm } from "./supplier-form";
import { SupplierProducts } from "./supplier-products";

interface ISupplierDetailProps {
	supplierId: string;
}

const SupplierDetailBase: FC<ISupplierDetailProps> = ({ supplierId }) => {
	const { t } = useTranslation("supplier_id_page");
	const { data: supplier } = useOptionalResourceQuery(
		useGetSupplierQuery({ supplierId }, { skip: !supplierId })
	);

	useSetBreadcrumbLabels([supplier?.brandName]);

	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl">{t("page_name")}</h1>
			</div>

			<SupplierForm supplierId={supplierId} />
			<SupplierProducts supplierId={supplierId} />
		</section>
	);
};

export const SupplierDetail = withErrorBoundary(SupplierDetailBase);

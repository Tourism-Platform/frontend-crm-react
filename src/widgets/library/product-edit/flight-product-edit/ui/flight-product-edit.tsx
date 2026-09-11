import { Trash2 } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import {
	Button,
	Card,
	CardContent,
	CustomQueryTabs,
	useSetBreadcrumbLabels,
	withErrorBoundary
} from "@/shared/ui";

import { useGetSupplierQuery } from "@/entities/supplier";

import { DeleteSupplierProduct } from "@/features/library";

import {
	FLIGHT_PRODUCT_EDIT_TABS_LIST,
	type IFlightProductEditProps
} from "../model";

const FlightProductEditBase: FC<IFlightProductEditProps> = ({
	supplierId,
	productId,
	isCreate,
	product
}) => {
	const { t } = useTranslation("flight_product_edit_page");
	const navigate = useNavigate();
	const variants = product?.variants ?? [];

	const { data: supplier } = useOptionalResourceQuery(
		useGetSupplierQuery({ supplierId }, { skip: !supplierId })
	);

	useSetBreadcrumbLabels([
		supplier?.brandName,
		product?.name || (isCreate ? t("page_name") : undefined)
	]);

	const supplierPath = buildRoute(ENUM_PATH.LIBRARY.SUPPLIER, {
		supplierId
	});

	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex flex-col gap-2">
					<h1 className="text-2xl font-semibold">
						{product?.name || t("page_name")}
					</h1>
				</div>
				{!isCreate ? (
					<DeleteSupplierProduct
						supplierId={supplierId}
						productId={productId}
						ns="flight_product_edit_page"
						onSuccess={() => navigate(supplierPath)}
						trigger={
							<Button variant="destructive">
								<Trash2 className="mr-2 h-4 w-4" />
								{t("menu.delete.button")}
							</Button>
						}
					/>
				) : null}
			</div>

			<Card>
				<CardContent>
					<CustomQueryTabs
						ns="flight_product_edit_page"
						tabs={FLIGHT_PRODUCT_EDIT_TABS_LIST}
						slotContext={{
							supplierId,
							productId,
							isCreate,
							product,
							variants
						}}
					/>
				</CardContent>
			</Card>
		</section>
	);
};

export const FlightProductEdit = withErrorBoundary(FlightProductEditBase);

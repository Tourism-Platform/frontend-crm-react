import { ChevronLeft, Trash2 } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import {
	Button,
	Card,
	CardContent,
	CustomQueryTabs,
	withErrorBoundary
} from "@/shared/ui";

import { DeleteSupplierProduct } from "@/features/library";

import {
	HOTEL_PRODUCT_EDIT_TABS_LIST,
	type IHotelProductEditProps
} from "../model";

const HotelProductEditBase: FC<IHotelProductEditProps> = ({
	supplierId,
	productId,
	isCreate,
	product
}) => {
	const { t } = useTranslation("hotel_product_edit_page");
	const navigate = useNavigate();
	const variants = product?.variants ?? [];

	const resolvedName = product?.name ?? "";

	const supplierPath = buildRoute(ENUM_PATH.LIBRARY.SUPPLIER, {
		supplierId
	});

	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex flex-col gap-2">
					<Button variant="ghost" className="w-fit px-0" asChild>
						<Link to={supplierPath}>
							<ChevronLeft className="mr-1 h-4 w-4" />
							{t("back")}
						</Link>
					</Button>
					<h1 className="text-2xl font-semibold">
						{resolvedName || t("page_name")}
					</h1>
				</div>
				{!isCreate ? (
					<DeleteSupplierProduct
						supplierId={supplierId}
						productId={productId}
						ns="hotel_product_edit_page"
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
						ns="hotel_product_edit_page"
						tabs={HOTEL_PRODUCT_EDIT_TABS_LIST}
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

export const HotelProductEdit = withErrorBoundary(HotelProductEditBase);

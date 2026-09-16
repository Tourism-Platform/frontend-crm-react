import { Trash2 } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import {
	Button,
	Card,
	CardContent,
	CustomQueryTabs,
	Form,
	useSetBreadcrumbLabels,
	withErrorBoundary
} from "@/shared/ui";

import {
	type TTrainProductEditSchema,
	useGetSupplierQuery
} from "@/entities/supplier";

import { DeleteSupplierProduct } from "@/features/library";

import {
	type ENUM_FORM_SECTION_TYPE,
	type ITrainProductEditSlotContext,
	TRAIN_PRODUCT_EDIT_TABS_LIST
} from "../model";

export interface ITrainProductEditProps extends ITrainProductEditSlotContext {
	form: UseFormReturn<TTrainProductEditSchema>;
	createSectionSubmit: (section?: ENUM_FORM_SECTION_TYPE) => Promise<void>;
	isLoading: boolean;
	tabs?: typeof TRAIN_PRODUCT_EDIT_TABS_LIST;
}

const TrainProductEditBase: FC<ITrainProductEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = TRAIN_PRODUCT_EDIT_TABS_LIST,
	supplierId,
	productId,
	isCreate,
	product
}) => {
	const { t } = useTranslation("train_product_edit_page");
	const navigate = useNavigate();

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
		<Form {...form}>
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
							ns="train_product_edit_page"
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
							ns="train_product_edit_page"
							tabs={tabs}
							form={form}
							createSectionSubmit={createSectionSubmit}
							isLoading={isLoading}
							slotContext={{
								supplierId,
								productId,
								isCreate,
								product
							}}
						/>
					</CardContent>
				</Card>
			</section>
		</Form>
	);
};

export const TrainProductEdit = withErrorBoundary(TrainProductEditBase);

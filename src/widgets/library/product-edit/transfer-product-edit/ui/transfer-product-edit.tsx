import { TrashBinTrashIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { useOptionalResourceQuery } from "@/shared/hooks";
import {
	Card,
	CardContent,
	CustomPageHeader,
	CustomQueryTabs,
	Form,
	LoaderButton,
	useSetBreadcrumbLabels,
	withErrorBoundary
} from "@/shared/ui";

import {
	type TTransferProductEditSchema,
	useGetSupplierQuery
} from "@/entities/supplier";

import { DeleteSupplierProduct } from "@/features/library";

import {
	type ENUM_FORM_SECTION_TYPE,
	type ITransferProductEditSlotContext,
	TRANSFER_PRODUCT_EDIT_TABS_LIST
} from "../model";

export interface ITransferProductEditProps
	extends ITransferProductEditSlotContext {
	form: UseFormReturn<TTransferProductEditSchema>;
	createSectionSubmit: (section?: ENUM_FORM_SECTION_TYPE) => Promise<void>;
	isLoading: boolean;
	tabs?: typeof TRANSFER_PRODUCT_EDIT_TABS_LIST;
}

const TransferProductEditBase: FC<ITransferProductEditProps> = ({
	form,
	createSectionSubmit,
	isLoading,
	tabs = TRANSFER_PRODUCT_EDIT_TABS_LIST,
	supplierId,
	productId,
	isCreate,
	product
}) => {
	const { t } = useTranslation("transfer_product_edit_page");
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
			<section className="flex flex-1 flex-col gap-5">
				<CustomPageHeader
					title={product?.name || t("page_name")}
					actions={
						!isCreate ? (
							<DeleteSupplierProduct
								supplierId={supplierId}
								productId={productId}
								ns="transfer_product_edit_page"
								onSuccess={() => navigate(supplierPath)}
								trigger={
									<LoaderButton
										variant="destructive_outline"
										icon={<TrashBinTrashIcon />}
										label={t("menu.delete.button")}
									/>
								}
							/>
						) : null
					}
				/>
				<Card variant="glass">
					<CardContent>
						<CustomQueryTabs
							ns="transfer_product_edit_page"
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

export const TransferProductEdit = withErrorBoundary(TransferProductEditBase);

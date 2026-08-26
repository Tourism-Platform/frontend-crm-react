import { ChevronLeft, Trash2 } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";

import { ENUM_PATH, buildRoute } from "@/shared/config";
import { useQueryTab } from "@/shared/hooks";
import {
	Button,
	Card,
	CardContent,
	CustomOptionTabs,
	CustomOptionTabsContent,
	CustomOptionTabsList,
	CustomOptionTabsTrigger,
	Separator,
	withErrorBoundary
} from "@/shared/ui";

import { DeleteSupplierProduct } from "@/features/library";

import {
	ENUM_TRAIN_PRODUCT_EDIT_TAB,
	type ITrainProductEditProps,
	TRAIN_PRODUCT_EDIT_TABS
} from "../model";

import { TrainProductGeneral } from "./general";
import { TrainProductImages } from "./images";
import { TrainProductVariants } from "./variants";

const TrainProductEditBase: FC<ITrainProductEditProps> = ({
	supplierId,
	productId,
	isCreate,
	product
}) => {
	const { t } = useTranslation("train_product_edit_page");
	const navigate = useNavigate();
	const tabs = TRAIN_PRODUCT_EDIT_TABS;
	const allowedTabs = tabs.map((item) => item.type);
	const [initialTab, setTab] = useQueryTab(allowedTabs[0], allowedTabs);

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
					<CustomOptionTabs
						defaultValue={initialTab}
						onValueChange={setTab}
					>
						<CustomOptionTabsList
							style={{
								gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`
							}}
						>
							{tabs.map((item) => (
								<CustomOptionTabsTrigger
									key={item.type}
									value={item.type}
									variant="tongue"
								>
									{t(item.label)}
								</CustomOptionTabsTrigger>
							))}
						</CustomOptionTabsList>
						<Separator className="mb-6" />

						<CustomOptionTabsContent
							value={ENUM_TRAIN_PRODUCT_EDIT_TAB.GENERAL}
						>
							<TrainProductGeneral
								supplierId={supplierId}
								productId={productId}
								isCreate={isCreate}
								product={product}
							/>
						</CustomOptionTabsContent>

						<CustomOptionTabsContent
							value={ENUM_TRAIN_PRODUCT_EDIT_TAB.VARIANTS}
						>
							<TrainProductVariants
								supplierId={supplierId}
								productId={productId}
								variants={product?.variants}
							/>
						</CustomOptionTabsContent>

						<CustomOptionTabsContent
							value={ENUM_TRAIN_PRODUCT_EDIT_TAB.IMAGES}
						>
							<TrainProductImages
								supplierId={supplierId}
								productId={productId}
								disabled={isCreate}
							/>
						</CustomOptionTabsContent>
					</CustomOptionTabs>
				</CardContent>
			</Card>
		</section>
	);
};

export const TrainProductEdit = withErrorBoundary(TrainProductEditBase);

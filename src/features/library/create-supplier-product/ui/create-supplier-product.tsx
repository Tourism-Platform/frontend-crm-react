import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { buildRoute } from "@/shared/config";
import {
	Button,
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	Separator
} from "@/shared/ui";

import { LIBRARY_SUPPLIER_PRODUCT_CREATE_ID } from "@/entities/supplier";

import { CreateEventTemplateTypeCard } from "@/features/library/create-event-template";

import { CREATE_SUPPLIER_PRODUCT_OPTIONS } from "../model";

interface ICreateSupplierProductProps {
	supplierId: string;
}

export const CreateSupplierProduct: FC<ICreateSupplierProductProps> = ({
	supplierId
}) => {
	const { t } = useTranslation("supplier_id_page");

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>{t("products.new_product.button")}</Button>
			</DialogTrigger>
			<DialogContent className="min-w-[680px]">
				<DialogHeader>
					<DialogTitle>{t("products.create.title")}</DialogTitle>
					<DialogDescription>
						{t("products.create.subtitle")}
					</DialogDescription>
				</DialogHeader>
				<Separator />
				<div className="grid grid-cols-2 auto-rows-fr gap-3 py-2">
					{CREATE_SUPPLIER_PRODUCT_OPTIONS.map((option) => (
						<Link
							key={option.type}
							to={buildRoute(option.path, {
								supplierId,
								productId: LIBRARY_SUPPLIER_PRODUCT_CREATE_ID
							})}
							className="flex h-full no-underline text-inherit"
						>
							<CreateEventTemplateTypeCard
								title={t(option.title)}
								description={t(option.description)}
								icon={option.icon}
								iconBgClassName={option.iconBgClassName}
								className="w-full"
							/>
						</Link>
					))}
				</div>
			</DialogContent>
		</Dialog>
	);
};

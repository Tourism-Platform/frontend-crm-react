import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Avatar, AvatarFallback, AvatarImage, Badge } from "@/shared/ui";

import {
	SUPPLIER_TYPE_BADGE,
	getSupplierProductPricingLabelKey
} from "../constants";
import type { TSupplierProductSelectOption } from "../types";

type TSupplierProductOptionCardProps = {
	option: TSupplierProductSelectOption;
};

const getInitials = (name: string): string => {
	const trimmed = name.trim();
	if (!trimmed) {
		return "?";
	}
	return trimmed.slice(0, 1).toUpperCase();
};

export const SupplierProductOptionCard: FC<TSupplierProductOptionCardProps> = ({
	option
}) => {
	const { t } = useTranslation(["common_events", "options"]);
	const pricingKey = getSupplierProductPricingLabelKey(option);
	const { variant, label } = SUPPLIER_TYPE_BADGE[option.typ];

	return (
		<div className="flex items-start gap-2.5 text-left">
			<Avatar className="size-8">
				{option.primaryImagePath ? (
					<AvatarImage
						src={option.primaryImagePath}
						alt={option.name}
					/>
				) : null}
				<AvatarFallback>{getInitials(option.name)}</AvatarFallback>
			</Avatar>
			<div className="min-w-0 flex flex-col gap-1">
				<p className="truncate text-sm leading-tight">
					<span className="text-muted-foreground">
						{t(
							"attach_product.dialog.fields.product.option.product"
						)}
						:{" "}
					</span>
					<span className="font-medium text-foreground">
						{option.name}
					</span>
				</p>
				<p className="truncate text-xs leading-tight text-muted-foreground">
					<span>
						{t(
							"attach_product.dialog.fields.product.option.supplier"
						)}
						:{" "}
					</span>
					<span className="text-foreground">
						{option.supplierName ?? "—"}
					</span>
				</p>
				<p className="truncate text-xs leading-tight text-muted-foreground">
					{t("attach_product.dialog.meta.variants", {
						count: option.variants.length
					})}
					{pricingKey ? (
						<>
							{" · "}
							<span>
								{t(
									"attach_product.dialog.fields.product.option.pricing"
								)}
								:{" "}
							</span>
							<span className="text-foreground">
								{t(pricingKey, { ns: "options" })}
							</span>
						</>
					) : null}
				</p>
				<div className="flex flex-wrap gap-1 pt-0.5">
					<Badge variant={variant} size="sm">
						{t(label, { ns: "options" })}
					</Badge>
				</div>
			</div>
		</div>
	);
};

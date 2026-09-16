import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Avatar, AvatarFallback, AvatarImage, Badge } from "@/shared/ui";

import { SUPPLIER_TYPE_BADGE } from "../constants";
import type { TSupplierSelectOption } from "../types";

type TSupplierOptionCardProps = {
	option: TSupplierSelectOption;
};

const getInitials = (name: string): string => {
	const trimmed = name.trim();
	if (!trimmed) {
		return "?";
	}
	return trimmed.slice(0, 1).toUpperCase();
};

export const SupplierOptionCard: FC<TSupplierOptionCardProps> = ({
	option
}) => {
	const { t } = useTranslation(["common_events", "options"]);

	return (
		<div className="flex items-start gap-2.5 text-left">
			<Avatar className="size-8">
				{option.logoPath ? (
					<AvatarImage src={option.logoPath} alt={option.brandName} />
				) : null}
				<AvatarFallback>{getInitials(option.brandName)}</AvatarFallback>
			</Avatar>
			<div className="min-w-0 flex flex-col gap-1">
				<p className="truncate text-sm leading-tight">
					<span className="text-muted-foreground">
						{t(
							"pool.attach_supplier.dialog.fields.supplier.option.brand"
						)}
						:{" "}
					</span>
					<span className="font-medium text-foreground">
						{option.brandName}
					</span>
				</p>
				{option.legalName ? (
					<p className="truncate text-xs leading-tight text-muted-foreground">
						<span>
							{t(
								"pool.attach_supplier.dialog.fields.supplier.option.legal"
							)}
							:{" "}
						</span>
						<span className="text-foreground">
							{option.legalName}
						</span>
					</p>
				) : null}
				{option.phone || option.website ? (
					<p className="truncate text-xs leading-tight text-muted-foreground">
						{[option.phone, option.website]
							.filter(Boolean)
							.join(" · ")}
					</p>
				) : null}
				{option.supplierTypes.length > 0 ? (
					<div className="flex flex-wrap gap-1 pt-0.5">
						{option.supplierTypes.map((typ) => {
							const { variant, label } = SUPPLIER_TYPE_BADGE[typ];
							return (
								<Badge key={typ} variant={variant} size="sm">
									{t(label, { ns: "options" })}
								</Badge>
							);
						})}
					</div>
				) : null}
			</div>
		</div>
	);
};

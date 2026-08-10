import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui";

import type { TAgencySelectOption } from "../types";

type TAgencyOptionCardProps = {
	option: TAgencySelectOption;
};

const getInitials = (name: string): string => {
	const trimmed = name.trim();
	if (!trimmed) {
		return "?";
	}
	return trimmed.slice(0, 1).toUpperCase();
};

export const AgencyOptionCard: FC<TAgencyOptionCardProps> = ({ option }) => {
	const { t } = useTranslation("tours_page");

	const contactLine = [option.contactEmail, option.contactPhone]
		.filter(Boolean)
		.join(" · ");

	return (
		<div className="flex items-start gap-2.5 text-left">
			<Avatar className="size-8">
				{option.logoUrl ? (
					<AvatarImage src={option.logoUrl} alt={option.name} />
				) : null}
				<AvatarFallback>{getInitials(option.name)}</AvatarFallback>
			</Avatar>
			<div className="min-w-0 flex flex-col gap-0.5">
				<p className="truncate text-sm leading-tight">
					<span className="text-muted-foreground">
						{t("create.form.fields.agencyId.option.agent")}:{" "}
					</span>
					<span className="font-medium text-foreground">
						{option.name}
					</span>
				</p>
				{option.contactPerson ? (
					<p className="truncate text-xs leading-tight text-muted-foreground">
						{t("create.form.fields.agencyId.option.contactPerson")}:{" "}
						{option.contactPerson}
					</p>
				) : null}
				{contactLine ? (
					<p className="truncate text-xs leading-tight text-muted-foreground">
						{contactLine}
					</p>
				) : null}
			</div>
		</div>
	);
};

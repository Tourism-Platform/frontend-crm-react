import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { CustomField, withErrorBoundary } from "@/shared/ui";

import type { TLandingSchema } from "@/entities/tour";

import { OVERVIEW_INFO_LIST } from "../model";

interface IOverviewInfoProps {
	form: UseFormReturn<TLandingSchema>;
}

const OverviewInfoBase: FC<IOverviewInfoProps> = ({ form }) => {
	const { t } = useTranslation("landing_page");
	const { control } = form;

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-lg">{t("form.overview.title")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("form.overview.description")}
			</p>
			{OVERVIEW_INFO_LIST.map(({ key, ...item }) => (
				<CustomField
					key={key}
					control={control}
					name={key}
					t={t}
					{...item}
				/>
			))}
		</div>
	);
};

export const OverviewInfo = withErrorBoundary(OverviewInfoBase);

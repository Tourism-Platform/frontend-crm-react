import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import { type TGuideEditSchema } from "@/entities/tour";

import { GuidesCard } from "./guides-card";

interface IGuidesDetailsProps {
	form: UseFormReturn<TGuideEditSchema>;
}

const GuidesDetailsBase: FC<IGuidesDetailsProps> = ({ form }) => {
	const { t } = useTranslation("guide_edit_page");

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("form.guides.details.title")}</h2>

			<div className="grid gap-4">
				<GuidesCard form={form} index={0} />
			</div>
		</div>
	);
};

export const GuidesDetails = withErrorBoundary(GuidesDetailsBase);

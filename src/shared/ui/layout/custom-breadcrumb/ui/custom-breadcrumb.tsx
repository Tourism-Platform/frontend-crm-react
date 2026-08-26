import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { resolveBreadcrumbTrail, useBreadcrumbLabels } from "../model";

import { BreadcrumbPills } from "./breadcrumb-pills";

export const CustomBreadcrumb: FC = () => {
	const { t } = useTranslation("sidebar");
	const { pathname } = useLocation();
	const dynamicLabels = useBreadcrumbLabels();
	const items = resolveBreadcrumbTrail(pathname);

	if (!items) return null;

	return (
		<div className="flex items-center gap-2 px-4">
			<BreadcrumbPills
				items={items.map((item) => ({
					key: item.key,
					label:
						item.labelKey != null
							? t(item.labelKey)
							: item.dynamicIndex != null
								? dynamicLabels[item.dynamicIndex] ||
									item.label ||
									"…"
								: item.label || "…",
					to: item.to,
					isCurrent: item.isCurrent
				}))}
			/>
		</div>
	);
};

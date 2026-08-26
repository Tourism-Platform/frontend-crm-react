import { matchPath } from "react-router-dom";

import { BREADCRUMB_TRAILS } from "./config";
import type { TResolvedBreadcrumbItem } from "./types";

export const resolveBreadcrumbTrail = (
	pathname: string
): TResolvedBreadcrumbItem[] | null => {
	for (const trail of BREADCRUMB_TRAILS) {
		const match = matchPath({ path: trail.pattern, end: true }, pathname);
		if (!match) continue;

		const params = match.params as Record<string, string | undefined>;
		let dynamicIndex = 0;
		const last = trail.crumbs.length - 1;

		return trail.crumbs.map((crumb, index) => {
			const isCurrent = index === last;

			if (crumb.type === "i18n") {
				return {
					key: `i18n-${index}`,
					labelKey: crumb.key,
					to: isCurrent ? undefined : crumb.to,
					isCurrent
				};
			}

			const i = dynamicIndex++;
			const fromParam = crumb.param ? params[crumb.param] : undefined;
			const supplierId = params.supplierId;
			const to =
				!isCurrent && crumb.toPattern && supplierId
					? crumb.toPattern.replace(":supplierId", supplierId)
					: undefined;

			return {
				key: `dyn-${i}`,
				label: fromParam,
				dynamicIndex: fromParam ? undefined : i,
				to,
				isCurrent
			};
		});
	}

	return null;
};

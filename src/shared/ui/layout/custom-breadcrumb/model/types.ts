import type { TSidebarKeys } from "@/shared/config";

export type TBreadcrumbCrumb =
	| { type: "i18n"; key: TSidebarKeys; to?: string }
	| {
			type: "dynamic";
			/** Build parent link from route params (e.g. supplier on product page) */
			toPattern?: string;
			/** Take label from URL param instead of context */
			param?: string;
	  };

export type TBreadcrumbTrail = {
	pattern: string;
	crumbs: TBreadcrumbCrumb[];
};

export type TResolvedBreadcrumbItem = {
	key: string;
	labelKey?: TSidebarKeys;
	label?: string;
	dynamicIndex?: number;
	to?: string;
	isCurrent: boolean;
};

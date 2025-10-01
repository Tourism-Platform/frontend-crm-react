import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator
} from "@/shared/ui";

import { BREADCRUMB_LIST } from "../model";

export const CustomBreadcrumb: FC = () => {
	const { t } = useTranslation("sidebar");
	const location = useLocation();
	const pathname = location?.pathname as keyof typeof BREADCRUMB_LIST;
	const base = ("/" + pathname.split("/")[1]) as keyof typeof BREADCRUMB_LIST;
	return (
		<div className="flex items-center gap-2 px-4">
			<Breadcrumb>
				<BreadcrumbList>
					<BreadcrumbItem className="hidden md:block">
						{t(BREADCRUMB_LIST[base])}
					</BreadcrumbItem>
					<BreadcrumbSeparator className="hidden md:block" />
					<BreadcrumbItem>
						<BreadcrumbPage>
							{t(BREADCRUMB_LIST[pathname])}
						</BreadcrumbPage>
					</BreadcrumbItem>
				</BreadcrumbList>
			</Breadcrumb>
		</div>
	);
};

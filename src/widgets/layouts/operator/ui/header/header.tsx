import { type FC } from "react";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import {
	LanguageToggle,
	NavMenu,
	NavMenuMobile,
	SidebarTrigger,
	ThemeToggle
} from "@/shared/ui";

import { OperatorUserMenu } from "@/features/layout";

import logo from "./../../../../../../public/assets/logo.svg";
import { NAV_ITEMS_LIST } from "./model";

interface IHeaderOperatorProps {
	/** Хедер внутри SidebarInset — вместо логотипа триггер сайдбара */
	withSidebarTrigger?: boolean;
}

export const HeaderOperator: FC<IHeaderOperatorProps> = ({
	withSidebarTrigger = false
}) => {
	return (
		<header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between gap-2 border-b bg-card">
			<div className="flex items-center gap-2 px-4">
				{withSidebarTrigger ? (
					<SidebarTrigger className="-ml-1" />
				) : (
					<Link
						to={ENUM_PATH.MAIN}
						className="text-primary hover:text-primary/90"
					>
						<img src={logo} className="w-12 h-12" alt="logo" />
					</Link>
				)}
				<NavMenuMobile navItems={NAV_ITEMS_LIST} />
				<NavMenu navItems={NAV_ITEMS_LIST} />
			</div>
			<div className="flex items-center gap-2 pr-4">
				<ThemeToggle />
				<LanguageToggle />
				<OperatorUserMenu />
			</div>
		</header>
	);
};

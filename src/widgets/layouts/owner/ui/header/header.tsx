import { type FC } from "react";

import { LanguageToggle, NavMenu, ThemeToggle } from "@/shared/ui";

import { UserMenu } from "@/features/layout";

import logo from "./../../../../../../public/assets/logo.png";
import { NAV_ITEMS_LIST } from "./model";

export const HeaderOwner: FC = () => {
	return (
		<header className="border-b px-4 md:px-4 sticky top-0 z-40 bg-card">
			<div className="flex h-16 items-center justify-between gap-4">
				{/* Left side */}
				<div className="flex items-center gap-2">
					{/* Mobile menu trigger */}
					{/* <NavMenuMobile navItems={NAV_ITEMS_LIST} /> */}
					{/* Main nav */}
					<div className="flex items-center gap-4">
						<a
							href="#"
							className="text-primary hover:text-primary/90"
						>
							<img src={logo} className="w-12 h-12" alt="logo" />
						</a>
						{/* Navigation menu */}
						<NavMenu navItems={NAV_ITEMS_LIST} />
					</div>
				</div>
				{/* Right side */}
				<div className="flex items-center gap-2">
					{/* Theme toggle */}
					<ThemeToggle />
					{/* Language selector */}
					<LanguageToggle />
					{/* User menu */}
					<UserMenu />
				</div>
			</div>
		</header>
	);
};

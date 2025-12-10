import { type FC } from "react";

import { LanguageToggle, Logo, NavMenu, ThemeToggle } from "@/shared/ui";

import { UserMenu } from "@/features/layout";

import { NAV_ITEMS_LIST } from "./model";

export const HeaderOwner: FC = () => {
	return (
		<header className="border-b px-4 md:px-6 sticky top-0 z-40 bg-background">
			<div className="flex h-16 items-center justify-between gap-4">
				{/* Left side */}
				<div className="flex items-center gap-2">
					{/* Mobile menu trigger */}
					{/* <NavMenuMobile navItems={NAV_ITEMS_LIST} /> */}
					{/* Main nav */}
					<div className="flex items-center gap-6">
						<a
							href="#"
							className="text-primary hover:text-primary/90"
						>
							<Logo />
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

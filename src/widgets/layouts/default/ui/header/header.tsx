import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { useAppSelector } from "@/shared/hooks";
import { Button, LanguageToggle, NavMenu, ThemeToggle } from "@/shared/ui";

import logo from "./../../../../../../public/assets/logo.png";
import { NAV_ITEMS_LIST } from "./model";

export const HeaderDefault: FC = () => {
	const { t } = useTranslation("header");
	const { isAuth } = useAppSelector((state) => state.userSlice);
	const authPath = isAuth ? ENUM_PATH.TOURS.ROOT : ENUM_PATH.LOGIN;

	return (
		<header className="border-b px-4 md:px-4 sticky top-0 z-40 bg-card/75 shadow-black/6.5 backdrop-blur-xl">
			<div className="flex h-16 items-center justify-between gap-4 max-w-6xl mx-auto">
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-4">
						<Link
							to={ENUM_PATH.MAIN}
							className="text-primary hover:text-primary/90"
						>
							<img src={logo} className="w-12 h-12" alt="logo" />
						</Link>
						<NavMenu navItems={NAV_ITEMS_LIST} />
					</div>
				</div>
				<div className="grid grid-cols-[auto_auto_1fr] items-center gap-2">
					<ThemeToggle />
					<LanguageToggle />
					<div className="grid grid-cols-2 gap-2">
						<Button variant="outline" size="sm" asChild>
							<Link to={authPath}>{t("public.sign_in")}</Link>
						</Button>
						<Button size="sm" asChild>
							<Link to={authPath}>{t("public.get_started")}</Link>
						</Button>
					</div>
				</div>
			</div>
		</header>
	);
};

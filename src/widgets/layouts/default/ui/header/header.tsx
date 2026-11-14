import { Login3Icon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { useAppSelector } from "@/shared/hooks";
import { cn } from "@/shared/lib";
import {
	Button,
	GLASS_SURFACE,
	LanguageToggle,
	ThemeToggle
} from "@/shared/ui";

import logo from "./../../../../../../public/assets/logo.svg";
import { PUBLIC_NAV_ITEMS } from "./model";
import { PublicNavMenu } from "./ui/public-nav-menu";

export const HeaderDefault: FC = () => {
	const { t } = useTranslation("header");
	const { isAuth } = useAppSelector((state) => state.userSlice);
	const authPath = isAuth ? ENUM_PATH.TOURS.ROOT : ENUM_PATH.LOGIN;

	return (
		// Шапка-полоса: стекло без плавающей тени, линия снизу; под ней размывается прокручиваемое содержимое
		<header
			className={cn(
				GLASS_SURFACE,
				"sticky top-0 z-40 border-b px-4 bg-card/70 shadow-none dark:bg-card/85 dark:shadow-none"
			)}
		>
			<div className="flex h-16 items-center justify-between gap-4 max-w-6xl mx-auto">
				<div className="flex items-center gap-2">
					<div className="flex items-center gap-4">
						<Link
							to={ENUM_PATH.MAIN}
							className="text-primary hover:text-primary/90"
						>
							<img src={logo} className="w-12 h-12" alt="logo" />
						</Link>
						<PublicNavMenu items={PUBLIC_NAV_ITEMS} />
					</div>
				</div>
				<div className="flex items-center gap-2">
					<ThemeToggle />
					<LanguageToggle />
					<Button size="sm" asChild>
						<Link to={authPath}>
							<Login3Icon />
							{t("public.sign_in")}
						</Link>
					</Button>
				</div>
			</div>
		</header>
	);
};

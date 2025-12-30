import { Compass, MoveLeft } from "lucide-react";
import type { FC } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import { Button } from "@/shared/ui/shadcn-ui";

export const NotFound: FC = () => {
	const { t } = useTranslation("not_found_page");
	const navigate = useNavigate();

	const handleGoHome = () => {
		navigate(ENUM_PATH.MAIN);
	};

	const handleGoBack = () => {
		navigate(-1);
	};

	return (
		<div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
			<div className="relative mb-8">
				<div className="absolute -inset-4 animate-pulse rounded-full bg-primary/10 blur-3xl" />
				<div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-primary/20 bg-background/50 backdrop-blur-sm shadow-xl">
					<Compass className="h-16 w-16 animate-[spin_10s_linear_infinite] text-primary" />
				</div>
				<div className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
					<span className="font-mono text-xs font-bold">404</span>
				</div>
			</div>

			<h1 className="mb-2 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-8xl font-black tracking-tighter text-transparent sm:text-9xl">
				{t("title")}
			</h1>

			<h2 className="mb-4 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
				{t("subtitle")}
			</h2>

			<p className="mb-10 max-w-md text-muted-foreground">
				{t("description")}
			</p>

			<div className="flex flex-col gap-4 sm:flex-row">
				<Button onClick={handleGoHome} size="lg">
					{t("buttons.home")}
				</Button>
				<Button variant="outline" size="lg" onClick={handleGoBack}>
					<MoveLeft className="mr-2 h-4 w-4" />
					{t("buttons.back")}
				</Button>
			</div>
		</div>
	);
};

import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui";

import { useGoogleLogin } from "../model";

import { GoogleIcon } from "./google-icon";

export const GoogleLoginButton: FC = () => {
	const { t } = useTranslation("login_page");
	const { handleGoogleLogin } = useGoogleLogin();

	return (
		<Button
			variant="outline"
			type="button"
			className="h-11 w-full gap-3 bg-background text-base font-medium shadow-sm transition-colors hover:bg-muted/50"
			onClick={handleGoogleLogin}
		>
			<GoogleIcon className="size-5 shrink-0" />
			{t("form.buttons.google")}
		</Button>
	);
};

import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Skeleton } from "@/shared/ui";

interface IEmailAddressProps {
	email?: string;
	isLoading?: boolean;
}

export const EmailAddress: FC<IEmailAddressProps> = ({ email, isLoading }) => {
	const { t } = useTranslation("account_settings_page");
	return (
		<div className="flex gap-5 flex-col">
			<h2 className="text-xl">{t("form.email.title")}</h2>
			{isLoading ? (
				<Skeleton className="h-6 w-64" />
			) : (
				<p className="text-base">{email}</p>
			)}
		</div>
	);
};

import { Loader } from "lucide-react";
import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField, FieldSeparator } from "@/shared/ui";

import {
	ENUM_FORM_LOGIN,
	ENUM_LOGIN,
	FORM_LOGIN_LIST,
	type TLoginSchema
} from "../model";

interface ISignUpFormProps {
	form: UseFormReturn<TLoginSchema>;
	isLoading?: boolean;
}

export const SignUpForm: FC<ISignUpFormProps> = ({ form, isLoading }) => {
	const { t } = useTranslation("login_page");
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col items-center gap-1 text-center">
				<h1 className="text-2xl font-bold">
					{t("form.sign_up.title")}
				</h1>
				<p className="text-muted-foreground text-sm text-balance">
					{t("form.sign_up.description")}
				</p>
			</div>
			{FORM_LOGIN_LIST.map(({ key, ...item }) => (
				<CustomField
					key={key}
					control={form?.control}
					name={key}
					t={t}
					{...item}
				/>
			))}
			<Button
				type="submit"
				className="flex gap-2 items-center justify-center"
			>
				{isLoading && (
					<Loader className="size-4 animate-spin text-muted-foreground" />
				)}
				<p>{t("form.buttons.sign_up")}</p>
			</Button>
			<FieldSeparator>{t("form.sign_up.continue")}</FieldSeparator>
			<Button variant="outline" type="button">
				{t("form.buttons.google")}
			</Button>
			<div className="text-center">
				{t("form.sign_up.sign_in")}{" "}
				<span
					className="underline underline-offset-4 hover:text-primary cursor-pointer"
					onClick={() => {
						form?.setValue(
							ENUM_FORM_LOGIN.LOGIN_TYPE,
							ENUM_LOGIN.SIGN_IN
						);
					}}
				>
					{t("form.buttons.sign_in")}
				</span>
			</div>
		</div>
	);
};

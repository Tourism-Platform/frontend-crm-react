import { type SerializedError } from "@reduxjs/toolkit";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";
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

interface ISignInFormProps {
	form: UseFormReturn<TLoginSchema>;
	isLoading?: boolean;
	error?: FetchBaseQueryError | SerializedError | unknown;
}

export const SignInForm: FC<ISignInFormProps> = ({
	form,
	isLoading,
	error
}) => {
	const { t } = useTranslation("login_page");
	return (
		<div className="flex flex-col gap-6">
			<div className="flex flex-col items-center gap-1 text-center">
				<h1 className="text-2xl font-bold">
					{t("form.sign_in.title")}
				</h1>
				<p className="text-muted-foreground text-sm text-balance">
					{t("form.sign_in.description")}
				</p>
			</div>
			<div className="grid gap-1">
				{FORM_LOGIN_LIST.map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form?.control}
						name={key}
						t={t}
						{...item}
						externalError={
							key === ENUM_FORM_LOGIN.PASSWORD &&
							error &&
							(error as FetchBaseQueryError).status === 401
								? "form.fields.password.errors.server_error"
								: undefined
						}
					/>
				))}
			</div>
			<Button
				type="submit"
				className="flex gap-2 items-center justify-center"
			>
				{isLoading && (
					<Loader className="size-4 animate-spin text-muted-foreground" />
				)}
				<p>{t("form.buttons.sign_in")}</p>
			</Button>
			<FieldSeparator>{t("form.sign_in.continue")}</FieldSeparator>
			<Button variant="outline" type="button">
				{t("form.buttons.google")}
			</Button>
			<div className="text-center">
				{t("form.sign_in.sign_up")}{" "}
				<span
					className="underline underline-offset-4 hover:text-primary cursor-pointer"
					onClick={() => {
						form?.setValue(
							ENUM_FORM_LOGIN.LOGIN_TYPE,
							ENUM_LOGIN.SIGN_UP
						);
					}}
				>
					{t("form.buttons.sign_up")}
				</span>
			</div>
		</div>
	);
};

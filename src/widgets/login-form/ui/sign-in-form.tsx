import { type SerializedError } from "@reduxjs/toolkit";
import { type FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	CustomField,
	LoaderButton,
	// FieldSeparator,
	withErrorBoundary
} from "@/shared/ui";

// import { GoogleLoginButton } from "@/features/auth";

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

const SignInFormBase: FC<ISignInFormProps> = ({ form, isLoading, error }) => {
	const { t } = useTranslation("login_page");

	return (
		<div className="flex flex-col gap-6">
			<div className="space-y-1 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">
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
			<LoaderButton
				className="flex  items-center justify-center"
				isLoading={isLoading}
				disabled={isLoading}
				label={t("form.buttons.sign_in")}
				loadingLabel={t("form.buttons.sign_in")}
			/>
			{/* <FieldSeparator>{t("form.sign_in.continue")}</FieldSeparator>
			<GoogleLoginButton /> */}
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

export const SignInForm = withErrorBoundary(SignInFormBase);

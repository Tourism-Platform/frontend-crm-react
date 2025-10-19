import { zodResolver } from "@hookform/resolvers/zod";
import { type FC } from "react";
import { useForm } from "react-hook-form";

import { Form } from "@/shared/ui";

import { useSignInAction, useSignUpAction } from "@/features/auth";

import {
	ENUM_FORM_LOGIN,
	ENUM_LOGIN,
	LOGIN_SCHEMA,
	type TLoginSchema
} from "../model";

import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

export const LoginForm: FC = () => {
	const { handleSignIn, isLoading: isLoadingSignIn } = useSignInAction();
	const { handleSignUp, isLoading: isLoadingSignUp } = useSignUpAction();

	const form = useForm<TLoginSchema>({
		resolver: zodResolver(LOGIN_SCHEMA),
		defaultValues: {
			email: "",
			password: "",
			login_type: ENUM_LOGIN.SIGN_IN
		},
		mode: "onSubmit"
	});

	async function onSubmit(data: TLoginSchema) {
		const { login_type, ...rest } = data;
		if (login_type === ENUM_LOGIN.SIGN_IN) {
			await handleSignIn(rest);
		} else {
			await handleSignUp(rest);
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				{form.watch(ENUM_FORM_LOGIN.LOGIN_TYPE) ===
				ENUM_LOGIN.SIGN_IN ? (
					<SignInForm form={form} isLoading={isLoadingSignIn} />
				) : (
					<SignUpForm form={form} isLoading={isLoadingSignUp} />
				)}
				<div
					onClick={() => {
						form?.setValue(
							ENUM_FORM_LOGIN.LOGIN_TYPE,
							ENUM_LOGIN.SIGN_IN
						);
					}}
				></div>
			</form>
		</Form>
	);
};

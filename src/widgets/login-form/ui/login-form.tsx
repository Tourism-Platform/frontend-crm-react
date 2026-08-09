import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { type FC } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { ENUM_PATH } from "@/shared/config";
import {
	Button,
	Card,
	CardContent,
	Form,
	LanguageToggle,
	ThemeToggle,
	withErrorBoundary
} from "@/shared/ui";

import { useSignInAction, useSignUpAction } from "@/features/auth";

import {
	ENUM_FORM_LOGIN,
	ENUM_LOGIN,
	LOGIN_SCHEMA,
	type TLoginSchema
} from "../model";

import { SignInForm } from "./sign-in-form";
import { SignUpForm } from "./sign-up-form";

const LoginFormBase: FC = () => {
	const { t } = useTranslation("login_page");
	const {
		handleSignIn,
		isLoading: isLoadingSignIn,
		error: signInError
	} = useSignInAction();
	const {
		handleSignUp,
		isLoading: isLoadingSignUp,
		error: signUpError
	} = useSignUpAction();

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
		<Card className="relative w-full max-w-md border-border/60 bg-card/80 shadow-xl backdrop-blur-sm">
			<Button
				variant="ghost"
				type="button"
				size="sm"
				className="absolute left-3 top-3 z-10 gap-2 text-muted-foreground hover:text-foreground"
				asChild
			>
				<Link to={ENUM_PATH.MAIN}>
					<ArrowLeft className="size-4" />
					{t("form.buttons.back_to_home")}
				</Link>
			</Button>

			<div className="absolute right-3 top-3 z-10 flex items-center gap-2">
				<ThemeToggle />
				<LanguageToggle />
			</div>

			<CardContent className="flex flex-col gap-6 p-6 pt-12 sm:p-8 sm:pt-14">
				<div className="flex flex-col items-center gap-4 text-center">
					<Link
						to={ENUM_PATH.MAIN}
						className="flex items-center gap-2"
					>
						<img
							src="/assets/logo.svg"
							alt="TourLink"
							className="h-10 w-auto"
						/>
						<span className="text-2xl font-semibold">
							<span className="text-foreground">Tour</span>
							<span className="text-[#37bffa]">Link</span>
						</span>
					</Link>
				</div>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						{form.watch(ENUM_FORM_LOGIN.LOGIN_TYPE) ===
						ENUM_LOGIN.SIGN_IN ? (
							<SignInForm
								form={form}
								isLoading={isLoadingSignIn}
								error={signInError}
							/>
						) : (
							<SignUpForm
								form={form}
								isLoading={isLoadingSignUp}
								error={signUpError}
							/>
						)}
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export const LoginForm = withErrorBoundary(LoginFormBase);

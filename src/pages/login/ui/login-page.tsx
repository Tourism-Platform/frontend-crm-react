import type { FC } from "react";

import { LoginForm, LoginSidePanel } from "@/widgets/login-form";

export const LoginPage: FC = () => {
	return (
		<div className="relative grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col justify-center px-4 py-10 sm:px-8 lg:px-12 xl:px-16">
				<div className="mx-auto w-full max-w-md">
					<LoginForm />
				</div>
			</div>

			<LoginSidePanel />
		</div>
	);
};

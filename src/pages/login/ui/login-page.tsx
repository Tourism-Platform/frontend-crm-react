import type { FC } from "react";

import { LoginForm } from "@/widgets/login-form";

export const LoginPage: FC = () => {
	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<LoginForm />
					</div>
				</div>
			</div>
			<div className="relative hidden lg:block overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-tr from-purple-700 via-blue-700 to-cyan-500">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_60%)] mix-blend-overlay" />
					<div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_95%,rgba(255,255,255,0.05)_100%),linear-gradient(0deg,transparent_95%,rgba(255,255,255,0.05)_100%)] bg-[length:40px_40px]" />
				</div>
			</div>
		</div>
	);
};

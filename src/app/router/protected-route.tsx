import { useTranslation } from "react-i18next";
import { Navigate } from "react-router-dom";

import { isUnauthorizedError } from "@/shared/api";
import {
	ENUM_AUTH,
	ENUM_LAYOUT,
	ENUM_PATH,
	type IRouting
} from "@/shared/config";
import {
	Alert,
	AlertContent,
	AlertDescription,
	AlertTitle,
	Button,
	SuspenseLoader
} from "@/shared/ui";

import { useGetAuthAccountQuery } from "@/entities/auth";
import { ENUM_ROLE } from "@/entities/user";

const SessionCheckError = ({ onRetry }: { onRetry: () => void }) => {
	const { t } = useTranslation("login_page");

	return (
		<div className="flex min-h-[50vh] items-center justify-center p-6">
			<Alert
				variant="destructive"
				appearance="outline"
				className="max-w-md"
			>
				<AlertContent>
					<AlertTitle>{t("session_check_error.title")}</AlertTitle>
					<AlertDescription>
						{t("session_check_error.description")}
					</AlertDescription>
				</AlertContent>
				<Button
					type="button"
					variant="outline"
					size="sm"
					onClick={onRetry}
				>
					{t("session_check_error.retry")}
				</Button>
			</Alert>
		</div>
	);
};

export const ProtectedRoute = ({ route }: { route: IRouting }) => {
	const isPrivateRoute = route.auth === ENUM_AUTH.PRIVATE;
	const isOnlyPublicRoute = route.auth === ENUM_AUTH.ONLY_PUBLIC;
	const shouldFetchAccount = isPrivateRoute || isOnlyPublicRoute;

	const {
		data: authAccount,
		error: authAccountError,
		isLoading: isAuthAccountLoading,
		isFetching: isAuthAccountFetching,
		isError: isAuthAccountError,
		refetch: refetchAuthAccount
	} = useGetAuthAccountQuery(undefined, { skip: !shouldFetchAccount });

	const isCheckingSession =
		shouldFetchAccount && (isAuthAccountLoading || isAuthAccountFetching);

	if (isPrivateRoute) {
		if (isCheckingSession && !isAuthAccountError) {
			return <SuspenseLoader />;
		}

		if (isAuthAccountError) {
			if (isUnauthorizedError(authAccountError)) {
				return <Navigate to={ENUM_PATH.LOGIN} replace />;
			}

			return (
				<SessionCheckError onRetry={() => void refetchAuthAccount()} />
			);
		}

		if (!authAccount) {
			return <SuspenseLoader />;
		}
	}

	if (isOnlyPublicRoute) {
		if (isCheckingSession && !isAuthAccountError && !authAccount) {
			return <SuspenseLoader />;
		}

		if (authAccount) {
			const isAgencyRole = authAccount.role === ENUM_ROLE.AGENCY;

			if (isAgencyRole) {
				return <Navigate to={ENUM_PATH.TOURS.CATALOG.ROOT} replace />;
			}

			return <Navigate to={ENUM_PATH.TOURS.ROOT} replace />;
		}
	}

	if (authAccount) {
		const isAgencyRole = authAccount.role === ENUM_ROLE.AGENCY;
		const isOperatorRole = authAccount.role === ENUM_ROLE.TOUR_OPERATOR;

		if (route.layout === ENUM_LAYOUT.ROOT_OPERATOR && isAgencyRole) {
			return <Navigate to={ENUM_PATH.TOURS.CATALOG.ROOT} replace />;
		}

		if (route.layout === ENUM_LAYOUT.ROOT_AGENCY && isOperatorRole) {
			return <Navigate to={ENUM_PATH.TOURS.ROOT} replace />;
		}
	}

	let Component = <route.component />;

	if (route.layout_cascade?.length) {
		Component = [...route.layout_cascade]
			.reverse()
			.reduce((acc, Layout) => <Layout>{acc}</Layout>, Component);
	}

	return Component;
};

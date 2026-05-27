import { Navigate } from "react-router-dom";

import {
	ENUM_AUTH,
	ENUM_LAYOUT,
	ENUM_PATH,
	type IRouting
} from "@/shared/config";
import { useAppSelector } from "@/shared/hooks";
import { SuspenseLoader } from "@/shared/ui";

import { useGetAuthAccountQuery } from "@/entities/auth";
import { ENUM_ROLE } from "@/entities/user";

export const ProtectedRoute = ({ route }: { route: IRouting }) => {
	const { isAuth } = useAppSelector((state) => state.userSlice);
	const { data: authAccount, isLoading: isAuthAccountLoading } =
		useGetAuthAccountQuery(undefined, { skip: !isAuth });

	if (route.auth === ENUM_AUTH.PRIVATE && !isAuth) {
		return <Navigate to={ENUM_PATH.LOGIN} replace />;
	}

	if (isAuth && isAuthAccountLoading) {
		return <SuspenseLoader />;
	}

	if (isAuth && authAccount) {
		const isAgencyRole = authAccount.role === ENUM_ROLE.AGENCY;
		const isOperatorRole = authAccount.role === ENUM_ROLE.TOUR_OPERATOR;

		if (route.auth === ENUM_AUTH.ONLY_PUBLIC) {
			if (isAgencyRole) {
				return <Navigate to={ENUM_PATH.TOURS.CATALOG.ROOT} replace />;
			}
			return <Navigate to={ENUM_PATH.TOURS.ROOT} replace />;
		}

		if (route.layout === ENUM_LAYOUT.ROOT_OPERATOR && isAgencyRole) {
			return <Navigate to={ENUM_PATH.TOURS.CATALOG.ROOT} replace />;
		}

		if (route.layout === ENUM_LAYOUT.ROOT_AGENCY && isOperatorRole) {
			return <Navigate to={ENUM_PATH.TOURS.ROOT} replace />;
		}
	} else if (
		route.auth === ENUM_AUTH.ONLY_PUBLIC &&
		isAuth &&
		!isAuthAccountLoading
	) {
		return <Navigate to={ENUM_PATH.TOURS.ROOT} replace />;
	}

	let Component = <route.component />;

	if (route.layout_cascade?.length) {
		Component = [...route.layout_cascade]
			.reverse()
			.reduce((acc, Layout) => <Layout>{acc}</Layout>, Component);
	}

	return Component;
};

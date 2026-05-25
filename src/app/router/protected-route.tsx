import { Navigate } from "react-router-dom";

import { ENUM_AUTH, ENUM_PATH, type IRouting } from "@/shared/config";
import { useAppSelector } from "@/shared/hooks";

export const ProtectedRoute = ({ route }: { route: IRouting }) => {
	const { isAuth } = useAppSelector((state) => state.userSlice);

	if (route.auth === ENUM_AUTH.PRIVATE && !isAuth) {
		return <Navigate to={ENUM_PATH.LOGIN} replace />;
	}

	if (route.auth === ENUM_AUTH.ONLY_PUBLIC && isAuth) {
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

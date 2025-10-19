import { Navigate } from "react-router-dom";

import { ENUM_AUTH, ENUM_PATH, type IRouting } from "@/shared/config";
import { useAppSelector } from "@/shared/hooks";

import { ContainerOwnerLayout, SideBarOwnerLayout } from "@/widgets/layouts";

// Компонент защиты маршрутов
export const ProtectedRoute = ({ route }: { route: IRouting }) => {
	// Оборачиваем в нужный layout
	const { isAuth } = useAppSelector((state) => state.userSlice);
	let Component = <route.component />;
	if (route.auth === ENUM_AUTH.PRIVATE && !isAuth) {
		return <Navigate to={ENUM_PATH.LOGIN} replace />;
	} else if (route.auth === ENUM_AUTH.ONLY_PUBLIC && isAuth) {
		return <Navigate to={ENUM_PATH.TOURS.ROOT} replace />;
	}

	if (route?.sidebarMenu?.length) {
		Component = (
			<SideBarOwnerLayout
				items={route?.sidebarMenu}
				useBreadcrumb={route.useMainBreadcrumb}
			>
				{Component}
			</SideBarOwnerLayout>
		);
	} else if (route?.useTourEventBreadcrumb) {
		Component = <ContainerOwnerLayout>{Component}</ContainerOwnerLayout>;
	} else if (route?.path === ENUM_PATH.LOGIN) {
		Component = <>{Component}</>;
	} else {
		Component = <ContainerOwnerLayout>{Component}</ContainerOwnerLayout>;
	}
	// if (route.authSidebar && isAuth) {
	//   Component = <SideBarLayout>{Component}</SideBarLayout>;
	// }
	// if (route.adminSidebar) {
	//   Component = <SideBarAdminLayout>{Component}</SideBarAdminLayout>;
	// }

	return Component;
};

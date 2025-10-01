import type { IRouting } from "@/shared/config";

import { ContainerOwnerLayout, SideBarOwnerLayout } from "@/widgets/layouts";

// Компонент защиты маршрутов
export const ProtectedRoute = ({ route }: { route: IRouting }) => {
	// Оборачиваем в нужный layout
	let Component = <route.component />;

	if (route?.sidebarMenu?.length) {
		Component = (
			<SideBarOwnerLayout
				items={route?.sidebarMenu}
				useBreadcrumb={route.useBreadcrumb}
			>
				{Component}
			</SideBarOwnerLayout>
		);
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

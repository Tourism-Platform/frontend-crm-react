import type { IRouting } from "@/shared/config";

import { SideBarOwnerLayout } from "@/widgets/layouts";

// Компонент защиты маршрутов
export const ProtectedRoute = ({ route }: { route: IRouting }) => {
	// Оборачиваем в нужный layout
	let Component = <route.component />;

	if (route?.sidebarMenu?.length) {
		Component = (
			<SideBarOwnerLayout items={route?.sidebarMenu}>
				{Component}
			</SideBarOwnerLayout>
		);
	}
	// if (route.authSidebar && isAuth) {
	//   Component = <SideBarLayout>{Component}</SideBarLayout>;
	// }
	// if (route.adminSidebar) {
	//   Component = <SideBarAdminLayout>{Component}</SideBarAdminLayout>;
	// }

	return Component;
};

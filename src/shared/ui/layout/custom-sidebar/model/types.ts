import type { TSidebarKeys } from "@/shared/config";

export interface ISidebarMenu {
	title: TSidebarKeys;
	menu?: ISidebarMenuItem[];
}

export interface ISidebarMenuItem {
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	label: TSidebarKeys;
	path: string;
}

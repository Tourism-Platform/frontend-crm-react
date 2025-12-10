import type { TSidebarKeys } from "@/shared/config";

export interface IUserMenu {
	menu?: IUserMenuItem[];
}

export interface IUserMenuItem {
	icon?: React.FC<React.SVGProps<SVGSVGElement>>;
	label: TSidebarKeys;
	path: string;
}

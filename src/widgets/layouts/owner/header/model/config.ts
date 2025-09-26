import type { INavItemBase } from "@/shared/ui";

export const NAV_ITEMS_LIST: INavItemBase[] = [
	{ href: "#", label: "Home" },
	{
		label: "Features",
		submenu: true,
		type: "description",
		items: [
			{
				href: "#",
				label: "Components",
				description: "Browse all components in the library."
			},
			{
				href: "#",
				label: "Documentation",
				description: "Learn how to use the library."
			},
			{
				href: "#",
				label: "Templates",
				description: "Pre-built layouts for common use cases."
			}
		]
	},
	{
		label: "Pricing",
		submenu: true,
		type: "simple",
		items: [
			{ href: "#", label: "Product A" },
			{ href: "#", label: "Product B" },
			{ href: "#", label: "Product C" },
			{ href: "#", label: "Product D" }
		]
	},
	{
		label: "About",
		submenu: true,
		type: "icon",
		items: [
			{ href: "#", label: "Getting Started", icon: "BookOpenIcon" },
			{ href: "#", label: "Tutorials", icon: "LifeBuoyIcon" },
			{ href: "#", label: "About Us", icon: "InfoIcon" }
		]
	}
];

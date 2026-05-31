export type TFooterLink = {
	title: string;
	href: string;
};

export type TFooterSection = {
	title: string;
	links: TFooterLink[];
};

export const FOOTER_SECTIONS: TFooterSection[] = [
	{
		title: "Product",
		links: [
			{ title: "For operators", href: "#" },
			{ title: "For agencies", href: "#" },
			{ title: "For suppliers", href: "#" },
			{ title: "Pricing", href: "#" },
			{ title: "Request demo", href: "#" }
		]
	},
	{
		title: "Company",
		links: [
			{ title: "About us", href: "#" },
			{ title: "Careers", href: "#" },
			{ title: "Blog", href: "#" },
			{ title: "Contact", href: "#" }
		]
	},
	{
		title: "Resources",
		links: [
			{ title: "Help center", href: "#" },
			{ title: "Documentation", href: "#" },
			{ title: "API reference", href: "#" },
			{ title: "Community", href: "#" }
		]
	}
];

export const CONTACT_INFO = {
	address: "81 Rivington Street London EC2A 3AY",
	email: "hello@shadcnspace.com",
	phone: "0105 192 3556"
};

export const SOCIAL_LINKS = [
	{ href: "#", name: "twitter" },
	{ href: "#", name: "linkedin" },
	{ href: "#", name: "dribbble" },
	{ href: "#", name: "instagram" }
];

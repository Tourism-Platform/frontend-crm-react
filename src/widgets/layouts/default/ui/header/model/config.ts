import {
	BarChart3,
	BookOpen,
	Briefcase,
	Building2,
	ClipboardList,
	DollarSign,
	FileText,
	Handshake,
	Hotel,
	LifeBuoy,
	Mail,
	Map,
	Mountain,
	Newspaper,
	PenLine,
	Users
} from "lucide-react";

import type { TPublicNavGroup } from "./types";

export const PUBLIC_NAV_ITEMS: TPublicNavGroup[] = [
	{
		labelKey: "public.nav.solutions.label",
		sections: [
			{
				labelKey: "public.nav.solutions.sections.by_role",
				items: [
					{
						labelKey: "public.nav.solutions.items.operators.label",
						descriptionKey:
							"public.nav.solutions.items.operators.description",
						icon: Building2
					},
					{
						labelKey: "public.nav.solutions.items.agencies.label",
						descriptionKey:
							"public.nav.solutions.items.agencies.description",
						icon: Handshake
					}
				]
			},
			{
				labelKey: "public.nav.solutions.sections.coming_soon",
				items: [
					{
						labelKey: "public.nav.solutions.items.suppliers.label",
						descriptionKey:
							"public.nav.solutions.items.suppliers.description",
						icon: Hotel
					}
				]
			}
		]
	},
	{
		labelKey: "public.nav.product.label",
		sections: [
			{
				labelKey: "public.nav.product.sections.core_tools",
				items: [
					{
						labelKey: "public.nav.product.items.tour_builder.label",
						descriptionKey:
							"public.nav.product.items.tour_builder.description",
						icon: Map
					},
					{
						labelKey: "public.nav.product.items.booking.label",
						descriptionKey:
							"public.nav.product.items.booking.description",
						icon: ClipboardList
					},
					{
						labelKey: "public.nav.product.items.finance.label",
						descriptionKey:
							"public.nav.product.items.finance.description",
						icon: DollarSign
					}
				]
			},
			{
				labelKey: "public.nav.product.sections.more",
				items: [
					{
						labelKey: "public.nav.product.items.documents.label",
						descriptionKey:
							"public.nav.product.items.documents.description",
						icon: FileText
					},
					{
						labelKey: "public.nav.product.items.crm.label",
						descriptionKey:
							"public.nav.product.items.crm.description",
						icon: Users
					},
					{
						labelKey: "public.nav.product.items.analytics.label",
						descriptionKey:
							"public.nav.product.items.analytics.description",
						icon: BarChart3
					}
				]
			}
		]
	},
	{
		labelKey: "public.nav.resources.label",
		sections: [
			{
				labelKey: "public.nav.resources.sections.community",
				items: [
					{
						labelKey: "public.nav.resources.items.blog.label",
						descriptionKey:
							"public.nav.resources.items.blog.description",
						icon: PenLine
					},
					{
						labelKey: "public.nav.resources.items.news.label",
						descriptionKey:
							"public.nav.resources.items.news.description",
						icon: Newspaper
					}
				]
			},
			{
				labelKey: "public.nav.resources.sections.help",
				items: [
					{
						labelKey: "public.nav.resources.items.support.label",
						descriptionKey:
							"public.nav.resources.items.support.description",
						icon: LifeBuoy
					},
					{
						labelKey:
							"public.nav.resources.items.knowledge_base.label",
						descriptionKey:
							"public.nav.resources.items.knowledge_base.description",
						icon: BookOpen
					}
				]
			}
		]
	},
	{
		labelKey: "public.nav.company.label",
		sections: [
			{
				items: [
					{
						labelKey: "public.nav.company.items.about.label",
						descriptionKey:
							"public.nav.company.items.about.description",
						icon: Mountain
					},
					{
						labelKey: "public.nav.company.items.partners.label",
						descriptionKey:
							"public.nav.company.items.partners.description",
						icon: Handshake
					},
					{
						labelKey: "public.nav.company.items.careers.label",
						descriptionKey:
							"public.nav.company.items.careers.description",
						icon: Briefcase
					},
					{
						labelKey: "public.nav.company.items.contact.label",
						descriptionKey:
							"public.nav.company.items.contact.description",
						icon: Mail
					}
				]
			}
		]
	}
];

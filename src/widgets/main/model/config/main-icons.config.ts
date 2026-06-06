import {
	BarChart3,
	Bell,
	Building2,
	Calendar,
	Car,
	CircleDollarSign,
	ClipboardCheck,
	FileSpreadsheet,
	FileText,
	Globe,
	Hotel,
	Languages,
	Mail,
	MapPin,
	MessageCircle,
	MessageSquare,
	Phone,
	Search,
	Send,
	ShieldCheck,
	StickyNote,
	Timer,
	Users,
	Utensils
} from "lucide-react";

import type {
	IAgencyFeatureItem,
	IMainIconItem,
	IOperatorFeatureItem,
	IProblemToolItem,
	IRoadmapIntegrationItem,
	IRoadmapModuleItem,
	IRoadmapRegionCityItem,
	ISupplierFeatureItem
} from "../types/main-config.types";

export const TRUST_ITEMS_LIST: IMainIconItem[] = [
	{ name: "central-asia", icon: MapPin },
	{ name: "verified-operators", icon: ShieldCheck },
	{ name: "auto-translated", icon: Globe },
	{ name: "real-time-bookings", icon: Timer }
];

export const OPERATOR_FEATURE_ITEMS_LIST: IOperatorFeatureItem[] = [
	{ id: "visual-constructor", icon: Hotel },
	{ id: "auto-vouchers", icon: FileText },
	{ id: "auto-translation", icon: Languages },
	{ id: "task-management", icon: ClipboardCheck, isSoon: true },
	{ id: "staff-permissions", icon: Users },
	{ id: "sales-dashboard", icon: Building2, isSoon: true }
];

export const AGENCY_FEATURE_ITEMS_LIST: IAgencyFeatureItem[] = [
	{ id: "live-catalog", icon: Search },
	{ id: "downloadable-previews", icon: FileText },
	{ id: "custom-tour-requests", icon: MessageSquare },
	{ id: "commission-control", icon: CircleDollarSign, isSoon: true },
	{ id: "real-time-bookings", icon: Timer },
	{ id: "client-crm", icon: Users, isSoon: true }
];

export const SUPPLIER_FEATURE_ITEMS_LIST: ISupplierFeatureItem[] = [
	{ id: "availability-management", icon: Calendar, isSoon: true },
	{ id: "booking-requests", icon: ClipboardCheck, isSoon: true },
	{ id: "calendar-sync", icon: Timer, isSoon: true },
	{ id: "payouts", icon: CircleDollarSign, isSoon: true },
	{ id: "operator-network", icon: Building2, isSoon: true },
	{ id: "service-profile", icon: Hotel, isSoon: true }
];

export const NETWORK_SUPPLIER_ITEMS_LIST: IMainIconItem[] = [
	{ name: "hotels", icon: Hotel },
	{ name: "transfers", icon: Car },
	{ name: "dining", icon: Utensils },
	{ name: "attractions", icon: MapPin },
	{ name: "transport", icon: Car }
];

export const NETWORK_USER_ITEMS_LIST: IMainIconItem[] = [
	{ name: "operators", icon: Building2 },
	{ name: "agencies", icon: Users },
	{ name: "guides", icon: MessageSquare },
	{ name: "travelers", icon: Users },
	{ name: "b2b-partners", icon: CircleDollarSign }
];

export const ROADMAP_MODULE_ITEMS_LIST: IRoadmapModuleItem[] = [
	{
		id: "tour-builder",
		icon: Hotel,
		iconClassName: "bg-primary/10 text-primary"
	},
	{
		id: "bookings",
		icon: ClipboardCheck,
		iconClassName: "bg-purple-500/10 text-purple-600"
	},
	{
		id: "client-crm",
		icon: Users,
		iconClassName: "bg-pink-500/10 text-pink-600"
	},
	{
		id: "documents",
		icon: FileText,
		iconClassName: "bg-amber-500/10 text-amber-600"
	},
	{
		id: "finance",
		icon: CircleDollarSign,
		iconClassName: "bg-emerald-500/10 text-emerald-600"
	},
	{
		id: "analytics",
		icon: BarChart3,
		iconClassName: "bg-primary/10 text-primary"
	}
];

export const ROADMAP_INTEGRATION_ITEMS_LIST: IRoadmapIntegrationItem[] = [
	{ id: "1c" },
	{ id: "bitrix" },
	{ id: "click" },
	{ id: "payme" }
];

export const ROADMAP_REGION_CITIES_LIST: IRoadmapRegionCityItem[] = [
	{ id: "tashkent", left: "50%", top: "41%" },
	{ id: "bukhara", left: "41%", top: "47%" },
	{ id: "samarkand", left: "51%", top: "55%" },
	{ id: "khiva", left: "62%", top: "45%" },
	{ id: "almaty", left: "25%", top: "31%", isFuture: true },
	{ id: "bishkek", left: "72%", top: "69%", isFuture: true },
	{ id: "dushanbe", left: "77%", top: "31%", isFuture: true }
];

export const PROBLEM_APP_ICON_CLASS =
	"border border-border/80 bg-card shadow-sm";

export const PROBLEM_TOOL_ITEMS_LIST: IProblemToolItem[] = [
	{
		id: "whatsapp",
		icon: MessageCircle,
		badgeCount: 70,
		rotate: 0,
		iconClass: "text-emerald-500",
		isAnchor: true
	},
	{
		id: "email",
		icon: Mail,
		badgeCount: 120,
		rotate: -6,
		iconClass: "text-red-500"
	},
	{
		id: "bell",
		icon: Bell,
		badgeCount: 140,
		rotate: 8,
		iconClass: "text-orange-500"
	},
	{
		id: "notes",
		icon: StickyNote,
		badgeCount: 50,
		rotate: 5,
		iconClass: "text-amber-500"
	},
	{
		id: "excel",
		icon: FileSpreadsheet,
		badgeCount: 90,
		rotate: 6,
		iconClass: "text-green-600"
	},
	{
		id: "word",
		icon: FileText,
		badgeCount: 45,
		rotate: -5,
		iconClass: "text-blue-600"
	},
	{
		id: "phone",
		icon: Phone,
		badgeCount: 20,
		rotate: -4,
		iconClass: "text-violet-500"
	},
	{
		id: "telegram",
		icon: Send,
		badgeCount: 30,
		rotate: 7,
		iconClass: "text-sky-500"
	},
	{
		id: "calendar",
		icon: Calendar,
		badgeCount: 85,
		rotate: -3,
		iconClass: "text-rose-500"
	}
];

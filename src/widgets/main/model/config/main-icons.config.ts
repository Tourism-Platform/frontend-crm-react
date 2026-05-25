import {
	Building2,
	Car,
	CircleDollarSign,
	ClipboardCheck,
	FileText,
	Globe,
	Hotel,
	Languages,
	MapPin,
	MessageSquare,
	Search,
	ShieldCheck,
	Timer,
	Users,
	Utensils
} from "lucide-react";

import type { IMainIconItem } from "../types/main-config.types";

export const TRUST_ITEMS_LIST: IMainIconItem[] = [
	{ name: "central-asia", icon: MapPin },
	{ name: "verified-operators", icon: ShieldCheck },
	{ name: "auto-translated", icon: Globe },
	{ name: "real-time-bookings", icon: Timer }
];

export const OPERATOR_FEATURE_ITEMS_LIST: IMainIconItem[] = [
	{ name: "visual-constructor", icon: Hotel },
	{ name: "auto-vouchers", icon: FileText },
	{ name: "sales-dashboard", icon: Building2 },
	{ name: "auto-translation", icon: Languages },
	{ name: "task-management", icon: ClipboardCheck },
	{ name: "staff-permissions", icon: Users }
];

export const AGENCY_FEATURE_ITEMS_LIST: IMainIconItem[] = [
	{ name: "live-catalog", icon: Search },
	{ name: "downloadable-previews", icon: FileText },
	{ name: "custom-tour-requests", icon: MessageSquare },
	{ name: "real-time-bookings", icon: Timer },
	{ name: "commission-control", icon: CircleDollarSign },
	{ name: "client-crm", icon: Users }
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

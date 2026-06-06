import {
	Building2,
	Calendar,
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

import type {
	IAgencyFeatureItem,
	IMainIconItem,
	IOperatorFeatureItem,
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

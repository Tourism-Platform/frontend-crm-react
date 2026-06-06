export type TTrustItem = { name: string; desc: string };

export type TProblemMessage = {
	text: string;
	variant: "default" | "warning" | "success";
};

export type TFeatureItem = { name: string; desc: string };

export type TAudienceTab = { id: string; label: string };

export type THeroTourItem = { name: string; meta: string };

export type TMockupBlock = { name: string; time: string };

export type TMockupDay = {
	label: string;
	city: string;
	blocks: TMockupBlock[];
};

export type TCatalogTour = {
	name: string;
	operator: string;
	price: string;
};

export type TNetworkNode = { label: string };

export type TRoadmapStep = {
	period: string;
	title: string;
	tagline: string;
	periodVariant: "now" | "soon";
};

export type TRoadmapPhaseTitle = {
	before: string;
	highlight: string;
	after: string;
};

export type TRoadmapPhase = {
	badge: string;
	badgeVariant: "now" | "soon" | "future";
	banner?: string;
	title: TRoadmapPhaseTitle;
	description: string;
	bullets: string[];
	visualLabel: string;
};

export type TRoadmapRegionStat = { value: string; label: string };

export type TRoadmapModuleItem = { name: string };

export type TRoadmapModuleId =
	| "tour-builder"
	| "bookings"
	| "client-crm"
	| "documents"
	| "finance"
	| "analytics";

export type TRoadmapIntegrationId = "1c" | "bitrix" | "click" | "payme";

export type TRoadmapRegionCityId =
	| "tashkent"
	| "bukhara"
	| "samarkand"
	| "khiva"
	| "almaty"
	| "bishkek"
	| "dushanbe";

export type THowStep = { title: string; desc: string };

export type TTestimonialItem = {
	tag: string;
	quote: string;
	name: string;
	role: string;
};

export type TAudienceTabId = "operator" | "agency" | "supplier";

export type TOperatorFeatureId =
	| "visual-constructor"
	| "auto-vouchers"
	| "auto-translation"
	| "staff-permissions"
	| "task-management"
	| "sales-dashboard";

export type TAgencyFeatureId =
	| "live-catalog"
	| "downloadable-previews"
	| "custom-tour-requests"
	| "real-time-bookings"
	| "commission-control"
	| "client-crm";

export type TSupplierFeatureId =
	| "availability-management"
	| "booking-requests"
	| "calendar-sync"
	| "payouts"
	| "operator-network"
	| "service-profile";

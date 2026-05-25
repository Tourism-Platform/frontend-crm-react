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

export type THowStep = { title: string; desc: string };

export type TTestimonialItem = {
	tag: string;
	quote: string;
	name: string;
	role: string;
};

export type TAudienceTabId = "operator" | "agency";

import { ENUM_BUSINESS_TYPES, type IBusinessInfoBackend } from "../types";

export const BUSINESS_MOCK: IBusinessInfoBackend = {
	avatarUrl:
		"https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0V3dWN9gEdpOEGs0kUIYQw2AeBHj94JtcfnMLg",
	business: {
		businessDescription:
			'{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null},"content":[{"type":"text","marks":[{"type":"italic"}],"text":"Our travel agency specializes in organizing individual and group trips worldwide."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"We carefully select tours based on budget, travel goals, and timing."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"italic"}],"text":"We work only with trusted partners and licensed tour operators."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"bold"}],"text":"Clients receive full support: consultation, booking, documentation, and assistance throughout the journey."},{"type":"hardBreak"},{"type":"text","marks":[{"type":"italic"}],"text":"Our priority is reliability, convenience, and transparent service conditions."}]}]}',
		businessName: "Global Travel Co",
		businessWebsite: "https://globaltravel.com"
	},
	legal: {
		legalCompanyName: "Global Travel Services LLC",
		director: "John Doe",
		tin: "123456789",
		typeOfBusiness: ENUM_BUSINESS_TYPES.TOUR_OPERATOR
	},
	address: {
		addressLine: "123 Main St",
		country: "USA",
		city: "New York"
	},
	contact: {
		contactPerson: "Jane Smith",
		position: "Head of Sales",
		phoneNumber: "+79012345678",
		email: "jane@globaltravel.com"
	}
};

import type { AgencyListItem } from "@/shared/api";

export const AGENCY_LIST_MOCK: AgencyListItem[] = Array.from(
	{ length: 40 },
	(_, index) => {
		const n = index + 1;
		return {
			id: `00000000-0000-4000-8000-${String(n).padStart(12, "0")}`,
			name: `Agency ${n}`,
			business_name: `Travel Agency ${n}`,
			legal_name: `Travel Agency ${n} LLC`,
			contact_person: `Contact ${n}`,
			contact_email: `agency${n}@example.com`,
			contact_phone: `+7900000${String(n).padStart(4, "0")}`,
			tax_id: `TAX-${n}`,
			city: n % 2 === 0 ? "New York" : "Berlin",
			country: n % 2 === 0 ? "USA" : "Germany",
			website_url: `https://agency${n}.example.com`,
			logo_url: null
		};
	}
);

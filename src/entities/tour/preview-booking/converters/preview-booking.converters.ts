import type { TPreviewBookingSchema } from "../types";

export const mapPreviewBookingToBackend = (
	frontend: TPreviewBookingSchema
) => ({
	date: frontend.date?.toISOString(),
	travellers_count: frontend.travellers_count,
	option_id: frontend.option_id,
	travellers: frontend.travellers.map((t: any) => ({
		first_name: t.first_name,
		last_name: t.last_name,
		date_of_birth: t.date_of_birth,
		nationality: t.nationality,
		passport_number: t.passport_number,
		passport_expiry: t.passport_expiry,
		note: t.note
		// TODO: handle file upload mapping if needed
	}))
});

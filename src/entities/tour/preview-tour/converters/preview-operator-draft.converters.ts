import type { TOperatorBusinessInfoBackend } from "@/entities/user/operator/types/operator-business-backend.interface";

import type { IPreviewOperator } from "../types";

import { toPublicImageUrl } from "./preview-option-media.utils";

export const mapDraftOperatorToFrontend = (
	backend: TOperatorBusinessInfoBackend
): IPreviewOperator => ({
	id: backend.operator_id,
	business_name: backend.business_name || "",
	description: backend.description || "",
	website_url: backend.website_url || "",
	email: backend.contact_email || "",
	phone: backend.contact_phone || "",
	address: backend.address_line || "",
	city: backend.city || "",
	country: backend.country || "",
	logo: backend.logo_path ? toPublicImageUrl(backend.logo_path) : ""
});

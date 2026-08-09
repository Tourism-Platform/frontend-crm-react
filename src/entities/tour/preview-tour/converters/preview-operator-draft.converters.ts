import type { OperatorInfoModel } from "@/shared/api";

import type { IPreviewOperator } from "../types";

import { toPublicImageUrl } from "./preview-option-media.utils";

export const mapDraftOperatorToFrontend = (
	backend: OperatorInfoModel
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

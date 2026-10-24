import { createMockIdSequence, mockImageUrl } from "@/shared/api";

import type { TOperatorFile } from "@/entities/booking/order/types/order-pax-backend.types";
import type {
	TOperatorFinanceInfoBackend,
	TOperatorFinanceInfoBackendUpdate
} from "@/entities/finance/finance-information/types/operator-finance-info-backend.interface";
import { AGENCY_BUSINESS_MOCK } from "@/entities/user/agency/mock/agency-business.mock";
import type { TAgencyBusinessInfoBackend } from "@/entities/user/agency/types/agency-business-backend.interface";

import type {
	TOperatorBusinessInfoUpdateBackend,
	TOperatorModelBackend,
	TPartneredAgencyItemBackend
} from "../types";

import { OPERATOR_AGENCY_LIST_MOCK } from "./operator-agencies.mock";
import { OPERATOR_BUSINESS_DOCUMENTS_MOCK } from "./operator-business-documents.mock";
import { OPERATOR_BUSINESS_MOCK } from "./operator-business.mock";
import { OPERATOR_FINANCIAL_MOCK } from "./operator-financial.mock";

/** Агентства-партнёры: часть каталога + агентство мок-пользователя */
const PARTNERED_SEED: TPartneredAgencyItemBackend[] = [
	{
		agency_id: AGENCY_BUSINESS_MOCK.agency_id,
		name: AGENCY_BUSINESS_MOCK.business_name ?? "Agency",
		invited_email: "damirk366@gmail.com",
		invited_user_id: "00000000-0000-4000-a000-000000000002",
		partnered_at: "2026-02-01T10:00:00Z",
		discount: { typ: "percentage", percentage: 5 },
		business_name: AGENCY_BUSINESS_MOCK.business_name,
		contact_person: AGENCY_BUSINESS_MOCK.contact_person,
		contact_email: AGENCY_BUSINESS_MOCK.contact_email,
		contact_phone: AGENCY_BUSINESS_MOCK.contact_phone,
		city: AGENCY_BUSINESS_MOCK.city,
		country: AGENCY_BUSINESS_MOCK.country,
		website_url: AGENCY_BUSINESS_MOCK.website_url,
		logo_url: AGENCY_BUSINESS_MOCK.logo_path
	},
	...OPERATOR_AGENCY_LIST_MOCK.slice(0, 6).map((agency, index) => ({
		agency_id: agency.id,
		name: agency.name,
		invited_email: agency.contact_email ?? `agency${index}@example.com`,
		invited_user_id: null,
		partnered_at: `2026-0${(index % 9) + 1}-15T10:00:00Z`,
		discount:
			index % 2 === 0
				? null
				: { typ: "percentage" as const, percentage: 3 },
		business_name: agency.business_name,
		contact_person: agency.contact_person,
		contact_email: agency.contact_email,
		contact_phone: agency.contact_phone,
		city: agency.city,
		country: agency.country,
		website_url: agency.website_url,
		logo_url: agency.logo_url
	}))
];

let info = structuredClone(OPERATOR_BUSINESS_MOCK);
let financials: TOperatorFinanceInfoBackend = structuredClone(
	OPERATOR_FINANCIAL_MOCK
);
let documents: TOperatorFile[] = structuredClone(
	OPERATOR_BUSINESS_DOCUMENTS_MOCK
);
let partnered = new Map(
	PARTNERED_SEED.map((item) => [item.agency_id, structuredClone(item)])
);
let operators = new Map<string, TOperatorModelBackend>([
	[
		info.operator_id,
		{ id: info.operator_id, name: info.business_name ?? "Operator" }
	]
]);

const fileIds = createMockIdSequence("e200", 1);
const agencyIds = createMockIdSequence("e210", 1);
const operatorIds = createMockIdSequence("e220", 1);

// --- Профиль оператора ---

export const getOperatorInfo = () => info;

export const updateOperatorInfo = (
	update: TOperatorBusinessInfoUpdateBackend
) => {
	for (const [key, value] of Object.entries(update)) {
		if (value !== undefined) Object.assign(info, { [key]: value });
	}
	return info;
};

export const setOperatorLogo = (hasLogo: boolean) => {
	info.logo_path = hasLogo
		? mockImageUrl(`operator-logo-${Date.now()}`, 200, 200)
		: null;
	return info;
};

export const getOperatorFinancials = () => financials;

export const updateOperatorFinancials = (
	update: TOperatorFinanceInfoBackendUpdate
) => {
	for (const [key, value] of Object.entries(update)) {
		if (value === undefined) continue;
		const normalized =
			(key === "vat_rate" || key === "profit_tax_rate") && value !== null
				? String(value)
				: value;
		Object.assign(financials, { [key]: normalized });
	}
	return financials;
};

// --- Операторы (админские CRUD) ---

export const createOperator = (name: string) => {
	const operator = { id: operatorIds.next(), name };
	operators.set(operator.id, operator);
	return operator;
};

export const getOperator = (id: string) => operators.get(id);

export const renameOperator = (id: string, name: string) => {
	const operator = operators.get(id);
	if (operator) operator.name = name;
	return operator;
};

export const deleteOperator = (id: string) => operators.delete(id);

// --- Документы ---

export const listOperatorDocuments = () => documents;

export const getOperatorDocument = (fileId: string) =>
	documents.find((file) => file.id === fileId);

export const addOperatorDocuments = (files: File[]) => {
	const created = files.map((file) => ({
		id: fileIds.next(),
		operator_id: info.operator_id,
		url: `https://files.mock/operator/${encodeURIComponent(file.name)}`,
		file_name: file.name
	}));
	documents.push(...created);
	return created;
};

export const removeOperatorDocument = (fileId: string) => {
	const before = documents.length;
	documents = documents.filter((file) => file.id !== fileId);
	return documents.length !== before;
};

// --- Агентства ---

export const listPartneredAgencies = () => [...partnered.values()];

export const getPartneredAgency = (agencyId: string) => partnered.get(agencyId);

/** Карточка агентства для оператора; для каталога собирается из строки списка */
export const getAgencyInfoForOperator = (
	agencyId: string
): TAgencyBusinessInfoBackend | undefined => {
	if (agencyId === AGENCY_BUSINESS_MOCK.agency_id)
		return AGENCY_BUSINESS_MOCK;

	const agency = OPERATOR_AGENCY_LIST_MOCK.find(
		(item) => item.id === agencyId
	);
	const partner = partnered.get(agencyId);
	if (!agency && !partner) return undefined;

	return {
		id: agencyId,
		agency_id: agencyId,
		logo_path: agency?.logo_url ?? partner?.logo_url ?? null,
		description: null,
		business_name: agency?.business_name ?? partner?.business_name ?? null,
		website_url: agency?.website_url ?? partner?.website_url ?? null,
		legal_name: agency?.legal_name ?? null,
		director_name: null,
		tax_id: agency?.tax_id ?? null,
		contact_person:
			agency?.contact_person ?? partner?.contact_person ?? null,
		contact_position: null,
		contact_email: agency?.contact_email ?? partner?.contact_email ?? null,
		contact_phone: agency?.contact_phone ?? partner?.contact_phone ?? null,
		address_line: null,
		city: agency?.city ?? partner?.city ?? null,
		country: agency?.country ?? partner?.country ?? null
	};
};

interface IInviteAgency {
	email: string;
	name?: string | null;
	info?: Partial<TAgencyBusinessInfoBackend> | null;
}

export const inviteAgency = ({
	email,
	name,
	info: agencyInfo
}: IInviteAgency) => {
	const agencyId = agencyIds.next();
	const item: TPartneredAgencyItemBackend = {
		agency_id: agencyId,
		name: name ?? agencyInfo?.business_name ?? email,
		invited_email: email,
		invited_user_id: null,
		partnered_at: new Date().toISOString(),
		discount: null,
		business_name: agencyInfo?.business_name ?? null,
		contact_person: agencyInfo?.contact_person ?? null,
		contact_email: agencyInfo?.contact_email ?? email,
		contact_phone: agencyInfo?.contact_phone ?? null,
		city: agencyInfo?.city ?? null,
		country: agencyInfo?.country ?? null,
		website_url: agencyInfo?.website_url ?? null,
		logo_url: null
	};
	partnered.set(agencyId, item);
	return item;
};

export const setAgencyDiscount = (
	agencyId: string,
	discount: TPartneredAgencyItemBackend["discount"]
) => {
	const item = partnered.get(agencyId);
	if (!item) return undefined;
	item.discount = discount;
	return item;
};

export const resetOperatorStore = () => {
	info = structuredClone(OPERATOR_BUSINESS_MOCK);
	financials = structuredClone(OPERATOR_FINANCIAL_MOCK);
	documents = structuredClone(OPERATOR_BUSINESS_DOCUMENTS_MOCK);
	partnered = new Map(
		PARTNERED_SEED.map((item) => [item.agency_id, structuredClone(item)])
	);
	operators = new Map([
		[
			info.operator_id,
			{ id: info.operator_id, name: info.business_name ?? "Operator" }
		]
	]);
	fileIds.reset(1);
	agencyIds.reset(1);
	operatorIds.reset(1);
};

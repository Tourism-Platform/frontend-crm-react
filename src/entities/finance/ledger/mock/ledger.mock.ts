import { createMockId } from "@/shared/api";

import { ENUM_CURRENCY_BACKEND } from "@/entities/commission/types/currency.types";
import { MOCK_OPERATOR_ID } from "@/entities/finance/finance-information/mock/operator-payment-routes.mock";

import {
	ENUM_LEDGER_ENTRY_TYPE_BACKEND,
	ENUM_LEDGER_FLOW_BACKEND,
	ENUM_LEDGER_PARTY_BACKEND,
	type ENUM_LEDGER_PARTY_BACKEND_TYPE,
	ENUM_LEDGER_SOURCE_BACKEND,
	type TCounterpartyBalanceBackend,
	type TLedgerEntryBackend
} from "../types";

const MOCK_COUNTERPARTIES = [
	{
		typ: ENUM_LEDGER_PARTY_BACKEND.AGENCY,
		id: createMockId("e300", 1),
		name: "Silk Road Travel"
	},
	{
		typ: ENUM_LEDGER_PARTY_BACKEND.AGENCY,
		id: createMockId("e300", 2),
		name: "Samarkand Tours"
	},
	{
		typ: ENUM_LEDGER_PARTY_BACKEND.SUPPLIER,
		id: createMockId("e300", 3),
		name: "Hotel Uzbekistan"
	},
	{
		typ: ENUM_LEDGER_PARTY_BACKEND.SUPPLIER,
		id: createMockId("e300", 4),
		name: "Afrosiyob Rail"
	}
];

/** На каждого контрагента: начисление и частичная оплата (долг — разница) */
export const LEDGER_ENTRIES_MOCK: TLedgerEntryBackend[] =
	MOCK_COUNTERPARTIES.flatMap((party, index) => {
		const isAgency = party.typ === ENUM_LEDGER_PARTY_BACKEND.AGENCY;
		const accrued = String(1000 * (index + 1));
		const settled = String(400 * (index + 1));
		const ends = isAgency
			? {
					payer_typ: party.typ,
					payer_id: party.id,
					payee_typ: ENUM_LEDGER_PARTY_BACKEND.OPERATOR,
					payee_id: MOCK_OPERATOR_ID,
					flow: ENUM_LEDGER_FLOW_BACKEND.INBOUND
				}
			: {
					payer_typ: ENUM_LEDGER_PARTY_BACKEND.OPERATOR,
					payer_id: MOCK_OPERATOR_ID,
					payee_typ: party.typ,
					payee_id: party.id,
					flow: ENUM_LEDGER_FLOW_BACKEND.OUTBOUND
				};
		const base = {
			...ends,
			operator_id: MOCK_OPERATOR_ID,
			booking_id: createMockId("e301", index + 1),
			order_number: `RQA-LEDG-0${index + 1}`,
			snapshot_event_id: null,
			currency: ENUM_CURRENCY_BACKEND.USD,
			rate: "1",
			source_id: null,
			note: null
		};

		return [
			{
				...base,
				id: createMockId("e302", index * 2 + 1),
				typ: ENUM_LEDGER_ENTRY_TYPE_BACKEND.ACCRUAL,
				amount: accrued,
				base_amount: accrued,
				source: isAgency
					? ENUM_LEDGER_SOURCE_BACKEND.INVOICE
					: ENUM_LEDGER_SOURCE_BACKEND.MANUAL,
				occurred_at: `2026-0${index + 1}-01T10:00:00Z`
			},
			{
				...base,
				id: createMockId("e302", index * 2 + 2),
				typ: ENUM_LEDGER_ENTRY_TYPE_BACKEND.SETTLEMENT,
				amount: settled,
				base_amount: settled,
				source: isAgency
					? ENUM_LEDGER_SOURCE_BACKEND.INVOICE_PAYMENT
					: ENUM_LEDGER_SOURCE_BACKEND.SUPPLIER_PAYMENT,
				occurred_at: `2026-0${index + 1}-15T10:00:00Z`
			}
		];
	});

const sumAmount = (entries: TLedgerEntryBackend[]) =>
	entries.reduce((sum, entry) => sum + Number(entry.amount), 0);

/** Сальдо по контрагентам: должники — агентства, кредиторы — поставщики */
export const buildCounterpartyBalances = (
	partyTyp: ENUM_LEDGER_PARTY_BACKEND_TYPE
): TCounterpartyBalanceBackend[] =>
	MOCK_COUNTERPARTIES.filter((party) => party.typ === partyTyp).map(
		(party) => {
			const entries = LEDGER_ENTRIES_MOCK.filter(
				(entry) =>
					entry.payer_id === party.id || entry.payee_id === party.id
			);
			const billed = sumAmount(
				entries.filter(
					(entry) =>
						entry.typ === ENUM_LEDGER_ENTRY_TYPE_BACKEND.ACCRUAL
				)
			);
			const paid = sumAmount(
				entries.filter(
					(entry) =>
						entry.typ === ENUM_LEDGER_ENTRY_TYPE_BACKEND.SETTLEMENT
				)
			);

			return {
				party_typ: party.typ,
				party_id: party.id,
				party_name: party.name,
				billed: String(billed),
				paid: String(paid),
				outstanding: String(billed - paid),
				currency: ENUM_CURRENCY_BACKEND.USD
			};
		}
	);

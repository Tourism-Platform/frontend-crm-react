import type { OPERATOR_SUPPLIER_PAYMENT_PATHS } from "@/shared/api";
import { SupplierPaymentStatus } from "@/shared/api";
import { formatDate, parseDecimalSafe } from "@/shared/utils";

import { currencyConverter } from "@/entities/commission";

import { SUPPLIER_PAYMENT_NO_DATA } from "../constants";
import { getSupplierPaymentMockDisplay } from "../mock/supplier-payment.mock-display";
import { consumeLastSupplierPaymentListMeta } from "../mock/supplier-payment.store";
import {
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type ISupplierPayment,
	type ISupplierPaymentFilters,
	type ISupplierPaymentPaginatedResponse,
	type TSupplierPaymentBackend,
	type TSupplierPaymentStatusCounts,
	type TUpdateSupplierPaymentBackend
} from "../types";

import { supplierPaymentStatusConverter } from "./supplier-payment-status.converter";

const parseAmount = (value: string | number): number =>
	parseDecimalSafe(value).toNumber();

const mapFileToMetadata = (
	payment: TSupplierPaymentBackend
): ISupplierPayment["files"] => {
	if (!payment.file) {
		return undefined;
	}

	return [
		{
			id: payment.id,
			name: "receipt.pdf",
			size: 0,
			type: "application/pdf",
			url: payment.file
		}
	];
};

export const mapSupplierPaymentToFrontend = (
	data: TSupplierPaymentBackend
): ISupplierPayment => {
	const display = getSupplierPaymentMockDisplay(data.id);
	const uiStatus = supplierPaymentStatusConverter.from(data.status);

	return {
		id: data.id,
		orderId: data.booking_id,
		component: display?.component ?? SUPPLIER_PAYMENT_NO_DATA,
		type: display?.type ?? SUPPLIER_PAYMENT_NO_DATA,
		supplier: display?.supplier ?? SUPPLIER_PAYMENT_NO_DATA,
		dateCreated: data.paid_at
			? formatDate(data.paid_at)
			: SUPPLIER_PAYMENT_NO_DATA,
		amount: parseAmount(data.amount),
		currency:
			currencyConverter.from(data.currency) ?? String(data.currency),
		manager: display?.manager ?? SUPPLIER_PAYMENT_NO_DATA,
		status: uiStatus ?? ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
		note: data.note ?? undefined,
		files: mapFileToMetadata(data)
	};
};

export const mapUpdateSupplierPaymentToBackend = (
	data: Partial<ISupplierPayment>
): TUpdateSupplierPaymentBackend => {
	const patch: TUpdateSupplierPaymentBackend = {};

	if (data.amount != null) {
		patch.amount = data.amount;
	}

	if (data.currency != null) {
		const currency = currencyConverter.to(
			data.currency as Parameters<typeof currencyConverter.to>[0]
		);
		if (currency) {
			patch.currency = currency;
		}
	}

	if (data.note !== undefined) {
		patch.note = data.note ?? null;
	}

	if (data.status != null) {
		const status = supplierPaymentStatusConverter.to(data.status);
		if (status) {
			patch.status = status;
		}
	}

	return patch;
};

const emptyStatusCounts = (): TSupplierPaymentStatusCounts => ({
	[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED]: 0,
	[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED]: 0
});

const computeStatusCountsFromItems = (
	items: TSupplierPaymentBackend[]
): TSupplierPaymentStatusCounts => {
	const counts = emptyStatusCounts();

	for (const item of items) {
		if (item.status === SupplierPaymentStatus.Paid) {
			counts[ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED] += 1;
		} else {
			counts[ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED] += 1;
		}
	}

	return counts;
};

export const mapSupplierPaymentListToPaginated = (
	items: TSupplierPaymentBackend[],
	filters: ISupplierPaymentFilters
): ISupplierPaymentPaginatedResponse => {
	const meta = consumeLastSupplierPaymentListMeta();
	const skip = (filters.page - 1) * filters.limit;

	return {
		data: items.map(mapSupplierPaymentToFrontend),
		total:
			meta?.total ??
			(items.length < filters.limit
				? skip + items.length
				: skip + filters.limit + 1),
		statusCounts: meta?.status_counts ?? computeStatusCountsFromItems(items)
	};
};

export const mapSupplierPaymentFiltersToBackend = (
	filters: ISupplierPaymentFilters
): typeof OPERATOR_SUPPLIER_PAYMENT_PATHS.listSupplierPayments._types.query & {
	q?: string;
	status?: string;
} => {
	const search = filters.search.trim();

	return {
		skip: (filters.page - 1) * filters.limit,
		limit: filters.limit,
		...(filters.status.length > 0
			? { status: filters.status.join(",") }
			: {}),
		...(search ? { q: search } : {})
	};
};

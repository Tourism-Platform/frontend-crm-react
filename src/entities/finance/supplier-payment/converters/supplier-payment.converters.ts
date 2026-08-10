import type {
	OPERATOR_SUPPLIER_PAYMENT_PATHS,
	SupplierPaymentFile,
	SupplierPaymentListRowOutput
} from "@/shared/api";
import { formatDate, parseDecimalSafe } from "@/shared/utils";

import { currencyConverter } from "@/entities/commission";

import { SUPPLIER_PAYMENT_NO_DATA } from "../constants";
import { getSupplierPaymentMockDisplay } from "../mock/supplier-payment.mock-display";
import {
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type ISupplierPayment,
	type ISupplierPaymentFilters,
	type ISupplierPaymentPaginatedResponse,
	type TSupplierPaymentBackend,
	type TSupplierPaymentListResponseInput,
	type TSupplierPaymentStatusCounts,
	type TUpdateSupplierPaymentBackend
} from "../types";

import { supplierPaymentStatusConverter } from "./supplier-payment-status.converter";

const parseAmount = (value: string | number): number =>
	parseDecimalSafe(value).toNumber();

const mapFilesToMetadata = (
	files: SupplierPaymentFile[]
): ISupplierPayment["files"] => {
	if (files.length === 0) {
		return undefined;
	}

	return files.map((file) => ({
		id: file.file_id,
		name: file.file_name,
		size: 0,
		type: "",
		url: file.url
	}));
};

export const mapSupplierPaymentToFrontend = (
	data: TSupplierPaymentBackend
): ISupplierPayment => {
	const display = getSupplierPaymentMockDisplay(data.payment_id);
	const uiStatus = supplierPaymentStatusConverter.from(data.status);

	return {
		id: data.payment_id,
		orderId: data.order_number ?? SUPPLIER_PAYMENT_NO_DATA,
		bookingId: data.booking_id,
		component:
			display?.component ?? data.event_name ?? SUPPLIER_PAYMENT_NO_DATA,
		type: display?.type ?? data.event_typ ?? SUPPLIER_PAYMENT_NO_DATA,
		supplier:
			display?.supplier ?? data.supplier_name ?? SUPPLIER_PAYMENT_NO_DATA,
		dateCreated: data.paid_at ? formatDate(data.paid_at) : "",
		amount: parseAmount(data.amount),
		currency:
			currencyConverter.from(data.currency) ?? String(data.currency),
		manager: display?.manager ?? SUPPLIER_PAYMENT_NO_DATA,
		status: uiStatus ?? ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
		note: data.note ?? undefined,
		files: mapFilesToMetadata(data.files)
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

export const mapSupplierPaymentListItemToFrontend = (
	data: SupplierPaymentListRowOutput
): ISupplierPayment => {
	const display = getSupplierPaymentMockDisplay(data.payment_id);
	const uiStatus = supplierPaymentStatusConverter.from(data.status);

	return {
		id: data.payment_id,
		orderId: data.order_number ?? SUPPLIER_PAYMENT_NO_DATA,
		bookingId: data.booking_id,
		component:
			display?.component ?? data.event_name ?? SUPPLIER_PAYMENT_NO_DATA,
		type: display?.type ?? data.event_typ ?? SUPPLIER_PAYMENT_NO_DATA,
		supplier:
			display?.supplier ?? data.supplier_name ?? SUPPLIER_PAYMENT_NO_DATA,
		dateCreated: data.paid_at ? formatDate(data.paid_at) : "",
		amount: parseAmount(data.amount),
		currency:
			currencyConverter.from(data.currency) ?? String(data.currency),
		manager: display?.manager ?? SUPPLIER_PAYMENT_NO_DATA,
		status: uiStatus ?? ENUM_SUPPLIER_PAYMENT_STATUS.RECORDED,
		note: undefined,
		files:
			data.receipt_count > 0
				? [
						{
							id: data.payment_id,
							name: "receipt.pdf",
							size: 0,
							type: "application/pdf",
							url: ""
						}
					]
				: undefined
	};
};

export const mapSupplierPaymentListToPaginated = (
	response: TSupplierPaymentListResponseInput
): ISupplierPaymentPaginatedResponse => ({
	data: response.data.map(mapSupplierPaymentListItemToFrontend),
	total: response.total_count,
	statusCounts: response.status_counts ?? emptyStatusCounts()
});

export const mapSupplierPaymentFiltersToBackend = (
	filters: ISupplierPaymentFilters
): typeof OPERATOR_SUPPLIER_PAYMENT_PATHS.listSupplierPayments._types.query => {
	const search = filters.search.trim();

	return {
		skip: (filters.page - 1) * filters.limit,
		limit: filters.limit,
		status:
			filters.status.length > 0
				? supplierPaymentStatusConverter.to(filters.status[0])
				: undefined,
		...(filters.bookingId ? { booking_id: filters.bookingId } : {}),
		...(search ? { q: search } : {})
	};
};

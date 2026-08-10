import {
	type ClientPaymentFile,
	type ClientPaymentListResponse,
	type ClientPaymentResponse,
	ClientPaymentStatus,
	type ClientPaymentUpdate
} from "@/shared/api";

import { bookingOrderListItems } from "@/entities/booking/order/mock/booking-order.store";

import { ENUM_PAYMENT_STATUS } from "../types";
import type { TPaymentStatusCounts } from "../types";

import {
	MOCK_OPERATOR_ID,
	MOCK_PAYMENT_DEFAULTS,
	buildPaymentUuid
} from "./payment.mock.constants";
import {
	createClientPaymentAttachmentMocks,
	createClientPaymentMocks
} from "./payment.mock.factory";

let payments: ClientPaymentResponse[] = createClientPaymentMocks();
let attachmentsByPaymentId: Record<string, ClientPaymentFile[]> =
	createClientPaymentAttachmentMocks(payments);

export const resetClientPaymentsForTests = (): void => {
	payments = createClientPaymentMocks();
	attachmentsByPaymentId = createClientPaymentAttachmentMocks(payments);
};

export const getPayment = (
	paymentId: string
): ClientPaymentResponse | undefined =>
	payments.find((payment) => payment.id === paymentId);

export const listAvailableBookingIds = (): string[] =>
	bookingOrderListItems.map((item) => item.id);

export interface IListPaymentsQuery {
	status: string | null;
	booking_id: string | null;
	q: string | null;
	skip: number;
	limit: number;
}

const filterPayments = ({
	status,
	booking_id,
	q
}: Pick<
	IListPaymentsQuery,
	"status" | "booking_id" | "q"
>): ClientPaymentResponse[] => {
	let filtered = [...payments];

	if (status) {
		filtered = filtered.filter((payment) => payment.status === status);
	}

	if (booking_id) {
		filtered = filtered.filter(
			(payment) => payment.booking_id === booking_id
		);
	}

	if (q) {
		const query = q.toLowerCase();
		filtered = filtered.filter(
			(payment) =>
				payment.id.toLowerCase().includes(query) ||
				payment.booking_id.toLowerCase().includes(query) ||
				(payment.note?.toLowerCase().includes(query) ?? false)
		);
	}

	return filtered;
};

const computeStatusCounts = (
	items: ClientPaymentResponse[]
): TPaymentStatusCounts => {
	const counts: TPaymentStatusCounts = {
		[ENUM_PAYMENT_STATUS.ASSIGNED]: 0,
		[ENUM_PAYMENT_STATUS.NOT_ASSIGNED]: 0
	};

	for (const item of items) {
		if (item.status === ClientPaymentStatus.Confirmed) {
			counts[ENUM_PAYMENT_STATUS.ASSIGNED] += 1;
		} else {
			counts[ENUM_PAYMENT_STATUS.NOT_ASSIGNED] += 1;
		}
	}

	return counts;
};

const syncAttachmentCount = (paymentId: string): void => {
	const index = payments.findIndex((payment) => payment.id === paymentId);
	if (index === -1) return;

	const count = attachmentsByPaymentId[paymentId]?.length ?? 0;
	payments[index] = {
		...payments[index],
		attachment_count: count,
		updated_at: new Date().toISOString()
	};
};

export const listPayments = ({
	status,
	booking_id,
	q,
	skip,
	limit
}: IListPaymentsQuery): ClientPaymentListResponse => {
	const filtered = filterPayments({ status, booking_id, q });
	const data = filtered.slice(skip, skip + limit);

	return {
		total_count: filtered.length,
		data
	};
};

export const listPaymentsWithStatusCounts = (
	query: IListPaymentsQuery
): ClientPaymentListResponse & { status_counts: TPaymentStatusCounts } => {
	const filtered = filterPayments(query);
	const data = filtered.slice(query.skip, query.skip + query.limit);

	return {
		total_count: filtered.length,
		data,
		status_counts: computeStatusCounts(filtered)
	};
};

export const listPaymentsFromUrl = (
	url: URL
): ClientPaymentListResponse & { status_counts: TPaymentStatusCounts } =>
	listPaymentsWithStatusCounts({
		status: url.searchParams.get("status"),
		booking_id: url.searchParams.get("booking_id"),
		q: url.searchParams.get("q"),
		skip: Number(url.searchParams.get("skip")) || 0,
		limit: Number(url.searchParams.get("limit")) || 10
	});

export const createPaymentFromFormData = (
	formData: FormData
): ClientPaymentResponse | null => {
	const bookingId = String(formData.get("booking_id") ?? "");
	const amountUzs = Number(formData.get("amount_uzs"));
	const exchangeRate = Number(formData.get("exchange_rate"));

	if (!bookingId || !amountUzs || !exchangeRate) {
		return null;
	}

	const note = formData.get("note");
	const file = formData.get("file");
	const now = new Date().toISOString();
	const paymentId = buildPaymentUuid(payments.length + 1);
	const hasFile = file instanceof Blob && file.size > 0;
	const fileName =
		file instanceof File && file.name
			? file.name
			: `payment-${paymentId}.pdf`;

	const created: ClientPaymentResponse = {
		client_name:
			bookingOrderListItems.find((item) => item.id === bookingId)
				?.client_name ?? "",
		tour_name:
			bookingOrderListItems.find((item) => item.id === bookingId)
				?.tour_name ?? "",
		id: paymentId,
		booking_id: bookingId,
		order_number:
			bookingOrderListItems.find((item) => item.id === bookingId)
				?.order_number ?? "",
		operator_id: MOCK_OPERATOR_ID,
		amount: amountUzs / exchangeRate,
		currency: MOCK_PAYMENT_DEFAULTS.currency,
		status: ClientPaymentStatus.NotConfirmed,
		note: typeof note === "string" && note.length > 0 ? note : null,
		attachment_count: hasFile ? 1 : 0,
		created_at: now,
		updated_at: now
	};

	payments = [created, ...payments];
	attachmentsByPaymentId[paymentId] = hasFile
		? [{ file_id: `${paymentId}-file-1`, file_name: fileName }]
		: [];

	return created;
};

export const updatePaymentInStore = (
	paymentId: string,
	patch: ClientPaymentUpdate
): ClientPaymentResponse | null => {
	const index = payments.findIndex((payment) => payment.id === paymentId);

	if (index === -1) {
		return null;
	}

	const current = payments[index];
	const updated: ClientPaymentResponse = {
		...current,
		amount: patch.amount ?? current.amount,
		note: patch.note !== undefined ? patch.note : current.note,
		updated_at: new Date().toISOString()
	};

	payments[index] = updated;

	return updated;
};

export const confirmPaymentInStore = (
	paymentId: string
): ClientPaymentResponse | null => {
	const index = payments.findIndex((payment) => payment.id === paymentId);

	if (index === -1) {
		return null;
	}

	const updated: ClientPaymentResponse = {
		...payments[index],
		status: ClientPaymentStatus.Confirmed,
		updated_at: new Date().toISOString()
	};

	payments[index] = updated;

	return updated;
};

export const deletePaymentFromStore = (paymentId: string): boolean => {
	const lengthBefore = payments.length;
	payments = payments.filter((payment) => payment.id !== paymentId);
	delete attachmentsByPaymentId[paymentId];

	return payments.length < lengthBefore;
};

export const listAttachmentsInStore = (
	paymentId: string
): ClientPaymentFile[] | null => {
	if (!getPayment(paymentId)) {
		return null;
	}

	return attachmentsByPaymentId[paymentId] ?? [];
};

export const addAttachmentInStore = (
	paymentId: string,
	fileName: string
): ClientPaymentFile | null => {
	if (!getPayment(paymentId)) {
		return null;
	}

	const current = attachmentsByPaymentId[paymentId] ?? [];
	const created: ClientPaymentFile = {
		file_id: `${paymentId}-file-${current.length + 1}-${Date.now()}`,
		file_name: fileName
	};

	attachmentsByPaymentId[paymentId] = [...current, created];
	syncAttachmentCount(paymentId);

	return created;
};

export const getAttachmentInStore = (
	paymentId: string,
	fileId: string
): ClientPaymentFile | null => {
	const files = attachmentsByPaymentId[paymentId] ?? [];
	return files.find((file) => file.file_id === fileId) ?? null;
};

export const removeAttachmentInStore = (
	paymentId: string,
	fileId: string
): boolean => {
	if (!getPayment(paymentId)) {
		return false;
	}

	const current = attachmentsByPaymentId[paymentId] ?? [];
	const next = current.filter((file) => file.file_id !== fileId);

	if (next.length === current.length) {
		return false;
	}

	attachmentsByPaymentId[paymentId] = next;
	syncAttachmentCount(paymentId);

	return true;
};

export const buildAttachmentBlob = (fileName: string): Blob => {
	const content = `%PDF-1.4
1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj
2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj
3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] >>endobj
trailer<< /Root 1 0 R >>
%%EOF
${fileName}
`;
	return new Blob([content], { type: "application/pdf" });
};

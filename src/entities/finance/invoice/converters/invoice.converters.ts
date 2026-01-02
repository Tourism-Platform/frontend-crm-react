import type {
	IInvoice,
	IInvoiceBackend,
	IInvoiceDetail,
	IInvoiceDetailBackend,
	IInvoiceFilters,
	IInvoicePaginatedResponse,
	IInvoicePaginatedResponseBackend
} from "../types";

export const mapInvoiceToFrontend = (data: IInvoiceBackend): IInvoice => ({
	paymentId: data.payment_id,
	orderId: data.order_id,
	issueDate: data.issue_date,
	amount: data.amount,
	paidAmount: data.paid_amount,
	status: data.status
});

export const mapInvoiceDetailToFrontend = (
	data: IInvoiceDetailBackend
): IInvoiceDetail => ({
	...mapInvoiceToFrontend(data),
	dueDate: data.due_date,
	remainingAmount: data.remaining_amount,
	currency: data.currency,
	billingInfo: {
		company: data.billing_info.company,
		address: data.billing_info.address,
		contact: data.billing_info.contact,
		email: data.billing_info.email,
		phone: data.billing_info.phone
	},
	bookingInfo: {
		tour: data.booking_info.tour,
		pax: data.booking_info.pax,
		dates: data.booking_info.dates,
		duration: data.booking_info.duration
	},
	payments: data.payments.map((p) => ({
		no: p.no,
		amount: p.amount,
		date: p.date,
		file: p.file
			? {
					url: p.file.url,
					fileName: p.file.file_name
				}
			: undefined
	})),
	file: data.export_file
		? {
				url: data.export_file.url,
				fileName: data.export_file.file_name
			}
		: undefined
});

export const mapInvoiceListToFrontend = (data: IInvoiceBackend[]): IInvoice[] =>
	data.map(mapInvoiceToFrontend);

export const mapInvoicePaginatedToFrontend = (
	response: IInvoicePaginatedResponseBackend
): IInvoicePaginatedResponse => ({
	data: mapInvoiceListToFrontend(response.data),
	total: response.total,
	statusCounts: response.status_counts
});

export const mapInvoiceFiltersToBackend = (filters: IInvoiceFilters) => ({
	page: filters.page,
	limit: filters.limit,
	search: filters.search || undefined,
	status: filters.status.length > 0 ? filters.status.join(",") : undefined
});

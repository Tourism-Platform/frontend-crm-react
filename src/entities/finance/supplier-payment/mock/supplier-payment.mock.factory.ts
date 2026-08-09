import { EventTypes, type SupplierPaymentResponse } from "@/shared/api";

import { bookingOrderListItems } from "@/entities/booking/order/mock/booking-order.store";

import { registerSupplierPaymentMockDisplay } from "./supplier-payment.mock-display";
import {
	MOCK_SUPPLIER_PAYMENT_DEFAULTS,
	buildEventUuid,
	buildSupplierPaymentUuid
} from "./supplier-payment.mock.constants";
import { SUPPLIER_PAYMENT_SEED } from "./supplier-payment.seed";

export interface ISupplierPaymentMockDisplay {
	component: string;
	type: string;
	supplier: string;
	manager: string;
}

export interface ISupplierPaymentMockBundle {
	payments: SupplierPaymentResponse[];
	displayById: Map<string, ISupplierPaymentMockDisplay>;
}

export const createSupplierPaymentMocks = (): ISupplierPaymentMockBundle => {
	const payments: SupplierPaymentResponse[] = [];
	const displayById = new Map<string, ISupplierPaymentMockDisplay>();

	SUPPLIER_PAYMENT_SEED.forEach((row, index) => {
		const booking =
			bookingOrderListItems[index % bookingOrderListItems.length];
		const id = buildSupplierPaymentUuid(index + 1);
		const amount = String(row.amount);
		const rate = MOCK_SUPPLIER_PAYMENT_DEFAULTS.rate;

		payments.push({
			order_number: booking.order_number ?? "",
			event_name: row.component,
			event_typ: row.type as EventTypes,
			supplier_name: row.supplier,
			payment_id: id,
			operator_id: MOCK_SUPPLIER_PAYMENT_DEFAULTS.operator_id,
			booking_id: booking.id,
			event_id: buildEventUuid(index + 1),
			supplier_id: `sup-${String(index + 1).padStart(4, "0")}`,
			amount,
			currency: MOCK_SUPPLIER_PAYMENT_DEFAULTS.currency,
			rate,
			base_amount: amount,
			file: row.file ?? null,
			file_name: row.file ? (row.file.split("/").pop() ?? null) : null,
			note: row.note ?? null,
			status: row.status,
			paid_at: row.paid_at ?? null
		});

		const display = {
			component: row.component,
			type: row.type,
			supplier: row.supplier,
			manager: row.manager
		};
		displayById.set(id, display);
		registerSupplierPaymentMockDisplay(id, display);
	});

	return { payments, displayById };
};

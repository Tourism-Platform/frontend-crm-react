import type { ISupplierPaymentMockDisplay } from "./supplier-payment.mock.factory";

const displayById = new Map<string, ISupplierPaymentMockDisplay>();

export const registerSupplierPaymentMockDisplay = (
	id: string,
	display: ISupplierPaymentMockDisplay
): void => {
	displayById.set(id, display);
};

export const getSupplierPaymentMockDisplay = (
	paymentId: string
): ISupplierPaymentMockDisplay | undefined => displayById.get(paymentId);

export const resetSupplierPaymentMockDisplay = (
	entries: Map<string, ISupplierPaymentMockDisplay>
): void => {
	displayById.clear();
	entries.forEach((display, id) => displayById.set(id, display));
};

export const buildReconciliationBookingUuid = (index: number): string => {
	const hex = index.toString(16).padStart(4, "0");
	return `b300${hex}-0000-4000-8000-000000000001`;
};

/** Matches supplier-payment mock ids so modal getSupplierPayment resolves. */
export const buildLinkedSupplierPaymentUuid = (index: number): string => {
	const hex = index.toString(16).padStart(4, "0");
	return `s200${hex}-0000-4000-8000-000000000001`;
};

export const buildLinkedEventUuid = (index: number): string => {
	const hex = index.toString(16).padStart(4, "0");
	return `e200${hex}-0000-4000-8000-000000000001`;
};

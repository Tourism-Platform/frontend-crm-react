export interface IEventVarianceLine {
	eventId: string;
	paymentId: string | null;
	eventName: string;
	date: string;
	plannedMin: number;
	plannedMax: number;
	accrued: number;
	settled: number;
	payable: number;
	variance: number;
}

export interface IBookingVariance {
	bookingId: string;
	orderId: string;
	currency: string;
	plannedTotalMin: number;
	plannedTotalMax: number;
	accruedTotal: number;
	settledTotal: number;
	varianceTotal: number;
	events: IEventVarianceLine[];
}

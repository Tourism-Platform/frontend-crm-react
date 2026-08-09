export interface IBookingFinancials {
	bookingId: string;
	orderId: string;
	currency: string;
	plannedRevenue: number;
	plannedCost: number;
	plannedProfit: number;
	revenueAccrued: number;
	revenueSettled: number;
	receivable: number;
	costAccrued: number;
	costSettled: number;
	payable: number;
	accrualProfit: number;
	settledProfit: number;
}

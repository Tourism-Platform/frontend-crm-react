export interface ITourStatRange {
	min: string;
	max: string;
}

export interface ITourStatistics {
	totalOrders: number;
	completed: number;
	inProgress: number;
	tourists: number;
	estimatedRevenue: ITourStatRange;
	confirmedRevenue: ITourStatRange;
	unconfirmedRevenue: ITourStatRange;
	currency: string;
}

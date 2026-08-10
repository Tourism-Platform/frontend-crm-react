export interface IPaginationRequest {
	page: number;
	limit: number;
	search?: string;
	status?: string;
}

export interface IPaginationResponse<T> {
	data: T[];
	total: number;
}

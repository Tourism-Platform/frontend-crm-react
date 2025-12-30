export interface IBusinessDocument {
	id: string;
	name: string;
	size: number;
	type: string;
	url: string;
}

export interface IBusinessDocumentsResponse {
	documents: IBusinessDocument[];
}

import type { IPaginationRequest } from "@/shared/types";

export interface IOption {
	id: string;
	tourMetaId: string | null;
	name: string;
	description: string;
	imageUrl: string;
}

export interface IListTourOptionsArgs extends IPaginationRequest {
	tourId: string;
}

export interface IOptionFormPayload {
	name: string;
	description: string;
}

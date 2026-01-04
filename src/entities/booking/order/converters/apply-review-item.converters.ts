import {
	type IApplyReviewItemBackend,
	type IApplyReviewItemRequest
} from "../types";

export const mapApplyReviewItemToBackend = (
	data: IApplyReviewItemRequest
): IApplyReviewItemBackend => ({
	id: data.id,
	parent_id: data.parentId
});

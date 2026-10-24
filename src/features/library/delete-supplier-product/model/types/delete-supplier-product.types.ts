import type {
	TActivityProductEditPageKeys,
	TBusProductEditPageKeys,
	TFlightProductEditPageKeys,
	THotelProductEditPageKeys,
	TSupplierIdPageKeys,
	TTrainProductEditPageKeys,
	TTransferProductEditPageKeys
} from "@/shared/config";

export type TDeleteProductNs =
	| "hotel_product_edit_page"
	| "train_product_edit_page"
	| "flight_product_edit_page"
	| "bus_product_edit_page"
	| "transfer_product_edit_page"
	| "activity_product_edit_page"
	| "supplier_id_page";

export type TProductDeleteKeys =
	| THotelProductEditPageKeys
	| TTrainProductEditPageKeys
	| TFlightProductEditPageKeys
	| TBusProductEditPageKeys
	| TTransferProductEditPageKeys
	| TActivityProductEditPageKeys
	| TSupplierIdPageKeys;

export interface IProductDeleteKeys {
	title: TProductDeleteKeys;
	warning: TProductDeleteKeys;
	decline: TProductDeleteKeys;
	confirm: TProductDeleteKeys;
	confirming: TProductDeleteKeys;
	success: TProductDeleteKeys;
	error: TProductDeleteKeys;
}

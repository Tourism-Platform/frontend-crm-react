import type { IProductDeleteKeys, TDeleteProductNs } from "../types";

/** Страницы редактирования продукта держат диалог удаления под `menu.delete` */
const PRODUCT_EDIT_PAGE_DELETE_KEYS: IProductDeleteKeys = {
	title: "menu.delete.form.title",
	warning: "menu.delete.form.warning",
	decline: "menu.delete.form.buttons.decline",
	confirm: "menu.delete.form.buttons.confirm",
	confirming: "menu.delete.form.buttons.confirming",
	success: "menu.delete.form.toasts.success",
	error: "menu.delete.form.toasts.error"
};

export const PRODUCT_DELETE_KEYS: Record<TDeleteProductNs, IProductDeleteKeys> =
	{
		hotel_product_edit_page: PRODUCT_EDIT_PAGE_DELETE_KEYS,
		train_product_edit_page: PRODUCT_EDIT_PAGE_DELETE_KEYS,
		flight_product_edit_page: PRODUCT_EDIT_PAGE_DELETE_KEYS,
		bus_product_edit_page: PRODUCT_EDIT_PAGE_DELETE_KEYS,
		transfer_product_edit_page: PRODUCT_EDIT_PAGE_DELETE_KEYS,
		activity_product_edit_page: PRODUCT_EDIT_PAGE_DELETE_KEYS,
		supplier_id_page: {
			title: "products.menu.delete.form.title",
			warning: "products.menu.delete.form.warning",
			decline: "products.menu.delete.form.buttons.decline",
			confirm: "products.menu.delete.form.buttons.confirm",
			confirming: "products.menu.delete.form.buttons.confirming",
			success: "products.menu.delete.form.toasts.success",
			error: "products.menu.delete.form.toasts.error"
		}
	};

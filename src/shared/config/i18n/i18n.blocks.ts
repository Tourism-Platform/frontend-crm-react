interface ITranslationBlock {
	folder: string;
	namespaces: string[];
}

export const TRANSLATION_BLOCKS: Record<string, ITranslationBlock> = {
	// Блок настроек
	settings: {
		folder: "settings",
		namespaces: [
			"security_page",
			"account_settings_page",
			"business_settings_page",
			"staff_information_page",
			"financial_settings_page"
		]
	},
	// Блок туров
	tours: {
		folder: "tours",
		namespaces: [
			"tours_page",
			"tour_overview_page",
			"tour_schedule_page",
			"tour_order_history_page",
			"tour_itinerary_page",
			"tour_activity_log_page",
			"tour_pricing_review_page"
		]
	},
	// Блок событий тура
	events: {
		folder: "tours/events",
		namespaces: [
			"flight_edit_page",
			"transportation_edit_page",
			"event_edit_page",
			"accommodation_edit_page",
			"information_edit_page",
			"tour_details_edit_page",
			"multiply_option_edit_page",
			"common_events"
		]
	},

	finance: {
		folder: "finance",
		namespaces: [
			"client_payments_page",
			"invoices_page",
			"invoice_id_page",
			"supplier_payments_page",
			"reconciliation_page",
			"reconciliation_id_page"
		]
	},

	booking: {
		folder: "booking",
		namespaces: ["orders_page", "order_id_page"]
	},

	shared: {
		folder: "", // пустая строка = корень
		namespaces: ["header", "sidebar", "home", "common", "login_page"]
	}
};

export const getNamespacePath = (lng: string, ns: string): string => {
	for (const block of Object.values(TRANSLATION_BLOCKS)) {
		if (block.namespaces.includes(ns)) {
			return block.folder
				? `/locales/${lng}/${block.folder}/${ns}.json`
				: `/locales/${lng}/${ns}.json`;
		}
	}

	// Fallback для неизвестных namespace
	console.warn(`Unknown namespace: ${ns}, using root path`);
	return `/locales/${lng}/${ns}.json`;
};

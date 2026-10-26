/** URL wire-format: location + dates (used on /tours/search and catalog) */
export type TTourSearchLocationQuery = {
	city?: string;
	country?: string;
	place?: string;
	checkIn?: string;
	checkOut?: string;
};

/** URL wire-format: preview tour/option pages (price currency) */
export type TPreviewTourQuery = {
	currency?: string;
};

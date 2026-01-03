import { format } from "date-fns";
import { enUS } from "date-fns/locale";

export const formatDate = (date: string | Date | undefined): string => {
	if (!date) return "";
	const d = new Date(date);
	if (isNaN(d.getTime())) return String(date);

	const day = String(d.getDate()).padStart(2, "0");
	const month = String(d.getMonth() + 1).padStart(2, "0");
	const year = d.getFullYear();

	return `${day}/${month}/${year}`;
};

export const formatDateTime = (date: string | Date | undefined): string => {
	if (!date) return "";
	const d = new Date(date);
	if (isNaN(d.getTime())) return String(date);

	// Format: "28 aug. 2025, 14:40 PM"
	// date-fns format: "d MMM. yyyy, HH:mm a"
	// we need lowercase month and specific dot usage
	const formatted = format(d, "d MMM. yyyy, HH:mm a", { locale: enUS });
	return formatted.replace(/([A-Z][a-z]{2})/, (match) => match.toLowerCase());
};

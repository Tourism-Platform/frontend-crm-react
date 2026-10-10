import { useTranslation } from "react-i18next";

import { useConfirm } from "@/shared/ui";

/**
 * Asks before switching the pricing method: the supplier spec is replaced as
 * a whole on save, so prices of the old method are lost (fe6.4 §7).
 */
export const useConfirmPricingChange = () => {
	const { t } = useTranslation("common_events");
	const confirm = useConfirm();

	return () =>
		confirm({
			title: t("confirm.pricing_type.title"),
			description: t("confirm.pricing_type.description"),
			confirmLabel: t("confirm.action"),
			destructive: true
		});
};

/** Asks before removing the last car / room: its photos are deleted (fe6.4 §6). */
export const useConfirmRemoveLastNode = () => {
	const { t } = useTranslation("common_events");
	const confirm = useConfirm();

	return () =>
		confirm({
			title: t("confirm.remove_last_node.title"),
			description: t("confirm.remove_last_node.description"),
			confirmLabel: t("confirm.remove"),
			destructive: true
		});
};

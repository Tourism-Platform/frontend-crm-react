import type { FC } from "react";
import { useTranslation } from "react-i18next";

import { TRUST_ITEMS_LIST } from "../../model";
import type { TTrustItem } from "../../model";

import { TrustItemCard } from "./trust-item-card";

export const TrustSection: FC = () => {
	const { t } = useTranslation("main");
	const items = t("trust.items", { returnObjects: true }) as TTrustItem[];

	return (
		<section className="bg-muted/30 py-8">
			<div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
				{items.map((item, index) => (
					<TrustItemCard
						key={item.name}
						icon={TRUST_ITEMS_LIST[index].icon}
						name={item.name}
						desc={item.desc}
					/>
				))}
			</div>
		</section>
	);
};

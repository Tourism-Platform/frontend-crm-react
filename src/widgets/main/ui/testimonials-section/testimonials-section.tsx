import type { FC } from "react";
import { useTranslation } from "react-i18next";

import type { TTestimonialItem } from "../../model";
import { SectionHeader } from "../section-header";

import { TestimonialCard } from "./testimonial-card";

export const TestimonialsSection: FC = () => {
	const { t } = useTranslation("main");
	const items = t("testimonials.items", {
		returnObjects: true
	}) as TTestimonialItem[];

	return (
		<section className="bg-background px-4 py-16">
			<SectionHeader
				eyebrow={t("testimonials.eyebrow")}
				title={t("testimonials.title")}
				subtitle={t("testimonials.subtitle")}
			/>

			<div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
				{items.map((item) => (
					<TestimonialCard
						key={item.name}
						tag={item.tag}
						quote={item.quote}
						name={item.name}
						role={item.role}
					/>
				))}
			</div>
		</section>
	);
};

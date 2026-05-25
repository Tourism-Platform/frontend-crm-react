import { type FC, useCallback, useRef, useState } from "react";

import type { TAudienceTabId } from "../model";

import { AudienceSection } from "./audience-section/audience-section";
import { FinalCtaSection } from "./final-cta-section/final-cta-section";
import { HeroSection } from "./hero-section/hero-section";
import { HowItWorksSection } from "./how-it-works-section/how-it-works-section";
import { NetworkSection } from "./network-section/network-section";
import { ProblemSection } from "./problem-section/problem-section";
import { TestimonialsSection } from "./testimonials-section/testimonials-section";
import { TrustSection } from "./trust-section/trust-section";

interface IMainProps {
	onNavigateCta: () => void;
}

export const Main: FC<IMainProps> = ({ onNavigateCta }) => {
	const [activeAudience, setActiveAudience] =
		useState<TAudienceTabId>("operator");
	const audienceRef = useRef<HTMLElement>(null);

	const handleAudienceCta = useCallback((audience: TAudienceTabId) => {
		setActiveAudience(audience);
		setTimeout(() => {
			audienceRef.current?.scrollIntoView({
				behavior: "smooth",
				block: "start"
			});
		}, 50);
	}, []);

	return (
		<div className="flex flex-col">
			<HeroSection onAudienceCta={handleAudienceCta} />
			<TrustSection />
			<ProblemSection />
			<AudienceSection
				activeTab={activeAudience}
				onTabChange={setActiveAudience}
				sectionRef={audienceRef}
			/>
			<NetworkSection />
			<HowItWorksSection />
			<TestimonialsSection />
			<FinalCtaSection
				onAudienceCta={handleAudienceCta}
				onNavigateCta={onNavigateCta}
			/>
		</div>
	);
};

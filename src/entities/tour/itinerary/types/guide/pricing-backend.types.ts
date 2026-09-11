import type {
	GuideByLanguageCategoryInput,
	GuideByLanguageCategoryOutput,
	GuideDetailsOutput,
	GuideTypeTier
} from "@/shared/api";

export type TGuideDetailsBackend = GuideDetailsOutput;
export type TGuideByLanguageCategoryBackend = GuideByLanguageCategoryOutput;
export type TGuideByLanguageCategoryInputBackend = GuideByLanguageCategoryInput;
export type TGuideCategoryChargeInputBackend = NonNullable<
	GuideByLanguageCategoryInput["expenses"]
>;
export type TGuideTypeTierBackend = GuideTypeTier;

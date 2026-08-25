import type {
	GuideByLanguageCategoryInput,
	GuideByLanguageCategoryOutput,
	GuideDetailsOutput
} from "@/shared/api";

export type TGuideDetailsBackend = GuideDetailsOutput;
export type TGuideByLanguageCategoryBackend = GuideByLanguageCategoryOutput;
export type TGuideByLanguageCategoryInputBackend = GuideByLanguageCategoryInput;
export type TGuideCategoryChargeInputBackend = NonNullable<
	GuideByLanguageCategoryInput["expenses"]
>;

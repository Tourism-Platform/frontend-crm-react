import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	ENUM_FORM_LANDING,
	ENUM_LANGUAGES,
	LANGUAGES_LABELS,
	type TLandingSchema
} from "@/entities/tour";

interface ILanguagesInfoProps {
	form: UseFormReturn<TLandingSchema>;
}

export const LanguagesInfo: FC<ILanguagesInfoProps> = ({ form }) => {
	const { t } = useTranslation("landing_page");
	const { watch, setValue, control } = form;
	const selectedLanguages =
		(watch(
			ENUM_FORM_LANDING.LANGUAGES
		) as (typeof ENUM_LANGUAGES)[keyof typeof ENUM_LANGUAGES][]) || [];

	const toggleLanguage = (
		value: (typeof ENUM_LANGUAGES)[keyof typeof ENUM_LANGUAGES]
	) => {
		const newSelected = selectedLanguages.includes(value)
			? selectedLanguages.filter((l) => l !== value)
			: [...selectedLanguages, value];
		setValue(ENUM_FORM_LANDING.LANGUAGES, newSelected, {
			shouldValidate: true
		});
	};

	const languagesOptions = useValueToTranslateLabel(LANGUAGES_LABELS);

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-lg ">{t("blocks.languages.title")}</h3>
			<p className="text-sm text-muted-foreground">
				{t("blocks.languages.description")}
			</p>
			<FormField
				control={control}
				name={ENUM_FORM_LANDING.LANGUAGES}
				render={() => (
					<FormItem className="flex flex-col gap-2">
						<FormLabel className="hidden">
							{t("blocks.languages.fields.languages.label")}
						</FormLabel>
						<div className="flex flex-wrap gap-2">
							{languagesOptions.map((lang) => (
								<Button
									key={lang.value}
									type="button"
									variant={
										selectedLanguages.includes(
											lang.value as (typeof ENUM_LANGUAGES)[keyof typeof ENUM_LANGUAGES]
										)
											? "outlineActive"
											: "outline"
									}
									onClick={() =>
										toggleLanguage(
											lang.value as (typeof ENUM_LANGUAGES)[keyof typeof ENUM_LANGUAGES]
										)
									}
								>
									{lang.label}
								</Button>
							))}
						</div>
						<FormMessage t={t} />
					</FormItem>
				)}
			/>
		</div>
	);
};

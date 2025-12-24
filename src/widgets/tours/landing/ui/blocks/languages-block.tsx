import { type FC } from "react";
import { useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/shared/ui";

import { ENUM_FORM_LANDING, LANGUAGES_OPTIONS } from "../../model";

export const LanguagesBlock: FC = () => {
	const { t } = useTranslation("landing_page");
	const { watch, setValue, control } = useFormContext();
	const selectedLanguages: string[] =
		watch(ENUM_FORM_LANDING.LANGUAGES) || [];

	const toggleLanguage = (value: string) => {
		const newSelected = selectedLanguages.includes(value)
			? selectedLanguages.filter((l) => l !== value)
			: [...selectedLanguages, value];
		setValue(ENUM_FORM_LANDING.LANGUAGES, newSelected, {
			shouldValidate: true
		});
	};

	return (
		<div className="flex flex-col gap-4">
			<h3 className="text-lg font-medium">
				{t("blocks.languages.title")}
			</h3>
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
							{LANGUAGES_OPTIONS.map((lang) => (
								<Button
									key={lang.value}
									type="button"
									variant={
										selectedLanguages.includes(lang.value)
											? "default"
											: "outline"
									}
									className={
										selectedLanguages.includes(lang.value)
											? "bg-sky-100 text-sky-600 hover:bg-sky-200 border-sky-200"
											: ""
									}
									onClick={() => toggleLanguage(lang.value)}
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

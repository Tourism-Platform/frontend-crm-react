import { hasFlag } from "country-flag-icons";
import * as Flags from "country-flag-icons/react/3x2";
import { type FC, type JSX, useId } from "react";
import { useTranslation } from "react-i18next";

import {
	ENUM_LANGUAGES,
	type ENUM_LANGUAGES_TYPE,
	LANGUAGES_LIST,
	changeLanguage,
	i18nLanguageMapper
} from "@/shared/config";
import { cn } from "@/shared/lib";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	buttonVariants
} from "@/shared/ui";

import { mapLocaleToFlagCountry } from "../lib/map-locale-to-flag-country";

type TFlagComponent = (props: {
	title?: string;
	className?: string;
}) => JSX.Element;

function LocaleFlag({ code, title }: { code: string; title?: string }) {
	const country = mapLocaleToFlagCountry(code);
	if (!hasFlag(country)) return null;

	const Flag = Flags[country as keyof typeof Flags] as
		| TFlagComponent
		| undefined;
	if (!Flag) return null;

	return (
		<span className="flex h-3.5 w-5 shrink-0 overflow-hidden rounded-sm bg-foreground/10">
			<Flag className="size-full" title={title ?? country} />
		</span>
	);
}

export const LanguageToggle: FC = () => {
	const id = useId();
	const { i18n } = useTranslation();
	const locale = i18nLanguageMapper.to(i18n.language) ?? ENUM_LANGUAGES.EN;
	const activeCode = locale.toUpperCase();

	return (
		<Select
			value={locale}
			onValueChange={(value) => {
				changeLanguage(value as ENUM_LANGUAGES_TYPE);
			}}
		>
			<SelectTrigger
				id={`language-${id}`}
				className={cn(
					buttonVariants({ variant: "outline", size: "sm" }),
					"h-8 w-auto gap-1.5 px-2.5 shadow-xs hover:bg-primary/10",
					"[&>svg]:size-4 [&>svg]:shrink-0 [&>svg]:opacity-50"
				)}
				aria-label="Select language"
			>
				<LocaleFlag code={locale} title={activeCode} />
				<span className="text-sm font-medium uppercase">
					{activeCode}
				</span>
			</SelectTrigger>

			<SelectContent className="[&_*[role=option]]:ps-2 [&_*[role=option]]:pe-8 [&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2">
				{LANGUAGES_LIST.map((language) => (
					<SelectItem key={language.value} value={language.value}>
						<span className="flex items-center gap-2">
							<LocaleFlag
								code={language.value}
								title={language.label}
							/>
							<span className="truncate">{language.label}</span>
						</span>
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
};

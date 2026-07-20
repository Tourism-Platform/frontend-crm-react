// AUTO-GENERATED — не редактировать вручную
// Сгенерировано скриптом scripts/generate-api-paths.ts

export const TRANSLATIONS_PATHS = {
	regenerateTourTranslations: (tourId: string) =>
		({
			url: `/tour/computed/i18n/tour/${tourId}/regenerate`,
			method: "POST",
			_types: {} as {
				body: void;
				query: { force?: boolean };
				response: void;
			}
		}) as const
} as const;

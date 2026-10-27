import { LanguagesIcon, RefreshCwIcon } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

import { LoaderButton, requestConfirm, withErrorBoundary } from "@/shared/ui";

import { useRegenerateTourTranslationsMutation } from "@/entities/tour";

const TranslationsInfoBase: FC = () => {
	const { t } = useTranslation("tour_settings_page");
	const { tourId = "" } = useParams<{ tourId: string }>();
	const [regenerate, { isLoading, originalArgs }] =
		useRegenerateTourTranslationsMutation();
	// Мутация общая — лоадер показываем на той кнопке, которую нажали
	const isForcing = isLoading && !!originalArgs?.force;

	const run = async (force: boolean) => {
		if (!tourId) return;
		try {
			const result = await regenerate({ tourId, force }).unwrap();
			toast.success(
				t("general.translations.toasts.success", {
					events: result.eventsScheduled,
					languages: result.targetLanguages
				})
			);
		} catch (error) {
			toast.error(t("general.translations.toasts.error"));
			console.error("Failed to regenerate translations:", error);
		}
	};

	const handleForce = async () => {
		const confirmed = await requestConfirm({
			title: t("general.translations.force.confirm.title"),
			description: t("general.translations.force.confirm.description"),
			confirmLabel: t("general.translations.force.confirm.confirm"),
			destructive: true
		});
		if (confirmed) await run(true);
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex flex-col gap-1">
				<h3 className="text-base font-medium">
					{t("general.translations.title")}
				</h3>
				<p className="text-sm text-muted-foreground">
					{t("general.translations.description")}
				</p>
			</div>
			<div className="grid gap-3 md:grid-cols-2">
				<div className="flex flex-col gap-3 rounded-lg border p-4">
					<div className="flex items-start gap-3">
						<LanguagesIcon className="mt-0.5 size-5 shrink-0 text-primary" />
						<p className="text-sm text-muted-foreground">
							{t("general.translations.actions.regenerate_hint")}
						</p>
					</div>
					<LoaderButton
						type="button"
						className="self-start"
						onClick={() => run(false)}
						isLoading={isLoading && !isForcing}
						disabled={!tourId || isLoading}
						icon={<LanguagesIcon className="h-4 w-4" />}
						label={t("general.translations.actions.regenerate")}
						loadingLabel={t(
							"general.translations.actions.regenerating"
						)}
					/>
				</div>
				<div className="flex flex-col gap-3 rounded-lg border border-destructive/30 p-4">
					<div className="flex items-start gap-3">
						<RefreshCwIcon className="mt-0.5 size-5 shrink-0 text-destructive" />
						<p className="text-sm text-muted-foreground">
							{t("general.translations.actions.force_hint")}
						</p>
					</div>
					<LoaderButton
						type="button"
						variant="outline"
						className="self-start border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive"
						onClick={handleForce}
						isLoading={isForcing}
						disabled={!tourId || isLoading}
						icon={<RefreshCwIcon className="h-4 w-4" />}
						label={t("general.translations.actions.force")}
						loadingLabel={t(
							"general.translations.actions.regenerating"
						)}
					/>
				</div>
			</div>
		</div>
	);
};

export const TranslationsInfo = withErrorBoundary(TranslationsInfoBase);

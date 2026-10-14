import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button, LoaderButton, requestConfirm } from "@/shared/ui";

import { useRegenerateTourTranslationsMutation } from "@/entities/tour";

interface IRegenerateTranslationsButtonProps {
	tourId: string;
}

export const RegenerateTranslationsButton: FC<
	IRegenerateTranslationsButtonProps
> = ({ tourId }) => {
	const { t } = useTranslation("tour_settings_page");
	const [regenerate, { isLoading }] = useRegenerateTourTranslationsMutation();

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
			<div className="flex flex-wrap gap-2">
				<LoaderButton
					type="button"
					variant="outline"
					onClick={() => run(false)}
					isLoading={isLoading}
					disabled={!tourId}
					label={t("general.translations.actions.regenerate")}
					loadingLabel={t(
						"general.translations.actions.regenerating"
					)}
				/>
				<Button
					type="button"
					variant="ghost"
					onClick={handleForce}
					disabled={!tourId || isLoading}
				>
					{t("general.translations.actions.force")}
				</Button>
			</div>
		</div>
	);
};

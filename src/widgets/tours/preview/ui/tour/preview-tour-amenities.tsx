import { CheckCircleIcon, CloseCircleIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Card, withErrorBoundary } from "@/shared/ui";

import { type IPreviewTourData } from "@/entities/tour";

interface IPreviewTourAmenitiesProps {
	data?: IPreviewTourData;
}

/**
 * Что включено и не включено — две карточки рядом. Отметки: включено — зелёные (`emerald-500`,
 * токена «успех» в теме нет, так же в `preview-booking`), не включено — цвет ошибки темы
 */
const PreviewTourAmenitiesBase: FC<IPreviewTourAmenitiesProps> = ({ data }) => {
	const { t } = useTranslation("preview_tour_page");

	if (!data) return null;

	return (
		<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
			<Card variant="glass" className="gap-4 px-6">
				<h2 className="flex items-center gap-2.5 text-lg font-semibold">
					<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
						<CheckCircleIcon className="size-5" />
					</span>
					{t("sections.included.title")}
				</h2>
				<ul className="flex flex-col gap-2.5">
					{data.included.map((item) => (
						<li
							key={item}
							className="flex items-start gap-2.5 text-sm"
						>
							<CheckCircleIcon className="mt-px size-4.5 shrink-0 text-emerald-500" />
							{item}
						</li>
					))}
				</ul>
			</Card>
			<Card variant="glass" className="gap-4 px-6">
				<h2 className="flex items-center gap-2.5 text-lg font-semibold">
					<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
						<CloseCircleIcon className="size-5" />
					</span>
					{t("sections.not_included.title")}
				</h2>
				<ul className="flex flex-col gap-2.5">
					{data.not_included.map((item) => (
						<li
							key={item}
							className="flex items-start gap-2.5 text-sm"
						>
							<CloseCircleIcon className="mt-px size-4.5 shrink-0 text-destructive" />
							{item}
						</li>
					))}
				</ul>
			</Card>
		</div>
	);
};

export const PreviewTourAmenities = withErrorBoundary(PreviewTourAmenitiesBase);

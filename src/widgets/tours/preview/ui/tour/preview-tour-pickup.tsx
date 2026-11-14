import { MapPointWaveIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Badge, Card, Previewer, withErrorBoundary } from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import { type IPreviewTourData, PICKUP_TYPE_LABELS } from "@/entities/tour";

import { PICKUP_ICONS } from "../../model/config/pickup.config";

interface IPreviewTourPickupProps {
	data?: IPreviewTourData;
}

const PreviewTourPickupBase: FC<IPreviewTourPickupProps> = ({ data }) => {
	const { t } = useTranslation("preview_tour_page");
	const pickupLabels = useValueToTranslateLabel(PICKUP_TYPE_LABELS);

	if (!data) return null;

	const getLabel = (
		value: string,
		labels: { value: string; label: string }[]
	) => labels.find((l) => l.value === value)?.label ?? value;

	return (
		<Card variant="glass" className="gap-4 px-6">
			<h2 className="flex items-center gap-2.5 text-lg font-semibold">
				<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
					<MapPointWaveIcon className="size-5" />
				</span>
				{t("sections.meeting_pickup.title")}
			</h2>

			<div className="flex flex-wrap gap-2">
				{data.pickup_type.map((type) => {
					const Icon = PICKUP_ICONS[type];
					return (
						<Badge
							key={type}
							variant="secondary"
							size="md"
							className="gap-2"
						>
							{Icon && <Icon className="size-4 text-primary" />}
							{getLabel(type, pickupLabels)}
						</Badge>
					);
				})}
			</div>

			<div className="flex flex-col gap-1.5 rounded-lg bg-muted/40 p-4">
				<span className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
					{t("sections.meeting_pickup.pickup_details")}
				</span>
				<Previewer text={data.pickup_description} />
			</div>
		</Card>
	);
};

export const PreviewTourPickup = withErrorBoundary(PreviewTourPickupBase);

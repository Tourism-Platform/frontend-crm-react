import { ArrowRight, Bed } from "lucide-react";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { withErrorBoundary } from "@/shared/ui";

import type {
	IOptionEvent,
	ISubOption
} from "@/entities/tour/preview-tour/types";

import { OptionEventDetailSheet } from "./option-event-detail-sheet";

interface IOptionEventOptionsCardProps {
	event: IOptionEvent;
	index: number;
}

const OptionEventOptionsCardBase: FC<IOptionEventOptionsCardProps> = ({
	event,
	index
}) => {
	const { t } = useTranslation("preview_option_page");
	const [sheetOpen, setSheetOpen] = useState(false);
	const [selectedSubOption, setSelectedSubOption] =
		useState<ISubOption | null>(null);

	const isReversed = index % 2 !== 0;

	const handleViewDetails = (subOption: ISubOption) => {
		setSelectedSubOption(subOption);
		setSheetOpen(true);
	};

	return (
		<>
			<div className="grid grid-cols-2 gap-0 bg-white rounded-xl border overflow-hidden shadow-sm">
				<div
					className={`${isReversed ? "order-2" : "order-1"} flex flex-col gap-4 p-6`}
				>
					<div className="flex items-center gap-3">
						<div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
							<Bed className="w-5 h-5 text-primary" />
						</div>
						<h4 className="font-semibold">
							{event.title} {t("sections.option.one_of_them")}
						</h4>
					</div>

					<p className="text-sm text-muted-foreground leading-relaxed">
						{event.description}
					</p>

					<div className="flex flex-col gap-3">
						{event.sub_options?.map((subOption, subIndex) => (
							<div
								key={subOption.id}
								className="border rounded-lg p-4 flex flex-col gap-2"
							>
								<h5 className="font-semibold text-sm">
									{subOption.title}
								</h5>
								<p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
									{subOption.description}
								</p>
								{subIndex <
								(event.sub_options?.length ?? 0) - 1 ? (
									<button
										type="button"
										onClick={() =>
											handleViewDetails(subOption)
										}
										className="text-xs text-primary hover:underline underline-offset-4 w-fit flex items-center gap-1"
									>
										{t("sections.option.view_details")}{" "}
										<ArrowRight className="w-3 h-3" />
									</button>
								) : (
									<button
										type="button"
										onClick={() =>
											handleViewDetails(subOption)
										}
										className="text-xs text-primary hover:underline underline-offset-4 w-fit font-medium flex items-center gap-1"
									>
										{t("sections.option.details")}{" "}
										<ArrowRight className="w-3 h-3" />
									</button>
								)}
							</div>
						))}
					</div>
				</div>

				<div className={`${isReversed ? "order-1" : "order-2"}`}>
					<img
						src={event.image}
						alt={event.title}
						className="w-full h-full min-h-[240px] object-cover"
					/>
				</div>
			</div>

			{selectedSubOption && (
				<OptionEventDetailSheet
					open={sheetOpen}
					onOpenChange={setSheetOpen}
					title={selectedSubOption.title}
					image={selectedSubOption.image}
					description={selectedSubOption.full_description}
				/>
			)}
		</>
	);
};

export const OptionEventOptionsCard = withErrorBoundary(
	OptionEventOptionsCardBase
);

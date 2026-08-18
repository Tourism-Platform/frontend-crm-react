import { type FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import { Button, CustomField, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_EVENT,
	ENUM_SUPPLEMENT_PRICING_FIELD,
	useEventEditIds,
	useListPackagesQuery
} from "@/entities/tour";

import { buildPackageCreateRoute } from "@/features/tours";

import { ENUM_FORM_SECTION, type ISlotProps } from "../../model";

const InvoicingPartBase: FC<ISlotProps> = ({ form }) => {
	const { t } = useTranslation("supplement_edit_page");
	const { tourId, optionId, eventId, eventOptionId } = useEventEditIds();
	const { data: packages = [] } = useListPackagesQuery(
		{ tourId, optionId },
		{ skip: !tourId || !optionId }
	);

	const options = useMemo(
		() =>
			packages.map((item) => ({
				label: item.name,
				value: item.id
			})),
		[packages]
	);

	return (
		<div className="grid gap-1">
			<h3 className="text-lg">{t("form.pricing.form.package.title")}</h3>
			<div className="grid grid-cols-2 mb-8 items-end gap-5">
				<CustomField
					control={form.control}
					name={`${ENUM_FORM_SECTION.PRICING}.${ENUM_SUPPLEMENT_PRICING_FIELD.PACKAGE_ID}`}
					label="form.pricing.form.package.fields.package.label"
					placeholder="form.pricing.form.package.fields.package.placeholder"
					fieldType="select"
					options={options}
					t={t}
				/>
				<div className="flex justify-start">
					<Button variant="outline" className="mb-5" asChild>
						<Link
							to={buildPackageCreateRoute({
								tourId,
								optionId,
								fromEventId: eventId,
								fromEventType: ENUM_EVENT.SUPPLEMENT,
								fromEventOptionId: eventOptionId || undefined
							})}
						>
							{t("form.pricing.form.package.buttons.create")}
						</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export const InvoicingPart = withErrorBoundary(InvoicingPartBase);

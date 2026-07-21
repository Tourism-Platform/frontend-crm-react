import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_GUIDES,
	ENUM_GUIDE_TYPE,
	type TGuideEditSchema
} from "@/entities/tour";

import { ENUM_FORM_SECTION } from "../../model";

import { GuidesCard } from "./guides-card";

interface IGuidesDetailsProps {
	form: UseFormReturn<TGuideEditSchema>;
}

const GuidesDetailsBase: FC<IGuidesDetailsProps> = ({ form }) => {
	const { t } = useTranslation("guide_edit_page");

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.GUIDES}.${ENUM_FORM_GUIDES.GUIDES_LIST}`
	});

	const handleAddGuide = () => {
		append({
			[ENUM_FORM_GUIDES.GUIDE_TYPE]: ENUM_GUIDE_TYPE.LOCAL,
			[ENUM_FORM_GUIDES.DURATION_DAYS]: 1
		});
	};

	return (
		<div className="grid gap-6">
			<h2 className="text-xl">{t("form.guides.details.title")}</h2>

			<div className="grid gap-4">
				{fields.map((field, index) => (
					<GuidesCard
						key={field.id}
						form={form}
						index={index}
						onRemove={() => remove(index)}
					/>
				))}

				<div>
					<Button
						variant="outline"
						type="button"
						onClick={handleAddGuide}
						className="gap-2"
					>
						<p>{t("form.guides.details.form.buttons.add")}</p>
						<PlusIcon className="h-4 w-4" />
					</Button>
				</div>
			</div>
		</div>
	);
};

export const GuidesDetails = withErrorBoundary(GuidesDetailsBase);

import { Plus, Trash2 } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_ACTIVITY_TYPE,
	ENUM_FORM_ACTIVITY,
	ENUM_FORM_ACTIVITY_MENU,
	type TActivityEditSchema
} from "@/entities/tour";

import { ENUM_FORM_SECTION } from "../../model";

interface IActivityMenuProps {
	form: UseFormReturn<TActivityEditSchema>;
}

const ActivityMenuBase: FC<IActivityMenuProps> = ({ form }) => {
	const { t } = useTranslation("activity_edit_page");
	const subtype = form.watch(
		`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_ACTIVITY.ACTIVITY_SUBTYPE}`
	);

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_ACTIVITY.MENU}`
	});

	if (subtype !== ENUM_ACTIVITY_TYPE.FOOD) {
		return null;
	}

	return (
		<div className="grid gap-4 col-span-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg font-medium">
					{t("form.general.menu.title")}
				</h3>
				<Button
					type="button"
					variant="outline"
					onClick={() =>
						append({
							[ENUM_FORM_ACTIVITY_MENU.NAME]: "",
							[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]: ""
						})
					}
				>
					<Plus className="mr-2 h-4 w-4" />
					{t("form.general.menu.buttons.add")}
				</Button>
			</div>
			{fields.map((field, index) => (
				<div
					key={field.id}
					className="grid grid-cols-[1fr_1fr_auto] gap-3 items-start"
				>
					<CustomField
						control={form.control}
						name={`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_ACTIVITY.MENU}.${index}.${ENUM_FORM_ACTIVITY_MENU.NAME}`}
						label={t("form.general.menu.fields.name.label")}
						placeholder={t(
							"form.general.menu.fields.name.placeholder"
						)}
						fieldType="input"
						t={t}
					/>
					<CustomField
						control={form.control}
						name={`${ENUM_FORM_SECTION.GENERAL}.${ENUM_FORM_ACTIVITY.MENU}.${index}.${ENUM_FORM_ACTIVITY_MENU.DESCRIPTION}`}
						label={t("form.general.menu.fields.description.label")}
						placeholder={t(
							"form.general.menu.fields.description.placeholder"
						)}
						fieldType="input"
						t={t}
					/>
					<Button
						type="button"
						variant="destructive"
						size="icon"
						className="mt-7"
						onClick={() => remove(index)}
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			))}
		</div>
	);
};

export const ActivityMenu = withErrorBoundary(ActivityMenuBase);

import { AddIcon } from "@solar-icons/react/bold/add";
import { TrashBinTrashIcon } from "@solar-icons/react/outline";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomField,
	LoaderButton,
	withErrorBoundary
} from "@/shared/ui";

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
		<div className="grid gap-4 sm:col-span-2 lg:col-span-4">
			<div className="flex items-center justify-between">
				<h3 className="text-lg">{t("form.general.menu.title")}</h3>
				<LoaderButton
					type="button"
					onClick={() =>
						append({
							[ENUM_FORM_ACTIVITY_MENU.NAME]: "",
							[ENUM_FORM_ACTIVITY_MENU.DESCRIPTION]: ""
						})
					}
					icon={<AddIcon />}
					label={t("form.general.menu.buttons.add")}
				/>
			</div>
			{fields.map((field, index) => (
				<div
					key={field.id}
					className="grid grid-cols-1 gap-3 items-start sm:grid-cols-[1fr_1fr_auto]"
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
						variant="destructive_outline"
						size="icon"
						className="mt-7"
						onClick={() => remove(index)}
					>
						<TrashBinTrashIcon />
					</Button>
				</div>
			))}
		</div>
	);
};

export const ActivityMenu = withErrorBoundary(ActivityMenuBase);

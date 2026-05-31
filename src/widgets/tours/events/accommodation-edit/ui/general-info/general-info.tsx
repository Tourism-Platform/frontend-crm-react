import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, CustomField, Separator, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_SECTION,
	type ISlotProps,
	PROPERTIES_LIST
} from "../../model";

import { AccommodationDetails } from "./accommodation-details";
import { Schedule } from "./schedule";

const GeneralInfoBase: FC<ISlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t } = useTranslation("accommodation_edit_page");

	return (
		<div className="grid gap-12">
			<div className="grid grid-cols-2">
				{PROPERTIES_LIST.map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form?.control}
						name={`${ENUM_FORM_SECTION.GENERAL}.${key}`}
						t={t}
						{...item}
					/>
				))}
			</div>
			<Separator />
			<AccommodationDetails form={form} />
			<Separator />
			<Schedule form={form} />

			<div className="flex justify-end mt-6">
				<Button type="button" onClick={onSubmit} disabled={isLoading}>
					{isLoading && (
						<Loader className="mr-2 h-4 w-4 animate-spin" />
					)}
					{isLoading
						? t("form.general.buttons.saving")
						: t("form.general.buttons.save")}
				</Button>
			</div>
		</div>
	);
};

export const GeneralInfo = withErrorBoundary(GeneralInfoBase);

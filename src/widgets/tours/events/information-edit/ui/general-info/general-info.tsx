import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button, CustomField, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_FORM_SECTION,
	INFORMATION_DATA_LIST,
	type ISlotProps
} from "../../model";

const GeneralInfoBase: FC<ISlotProps> = ({ form, onSubmit, isLoading }) => {
	const { t } = useTranslation("information_edit_page");
	return (
		<div className="grid gap-12">
			<div>
				{INFORMATION_DATA_LIST.map(({ key, ...item }) => (
					<CustomField
						key={key}
						control={form?.control}
						name={`${ENUM_FORM_SECTION.GENERAL}.${key}`}
						t={t}
						{...item}
					/>
				))}
				<div className="flex justify-end mt-6">
					<Button
						type="button"
						onClick={onSubmit}
						disabled={isLoading}
					>
						{isLoading && (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						)}
						{isLoading
							? t("form.general.buttons.saving")
							: t("form.general.buttons.save")}
					</Button>
				</div>
			</div>
		</div>
	);
};

export const GeneralInfo = withErrorBoundary(GeneralInfoBase);

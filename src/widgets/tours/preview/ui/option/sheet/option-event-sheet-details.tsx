import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Previewer } from "@/shared/ui";

interface IOptionEventSheetDetailsProps {
	description: string;
}

export const OptionEventSheetDetails: FC<IOptionEventSheetDetailsProps> = ({
	description
}) => {
	const { t } = useTranslation("preview_option_page");

	return (
		<div>
			<h4 className="font-semibold mb-3">
				{t("sections.option.details")}
			</h4>
			<Previewer
				text={description}
				className="text-sm text-muted-foreground leading-relaxed"
			/>
		</div>
	);
};

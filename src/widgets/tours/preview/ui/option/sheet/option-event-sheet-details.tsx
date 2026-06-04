import { type FC } from "react";
import { useTranslation } from "react-i18next";

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
			<p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
				{description}
			</p>
		</div>
	);
};

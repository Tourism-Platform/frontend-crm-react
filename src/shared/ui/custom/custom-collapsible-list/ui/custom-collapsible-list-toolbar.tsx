import { type FC } from "react";
import { useTranslation } from "react-i18next";

import { Button } from "@/shared/ui/shadcn-ui/button";

interface ICustomCollapsibleListToolbarProps {
	onExpandAll: () => void;
	onCollapseAll: () => void;
}

export const CustomCollapsibleListToolbar: FC<
	ICustomCollapsibleListToolbarProps
> = ({ onExpandAll, onCollapseAll }) => {
	const { t } = useTranslation("common");

	const actions = [
		{ label: t("actions.expand_all"), onClick: onExpandAll },
		{ label: t("actions.collapse_all"), onClick: onCollapseAll }
	];

	return (
		<div className="flex flex-wrap gap-2">
			{actions.map(({ label, onClick }) => (
				<Button
					key={label}
					type="button"
					variant="outline"
					size="sm"
					onClick={onClick}
				>
					{label}
				</Button>
			))}
		</div>
	);
};

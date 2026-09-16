import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/shared/ui";

import { resolvePoolErrorMessage } from "../model";

interface ISetEventPoolMemberMainButtonProps {
	supplyId: string;
	isMain?: boolean;
	isLoading?: boolean;
	onSetMain: (supplyId: string) => Promise<void>;
}

export const SetEventPoolMemberMainButton: FC<
	ISetEventPoolMemberMainButtonProps
> = ({ supplyId, isMain, isLoading, onSetMain }) => {
	const { t } = useTranslation("common_events");

	const handleSetMain = async () => {
		try {
			await onSetMain(supplyId);
			toast.success(t("pool.toasts.set_main.success"));
		} catch (error) {
			toast.error(
				t(resolvePoolErrorMessage(error, "pool.toasts.set_main.error"))
			);
		}
	};

	return (
		<Button
			type="button"
			variant="outline"
			size="sm"
			onClick={handleSetMain}
			disabled={isMain || isLoading}
		>
			{t("pool.set_main")}
		</Button>
	);
};

import { type FC } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Button } from "@/shared/ui";

import { resolvePoolErrorMessage } from "../model";

interface IRemoveEventPoolMemberButtonProps {
	supplyId: string;
	disabled?: boolean;
	isLoading?: boolean;
	onRemove: (supplyId: string) => Promise<void>;
}

export const RemoveEventPoolMemberButton: FC<
	IRemoveEventPoolMemberButtonProps
> = ({ supplyId, disabled, isLoading, onRemove }) => {
	const { t } = useTranslation("common_events");

	const handleRemove = async () => {
		try {
			await onRemove(supplyId);
			toast.success(t("pool.toasts.remove.success"));
		} catch (error) {
			toast.error(
				t(resolvePoolErrorMessage(error, "pool.toasts.remove.error"))
			);
		}
	};

	return (
		<Button
			type="button"
			variant="outline"
			size="sm"
			onClick={handleRemove}
			disabled={disabled || isLoading}
			title={disabled ? t("pool.last_member_disabled") : t("pool.remove")}
		>
			{t("pool.remove")}
		</Button>
	);
};

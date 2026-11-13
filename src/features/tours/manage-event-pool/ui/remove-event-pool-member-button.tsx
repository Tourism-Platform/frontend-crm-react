import { TrashBinTrashIcon } from "@solar-icons/react/outline";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { LoaderButton } from "@/shared/ui";

import { resolvePoolErrorMessage } from "../model";

interface IRemoveEventPoolMemberButtonProps {
	supplyId: string;
	disabled?: boolean;
	/** Идёт любой запрос пула — блокирует кнопку */
	isLoading?: boolean;
	onRemove: (supplyId: string) => Promise<void>;
}

export const RemoveEventPoolMemberButton: FC<
	IRemoveEventPoolMemberButtonProps
> = ({ supplyId, disabled, isLoading, onRemove }) => {
	const { t } = useTranslation("common_events");
	// Лоадер только на нажатой кнопке, остальные просто заблокированы
	const [isPending, setIsPending] = useState(false);

	const handleRemove = async () => {
		setIsPending(true);
		try {
			await onRemove(supplyId);
			toast.success(t("pool.toasts.remove.success"));
		} catch (error) {
			toast.error(
				t(resolvePoolErrorMessage(error, "pool.toasts.remove.error"))
			);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<LoaderButton
			type="button"
			variant="destructive_outline"
			size="sm"
			onClick={handleRemove}
			disabled={disabled || isLoading}
			isLoading={isPending}
			title={disabled ? t("pool.last_member_disabled") : t("pool.remove")}
			icon={<TrashBinTrashIcon />}
			label={t("pool.remove")}
		/>
	);
};

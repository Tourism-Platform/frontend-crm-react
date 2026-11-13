import { CrownMinimalisticIcon } from "@solar-icons/react/outline";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { LoaderButton } from "@/shared/ui";

import { resolvePoolErrorMessage } from "../model";

interface ISetEventPoolMemberMainButtonProps {
	supplyId: string;
	isMain?: boolean;
	/** Запрос смены главного идёт для любого участника — блокирует кнопку */
	isLoading?: boolean;
	onSetMain: (supplyId: string) => Promise<void>;
}

export const SetEventPoolMemberMainButton: FC<
	ISetEventPoolMemberMainButtonProps
> = ({ supplyId, isMain, isLoading, onSetMain }) => {
	const { t } = useTranslation("common_events");
	// Лоадер только на нажатой кнопке, остальные просто заблокированы
	const [isPending, setIsPending] = useState(false);

	const handleSetMain = async () => {
		setIsPending(true);
		try {
			await onSetMain(supplyId);
			toast.success(t("pool.toasts.set_main.success"));
		} catch (error) {
			toast.error(
				t(resolvePoolErrorMessage(error, "pool.toasts.set_main.error"))
			);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<LoaderButton
			type="button"
			variant="secondary"
			size="sm"
			onClick={handleSetMain}
			disabled={isMain || isLoading}
			isLoading={isPending}
			icon={isMain ? <CrownMinimalisticIcon /> : undefined}
			label={isMain ? t("pool.main") : t("pool.set_main")}
		/>
	);
};

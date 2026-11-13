import { AddIcon } from "@solar-icons/react/bold/add";
import { TrashBinTrashIcon } from "@solar-icons/react/outline";
import { type FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { Badge, LoaderButton } from "@/shared/ui";

import type { IEventPoolMemberSummary } from "@/entities/tour";
import { type ENUM_EVENT_KIND_TYPE } from "@/entities/tour";

import { resolvePoolErrorMessage } from "@/features/tours/manage-event-pool";

import { useRevisionEventPoolMutations } from "../model";

interface IRevisionEventPoolControlsProps {
	bookingId: string;
	eventId: string;
	optionIndex?: number | null;
	eventKind: ENUM_EVENT_KIND_TYPE;
	pool?: IEventPoolMemberSummary[];
}

export const RevisionEventPoolControls: FC<IRevisionEventPoolControlsProps> = ({
	bookingId,
	eventId,
	optionIndex,
	eventKind,
	pool = []
}) => {
	const { t } = useTranslation("common_events");
	const { add, remove, isLoading } = useRevisionEventPoolMutations({
		bookingId,
		eventId,
		optionIndex
	});
	const [isAdding, setIsAdding] = useState(false);

	if (!eventId) {
		return null;
	}

	const handleAdd = async () => {
		setIsAdding(true);
		try {
			await add({ kind: "empty", eventKind });
			toast.success(t("pool.toasts.add.success"));
		} catch (error) {
			toast.error(
				t(resolvePoolErrorMessage(error, "pool.toasts.add.error"))
			);
		} finally {
			setIsAdding(false);
		}
	};

	const handleRemove = async (supplyId: string) => {
		try {
			await remove(supplyId);
			toast.success(t("pool.toasts.remove.success"));
		} catch (error) {
			toast.error(
				t(resolvePoolErrorMessage(error, "pool.toasts.remove.error"))
			);
		}
	};

	return (
		<div className="flex flex-col gap-2">
			{pool.map((member) => (
				<div
					key={member.id}
					className="flex flex-wrap items-center justify-between gap-2"
				>
					<div className="flex min-w-0 items-center gap-2">
						<span className="truncate text-sm">
							{member.supplierLabel}
						</span>
						{member.isMain ? (
							<Badge variant="secondary" size="sm">
								{t("pool.main")}
							</Badge>
						) : null}
					</div>
					<LoaderButton
						type="button"
						variant="destructive_outline"
						size="sm"
						onClick={() => handleRemove(member.id)}
						disabled={pool.length <= 1 || isLoading}
						icon={<TrashBinTrashIcon />}
						label={t("pool.remove")}
					/>
				</div>
			))}
			<LoaderButton
				type="button"
				size="sm"
				onClick={handleAdd}
				disabled={isAdding || isLoading}
				icon={<AddIcon />}
				label={t("pool.add.title")}
			/>
		</div>
	);
};

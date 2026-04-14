import { type FC, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { useDebounce } from "@/shared/hooks";
import { Switch, withErrorBoundary } from "@/shared/ui";

import { useUpdateScheduleMutation } from "@/entities/tour";

interface ISwitcherProps {
	tourId: string;
	checked: boolean;
}

const SwitcherBase: FC<ISwitcherProps> = ({ tourId, checked }) => {
	const { t } = useTranslation("tour_schedule_page");
	const [updateSchedule] = useUpdateScheduleMutation();

	const [localChecked, setLocalChecked] = useState<boolean>(checked);
	const debouncedChecked = useDebounce(localChecked, 500);
	const lastSyncedValue = useRef<boolean>(checked);

	// Синхронизация при изменении пропса извне
	useEffect(() => {
		setLocalChecked(checked);
		lastSyncedValue.current = checked;
	}, [checked]);

	useEffect(() => {
		if (debouncedChecked === lastSyncedValue.current) {
			return;
		}

		const update = async () => {
			try {
				await updateSchedule({
					tourId,
					data: { isSeasonal: debouncedChecked }
				}).unwrap();

				lastSyncedValue.current = debouncedChecked;

				toast.success(
					t(
						debouncedChecked
							? "seasonality.toasts.enabled"
							: "seasonality.toasts.disabled"
					)
				);
			} catch (error) {
				toast.error(t("seasonality.toasts.error"));
				console.error(error);
			}
		};

		update();
	}, [debouncedChecked]);

	return (
		<div
			className="group inline-flex items-center gap-2"
			data-state={localChecked ? "checked" : "unchecked"}
		>
			<Switch checked={localChecked} onCheckedChange={setLocalChecked} />
			<span className="group-data-[state=unchecked]:text-muted-foreground/70 flex-1 text-left text-sm font-medium">
				{t("switcher")}
			</span>
		</div>
	);
};

export const Switcher = withErrorBoundary(SwitcherBase);

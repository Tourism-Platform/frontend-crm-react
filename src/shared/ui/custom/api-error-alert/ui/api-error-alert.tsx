import type { FC } from "react";

import {
	Alert,
	AlertContent,
	AlertDescription
} from "@/shared/ui/shadcn-ui/alert";

type TApiErrorAlertProps = {
	/** Текст ошибки бэкенда — обычно `getApiErrorDetail(error)`; пусто — ничего не рисуется */
	message?: string | null;
	className?: string;
};

/** Ошибка бэкенда под полями формы */
export const ApiErrorAlert: FC<TApiErrorAlertProps> = ({
	message,
	className
}) =>
	message ? (
		<Alert variant="destructive" appearance="light" className={className}>
			<AlertContent>
				<AlertDescription>{message}</AlertDescription>
			</AlertContent>
		</Alert>
	) : null;

import { TuningIcon } from "@solar-icons/react/outline";
import type { FC, PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";

import {
	Button,
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger
} from "@/shared/ui";

/** Фильтры в выезжающей панели — до lg вместо колонки слева */
export const CatalogToursFiltersSheet: FC<PropsWithChildren> = ({
	children
}) => {
	const { t } = useTranslation("tours_catalog_page");

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button
					type="button"
					variant="glass"
					size="icon"
					className="lg:hidden"
					aria-label={t("filters.title")}
				>
					<TuningIcon className="size-4" />
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="w-full sm:max-w-md">
				<SheetHeader>
					<SheetTitle>{t("filters.title")}</SheetTitle>
					<SheetDescription className="sr-only">
						{t("filters.title")}
					</SheetDescription>
				</SheetHeader>
				{/* flex-1: прокрутка до низа шторки — список поля не обрезается краем содержимого */}
				<div className="flex-1 overflow-y-auto px-4 pb-6">
					{children}
				</div>
			</SheetContent>
		</Sheet>
	);
};

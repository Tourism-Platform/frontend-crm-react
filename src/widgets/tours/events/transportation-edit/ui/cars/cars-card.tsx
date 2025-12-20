import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CustomField } from "@/shared/ui";

import { CARS_DATA_LIST, type TCarsSchema } from "../../model";

import { CarsMenu } from "./cars-menu";

interface ICarsCardProps {
	form: UseFormReturn<TCarsSchema>;
	index: number;
	onRemove: () => void;
}

export const CarsCard: FC<ICarsCardProps> = ({ form, index, onRemove }) => {
	const { t } = useTranslation("transportation_edit_page");

	return (
		<Card className="relative">
			<CardHeader className="flex items-center justify-between">
				{t("cars.details.car_item", { index: index + 1 })}
			</CardHeader>
			<CardContent>
				<div className="absolute top-0 right-0">
					<CarsMenu onRemove={onRemove} />
				</div>

				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{CARS_DATA_LIST.map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form?.control}
							name={`cars.${index}.${key}`}
							t={t}
							{...item}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

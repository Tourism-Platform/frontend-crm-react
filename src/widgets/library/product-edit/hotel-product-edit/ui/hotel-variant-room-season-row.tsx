import { type FC } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_HOTEL_VARIANT as ENUM_FORM,
	ENUM_FORM_HOTEL_VARIANT_ROOM as ENUM_ROOM,
	ENUM_FORM_HOTEL_VARIANT_ROOM_SEASON as ENUM_SEASON,
	type THotelVariantFormSchema
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

import {
	HOTEL_VARIANT_ROOM_PRICING_FIELDS_LIST,
	HOTEL_VARIANT_ROOM_SEASON_DATE_FIELDS_LIST
} from "../model";

import { RowRemoveMenu } from "./row-remove-menu";

interface IHotelVariantRoomSeasonRowProps {
	form: UseFormReturn<THotelVariantFormSchema>;
	roomIndex: number;
	seasonIndex: number;
	onRemove: () => void;
}

export const HotelVariantRoomSeasonRow: FC<IHotelVariantRoomSeasonRowProps> = ({
	form,
	roomIndex,
	seasonIndex,
	onRemove
}) => {
	const { t } = useTranslation("hotel_product_edit_page");
	const seasonName =
		`${ENUM_FORM.ROOMS}.${roomIndex}.${ENUM_ROOM.SEASONS}.${seasonIndex}` as const;

	return (
		<Card className="relative">
			<CardHeader className="flex items-center justify-between">
				{t("form.variants.season_item", { index: seasonIndex + 1 })}
			</CardHeader>
			<CardContent>
				<div className="absolute top-0 right-0">
					<RowRemoveMenu onRemove={onRemove} />
				</div>
				<div className="grid gap-2">
					<div className="grid grid-cols-6 gap-x-4 gap-y-1">
						{HOTEL_VARIANT_ROOM_SEASON_DATE_FIELDS_LIST.map(
							({ key, ...item }) => (
								<CustomField
									key={key}
									control={form.control}
									name={`${seasonName}.${key}`}
									t={t}
									{...item}
								/>
							)
						)}
						{HOTEL_VARIANT_ROOM_PRICING_FIELDS_LIST().map(
							({ key, ...item }) => (
								<CustomField
									key={key}
									control={form.control}
									name={`${seasonName}.${key}`}
									t={t}
									{...item}
								/>
							)
						)}
					</div>
					<FeeLinesField
						control={form.control}
						name={`${seasonName}.${ENUM_SEASON.FEES}`}
					/>
				</div>
			</CardContent>
		</Card>
	);
};

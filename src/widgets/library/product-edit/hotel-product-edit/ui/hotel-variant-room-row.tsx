import { PlusIcon } from "lucide-react";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CustomField
} from "@/shared/ui";

import {
	ENUM_FORM_HOTEL_VARIANT as ENUM_FORM,
	ENUM_FORM_HOTEL_VARIANT_ROOM as ENUM_ROOM,
	type THotelVariantFormSchema,
	emptyHotelVariantRoomSeason
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

import {
	HOTEL_VARIANT_ROOM_PRICING_FIELDS_LIST,
	HOTEL_VARIANT_ROOM_TYPE_FIELDS_LIST
} from "../model";

import { HotelVariantRoomSeasonRow } from "./hotel-variant-room-season-row";
import { RowRemoveMenu } from "./row-remove-menu";

interface IHotelVariantRoomRowProps {
	form: UseFormReturn<THotelVariantFormSchema>;
	index: number;
	onRemove: () => void;
	showPricing: boolean;
}

export const HotelVariantRoomRow: FC<IHotelVariantRoomRowProps> = ({
	form,
	index,
	onRemove,
	showPricing
}) => {
	const { t } = useTranslation("hotel_product_edit_page");
	const roomName = `${ENUM_FORM.ROOMS}.${index}` as const;
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM.ROOMS}.${index}.${ENUM_ROOM.SEASONS}`
	});

	return (
		<Card className="relative">
			<CardHeader className="flex items-center justify-between">
				{t("form.variants.room_item", { index: index + 1 })}
			</CardHeader>
			<CardContent>
				<div className="absolute top-0 right-0">
					<RowRemoveMenu onRemove={onRemove} />
				</div>
				<input
					type="hidden"
					{...form.register(`${roomName}.${ENUM_ROOM.ID}`)}
				/>
				<div className="grid gap-x-4 gap-y-1">
					<div className="grid grid-cols-6 gap-x-4 gap-y-1">
						{HOTEL_VARIANT_ROOM_TYPE_FIELDS_LIST().map(
							({ key, ...item }) => (
								<CustomField
									key={key}
									control={form.control}
									name={`${roomName}.${key}`}
									t={t}
									{...item}
								/>
							)
						)}
					</div>
					{showPricing ? (
						<>
							<div className="grid gap-1 mb-4">
								<div className="grid gap-2">
									<p className="text-sm font-medium">
										{t("form.variants.base_price")}
									</p>
									<div className="grid grid-cols-6 gap-x-4 gap-y-1">
										{HOTEL_VARIANT_ROOM_PRICING_FIELDS_LIST().map(
											({ key, ...item }) => (
												<CustomField
													key={key}
													control={form.control}
													name={`${roomName}.${key}`}
													t={t}
													{...item}
												/>
											)
										)}
									</div>
								</div>
								<FeeLinesField
									control={form.control}
									name={`${roomName}.${ENUM_ROOM.FEES}`}
								/>
							</div>
							<div className="grid gap-3">
								<p className="text-sm font-medium">
									{t("form.variants.seasons")}
								</p>
								{fields.map((field, seasonIndex) => (
									<HotelVariantRoomSeasonRow
										key={field.id}
										form={form}
										roomIndex={index}
										seasonIndex={seasonIndex}
										onRemove={() => remove(seasonIndex)}
									/>
								))}
								<Button
									type="button"
									variant="outline"
									onClick={() =>
										append(emptyHotelVariantRoomSeason())
									}
								>
									<PlusIcon className="mr-1 h-4 w-4" />
									{t("form.variants.add_rate")}
								</Button>
							</div>
						</>
					) : null}
				</div>
			</CardContent>
		</Card>
	);
};

import { type FC, Fragment } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Card,
	CardContent,
	CardHeader,
	CustomField,
	CustomInputSelect
} from "@/shared/ui";

import {
	ENUM_FORM_HOTEL_PRODUCT_ROOMS,
	ENUM_FORM_HOTEL_SECTION,
	ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD,
	ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD,
	ENUM_HOTEL_PRODUCT_PRICING_FIELD,
	type THotelProductEditSchema
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

import { PER_ROOM_MARKUP_FIELD, PER_ROOM_ROW_FIELDS_LIST } from "../../model";

interface IPerRoomCardProps {
	form: UseFormReturn<THotelProductEditSchema>;
	index: number;
	addMarginSeparately: boolean;
}

export const PerRoomCard: FC<IPerRoomCardProps> = ({
	form,
	index,
	addMarginSeparately
}) => {
	const { t } = useTranslation("hotel_product_edit_page");
	const roomName = form.watch(
		`${ENUM_FORM_HOTEL_SECTION.ROOMS}.${ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOMS_LIST}.${index}.${ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOM_NAME}`
	);
	const rowPath =
		`${ENUM_FORM_HOTEL_SECTION.PRICING}.${ENUM_HOTEL_PRODUCT_PRICING_FIELD.EXPENSES}.${ENUM_HOTEL_PRODUCT_PER_ROOM_EXPENSES_FIELD.ROOMS}.${index}` as const;

	return (
		<Card>
			<CardHeader>
				<h4 className="font-semibold">{roomName ?? ""}</h4>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div
					className={cn(
						"grid max-w-xl grid-cols-2 gap-4",
						addMarginSeparately &&
							"max-w-3xl grid-cols-[minmax(0,12rem)_minmax(0,14rem)_minmax(0,8rem)]"
					)}
				>
					{PER_ROOM_ROW_FIELDS_LIST.map(
						({ key, ...item }, fieldIndex) => (
							<Fragment key={key}>
								{addMarginSeparately &&
								fieldIndex ===
									PER_ROOM_ROW_FIELDS_LIST.length - 1 ? (
									<CustomInputSelect
										control={form.control}
										name={`${rowPath}.${PER_ROOM_MARKUP_FIELD.key}`}
										label={PER_ROOM_MARKUP_FIELD.label}
										placeholder={
											PER_ROOM_MARKUP_FIELD.placeholder
										}
										selectOptions={[
											...PER_ROOM_MARKUP_FIELD.selectOptions
										]}
										t={t}
									/>
								) : null}
								<CustomField
									control={form.control}
									name={`${rowPath}.${key}`}
									t={t}
									{...item}
								/>
							</Fragment>
						)
					)}
				</div>
				<FeeLinesField
					control={form.control}
					name={`${rowPath}.${ENUM_HOTEL_PRODUCT_PRICE_ROW_FIELD.FEES}`}
				/>
			</CardContent>
		</Card>
	);
};

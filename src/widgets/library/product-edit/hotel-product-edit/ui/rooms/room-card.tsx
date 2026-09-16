import { type FC } from "react";
import { type UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_HOTEL_PRODUCT_ROOMS,
	ENUM_FORM_HOTEL_SECTION,
	type THotelProductEditSchema
} from "@/entities/supplier";

import { ROOM_DATA_LIST } from "../../model";

import { RoomsMenu } from "./rooms-menu";

interface IRoomCardProps {
	form: UseFormReturn<THotelProductEditSchema>;
	index: number;
	supplierId: string;
	productId: string;
}

export const RoomCard: FC<IRoomCardProps> = ({
	form,
	index,
	supplierId,
	productId
}) => {
	const { t } = useTranslation("hotel_product_edit_page");
	const variantId = form.watch(
		`${ENUM_FORM_HOTEL_SECTION.ROOMS}.${ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOMS_LIST}.${index}.${ENUM_FORM_HOTEL_PRODUCT_ROOMS.VARIANT_ID}`
	);
	const roomName = form.watch(
		`${ENUM_FORM_HOTEL_SECTION.ROOMS}.${ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOMS_LIST}.${index}.${ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOM_NAME}`
	);

	return (
		<Card className="relative">
			<CardHeader className="flex items-center justify-between">
				<div className="grid gap-1">
					<p>
						{t("form.rooms.details.room_item", {
							index: index + 1
						})}
					</p>
					{roomName ? (
						<p className="text-sm text-muted-foreground">
							{roomName}
						</p>
					) : null}
				</div>
			</CardHeader>
			<CardContent>
				<div className="absolute top-0 right-0">
					<RoomsMenu
						supplierId={supplierId}
						productId={productId}
						variantId={variantId}
						variantName={roomName}
					/>
				</div>
				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{ROOM_DATA_LIST.map(({ key, ...item }) => (
						<CustomField
							key={key}
							control={form.control}
							name={`${ENUM_FORM_HOTEL_SECTION.ROOMS}.${ENUM_FORM_HOTEL_PRODUCT_ROOMS.ROOMS_LIST}.${index}.${key}`}
							t={t}
							{...item}
						/>
					))}
				</div>
			</CardContent>
		</Card>
	);
};

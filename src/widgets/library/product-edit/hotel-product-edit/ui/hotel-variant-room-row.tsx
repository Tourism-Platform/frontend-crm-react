import { type FC, Fragment } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Card, CardContent, CardHeader, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_HOTEL_VARIANT as ENUM_FORM,
	ENUM_FORM_HOTEL_VARIANT_ROOM as ENUM_ROOM,
	type THotelVariantFormSchema
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

import { RowRemoveMenu } from "../../ui";
import { HOTEL_VARIANT_ROOM_FIELDS_LIST } from "../model";

interface IHotelVariantRoomRowProps {
	form: UseFormReturn<THotelVariantFormSchema>;
	index: number;
	onRemove: () => void;
}

export const HotelVariantRoomRow: FC<IHotelVariantRoomRowProps> = ({
	form,
	index,
	onRemove
}) => {
	const { t } = useTranslation("hotel_product_edit_page");

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
					{...form.register(
						`${ENUM_FORM.ROOMS}.${index}.${ENUM_ROOM.ID}`
					)}
				/>
				<div className="grid grid-cols-2 gap-x-4 gap-y-1">
					{HOTEL_VARIANT_ROOM_FIELDS_LIST().map(
						({ key, ...item }) => (
							<Fragment key={key}>
								<CustomField
									control={form.control}
									name={`${ENUM_FORM.ROOMS}.${index}.${key}`}
									t={t}
									{...item}
								/>
								{key === ENUM_ROOM.CURRENCY ? (
									<div className="col-span-2">
										<FeeLinesField
											control={form.control}
											name={`${ENUM_FORM.ROOMS}.${index}.${ENUM_ROOM.FEES}`}
										/>
									</div>
								) : null}
								{key === ENUM_ROOM.SEASON_CURRENCY ? (
									<div className="col-span-2">
										<FeeLinesField
											control={form.control}
											name={`${ENUM_FORM.ROOMS}.${index}.${ENUM_ROOM.SEASON_FEES}`}
										/>
									</div>
								) : null}
							</Fragment>
						)
					)}
				</div>
			</CardContent>
		</Card>
	);
};

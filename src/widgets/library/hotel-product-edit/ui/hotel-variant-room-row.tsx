import { Trash2 } from "lucide-react";
import { type FC, Fragment } from "react";
import type { UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Button, CustomField } from "@/shared/ui";

import {
	ENUM_FORM_HOTEL_VARIANT as ENUM_FORM,
	ENUM_FORM_HOTEL_VARIANT_ROOM as ENUM_ROOM,
	type THotelVariantFormSchema
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

import { HOTEL_VARIANT_ROOM_FIELDS_LIST } from "../model";

interface IHotelVariantRoomRowProps {
	form: UseFormReturn<THotelVariantFormSchema>;
	index: number;
	canRemove: boolean;
	onRemove: () => void;
}

export const HotelVariantRoomRow: FC<IHotelVariantRoomRowProps> = ({
	form,
	index,
	canRemove,
	onRemove
}) => {
	const { t } = useTranslation("hotel_product_edit_page");

	return (
		<div className="grid gap-3 rounded-md border p-4 md:grid-cols-2">
			<input
				type="hidden"
				{...form.register(
					`${ENUM_FORM.ROOMS}.${index}.${ENUM_ROOM.ID}`
				)}
			/>
			{HOTEL_VARIANT_ROOM_FIELDS_LIST().map(({ key, ...item }) => (
				<Fragment key={key}>
					<CustomField
						control={form.control}
						name={`${ENUM_FORM.ROOMS}.${index}.${key}`}
						t={t}
						{...item}
					/>
					{key === ENUM_ROOM.CURRENCY ? (
						<div className="md:col-span-2">
							<FeeLinesField
								control={form.control}
								name={`${ENUM_FORM.ROOMS}.${index}.${ENUM_ROOM.FEES}`}
							/>
						</div>
					) : null}
					{key === ENUM_ROOM.SEASON_CURRENCY ? (
						<div className="md:col-span-2">
							<FeeLinesField
								control={form.control}
								name={`${ENUM_FORM.ROOMS}.${index}.${ENUM_ROOM.SEASON_FEES}`}
							/>
						</div>
					) : null}
				</Fragment>
			))}
			{canRemove ? (
				<div className="md:col-span-2 flex justify-end">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={onRemove}
					>
						<Trash2 className="mr-1 h-4 w-4" />
						{t("form.variants.buttons.delete")}
					</Button>
				</div>
			) : null}
		</div>
	);
};

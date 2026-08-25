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
	ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD,
	ENUM_ACCOMMODATION_PRICE_ROW_FIELD,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_FORM_ROOMS,
	type TAccommodationEditSchema
} from "@/entities/tour";

import { FeeLinesField } from "@/features/pricing";

import {
	ENUM_FORM_SECTION,
	PER_ROOM_MARKUP_FIELD,
	PER_ROOM_ROW_FIELDS_LIST
} from "../../model";

interface IPerRoomCardProps {
	form: UseFormReturn<TAccommodationEditSchema>;
	index: number;
	addMarginSeparately: boolean;
}

export const PerRoomCard: FC<IPerRoomCardProps> = ({
	form,
	index,
	addMarginSeparately
}) => {
	const { t } = useTranslation("accommodation_edit_page");
	const rowPath =
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES}.${ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS}.${index}` as const;

	return (
		<Card>
			<CardHeader>
				<h4 className="font-semibold">
					{form.watch(
						`${ENUM_FORM_SECTION.ROOMS}.${ENUM_FORM_ROOMS.ROOMS_LIST}.${index}.${ENUM_FORM_ROOMS.ROOM_NAME}`
					) ?? ""}
				</h4>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div
					className={cn(
						"grid grid-cols-2 gap-5",
						addMarginSeparately && "grid-cols-[1fr_1.5fr_0.5fr]"
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
					name={`${rowPath}.${ENUM_ACCOMMODATION_PRICE_ROW_FIELD.FEES}`}
				/>
			</CardContent>
		</Card>
	);
};

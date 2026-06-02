import { type FC, useEffect } from "react";
import { type UseFormReturn, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { Checkbox, Label, withErrorBoundary } from "@/shared/ui";

import {
	ENUM_ACCOMMODATION_EXPENSE_TYP,
	ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_ACCOMMODATION_PRICING_TYPE,
	ENUM_FORM_ROOMS,
	type TAccommodationEditSchema,
	alignAccommodationPerRoomExpenses
} from "@/entities/tour";

import { ENUM_FORM_SECTION } from "../../model";

import { PerRoomByClassCard } from "./per-room-by-class-card";
import { PerRoomCard } from "./per-room-card";

const syncPerRoomExpenses = (form: UseFormReturn<TAccommodationEditSchema>) => {
	if (
		form.getValues(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE}`
		) !== ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM
	) {
		return;
	}

	const priceBasedOnClass = form.getValues(
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`
	);
	const expectedTyp = priceBasedOnClass
		? ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM_CATEGORY
		: ENUM_ACCOMMODATION_EXPENSE_TYP.PER_ROOM;
	const expenses = form.getValues(
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES}`
	);
	const roomsListLength =
		form.getValues(
			`${ENUM_FORM_SECTION.ROOMS}.${ENUM_FORM_ROOMS.ROOMS_LIST}`
		)?.length ?? 0;

	if (
		expenses?.typ === expectedTyp &&
		expenses[ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS]?.length ===
			roomsListLength
	) {
		return;
	}

	form.setValue(
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES}`,
		alignAccommodationPerRoomExpenses({
			priceBasedOnClass,
			roomsListLength,
			current: expenses,
			...(form.getValues(
				`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
			) && { addMarginSeparately: true })
		})
	);
};

const PerRoomDetailsBase: FC<{
	form: UseFormReturn<TAccommodationEditSchema>;
}> = ({ form }) => {
	const { t } = useTranslation("accommodation_edit_page");

	const roomsList = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.ROOMS}.${ENUM_FORM_ROOMS.ROOMS_LIST}`
	});
	const pricingType = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.PRICING_TYPE}`
	});
	const priceBasedOnClass = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`
	});
	const addMarginSeparately = useWatch({
		control: form.control,
		name: `${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`
	});

	useEffect(() => {
		syncPerRoomExpenses(form);
	}, [roomsList, pricingType, priceBasedOnClass, form]);

	const handlePriceBasedOnClassChange = (checked: boolean) => {
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.PRICE_BASED_ON_CLASS}`,
			checked
		);
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES}`,
			alignAccommodationPerRoomExpenses({
				priceBasedOnClass: checked,
				roomsListLength: roomsList?.length ?? 0,
				...(addMarginSeparately && { addMarginSeparately: true }),
				current: form.getValues(
					`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES}`
				)
			})
		);
	};

	const handleAddMarginSeparatelyChange = (checked: boolean) => {
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.ADD_MARGIN_SEPARATELY}`,
			checked
		);
		form.setValue(
			`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES}`,
			alignAccommodationPerRoomExpenses({
				priceBasedOnClass: Boolean(priceBasedOnClass),
				roomsListLength: roomsList?.length ?? 0,
				addMarginSeparately: checked,
				current: form.getValues(
					`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES}`
				)
			})
		);
	};

	if (pricingType !== ENUM_ACCOMMODATION_PRICING_TYPE.PER_ROOM) {
		return null;
	}

	if (!roomsList?.length) {
		return (
			<p className="text-sm text-muted-foreground">
				{t("form.pricing.form.per_room.empty_rooms")}
			</p>
		);
	}

	return (
		<div className="grid gap-4">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h3 className="text-lg">
					{t("form.pricing.form.pricing_details.title")}
				</h3>
				<div className="flex flex-wrap gap-6">
					<div className="flex items-center gap-2">
						<Checkbox
							id="price-based-on-class"
							checked={Boolean(priceBasedOnClass)}
							onCheckedChange={(checked) =>
								handlePriceBasedOnClassChange(Boolean(checked))
							}
						/>
						<Label htmlFor="price-based-on-class">
							{t(
								"form.pricing.form.per_room.checkboxes.price_based_on_class"
							)}
						</Label>
					</div>
					<div className="flex items-center gap-2">
						<Checkbox
							id="add-margin-separately"
							checked={Boolean(addMarginSeparately)}
							onCheckedChange={(checked) =>
								handleAddMarginSeparatelyChange(
									Boolean(checked)
								)
							}
						/>
						<Label htmlFor="add-margin-separately">
							{t(
								"form.pricing.form.per_room.checkboxes.add_margin_separately"
							)}
						</Label>
					</div>
				</div>
			</div>

			<div className="grid gap-4">
				{roomsList.map((_, index) =>
					priceBasedOnClass ? (
						<PerRoomByClassCard
							key={index}
							form={form}
							index={index}
							addMarginSeparately={Boolean(addMarginSeparately)}
						/>
					) : (
						<PerRoomCard
							key={index}
							form={form}
							index={index}
							addMarginSeparately={Boolean(addMarginSeparately)}
						/>
					)
				)}
			</div>
		</div>
	);
};

export const PerRoomDetails = withErrorBoundary(PerRoomDetailsBase);

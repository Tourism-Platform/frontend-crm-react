import { Plus, Trash2 } from "lucide-react";
import { type FC, Fragment } from "react";
import { type UseFormReturn, useFieldArray } from "react-hook-form";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import {
	Button,
	Card,
	CardContent,
	CardHeader,
	CustomField,
	CustomInputSelect,
	Separator
} from "@/shared/ui";

import {
	ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD,
	ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_FORM_ROOMS,
	type TAccommodationEditSchema
} from "@/entities/tour";

import { FeeLinesField } from "@/features/pricing";

import {
	ENUM_FORM_SECTION,
	PER_ROOM_CATEGORY_ROW_FIELDS_LIST,
	PER_ROOM_MARKUP_FIELD,
	createEmptyPerRoomCategoryRow
} from "../../model";

interface IPerRoomByClassCardProps {
	form: UseFormReturn<TAccommodationEditSchema>;
	index: number;
	addMarginSeparately: boolean;
}

export const PerRoomByClassCard: FC<IPerRoomByClassCardProps> = ({
	form,
	index,
	addMarginSeparately
}) => {
	const { t } = useTranslation("accommodation_edit_page");
	const categoryRowFields = PER_ROOM_CATEGORY_ROW_FIELDS_LIST();
	const roomName = form.watch(
		`${ENUM_FORM_SECTION.ROOMS}.${ENUM_FORM_ROOMS.ROOMS_LIST}.${index}.${ENUM_FORM_ROOMS.ROOM_NAME}`
	);
	const roomsPath =
		`${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES}.${ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS}.${index}` as const;

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${roomsPath}.${ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES}`
	});

	return (
		<Card>
			<CardHeader>
				<h4 className="font-semibold">{roomName ?? ""}</h4>
			</CardHeader>
			<CardContent className="grid gap-4">
				{fields.map((field, categoryIndex) => {
					const categoryPath =
						`${roomsPath}.${ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.CATEGORIES}.${categoryIndex}` as const;

					return (
						<Fragment key={field.id}>
							<div className="grid gap-3">
								<div
									className={cn(
										"grid max-w-3xl grid-cols-[minmax(0,10rem)_minmax(0,8rem)_minmax(0,8rem)_auto] gap-3 items-center",
										addMarginSeparately &&
											"max-w-4xl grid-cols-[minmax(0,10rem)_minmax(0,8rem)_minmax(0,12rem)_minmax(0,8rem)_auto]"
									)}
								>
									{categoryRowFields.map(
										({ key, ...item }, fieldIndex) => (
											<Fragment key={key}>
												{addMarginSeparately &&
												fieldIndex ===
													categoryRowFields.length -
														1 ? (
													<CustomInputSelect
														control={form.control}
														name={`${categoryPath}.${PER_ROOM_MARKUP_FIELD.key}`}
														label={
															PER_ROOM_MARKUP_FIELD.label
														}
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
													name={`${categoryPath}.${key}`}
													t={t}
													className="min-w-0"
													{...item}
												/>
											</Fragment>
										)
									)}
									<Button
										type="button"
										variant="destructive"
										size="icon"
										onClick={() => remove(categoryIndex)}
									>
										<Trash2 className="h-4 w-4" />
									</Button>
								</div>
								<FeeLinesField
									control={form.control}
									name={`${categoryPath}.${ENUM_ACCOMMODATION_CATEGORY_ROW_FIELD.FEES}`}
								/>
							</div>
							{categoryIndex < fields.length - 1 ? (
								<Separator />
							) : null}
						</Fragment>
					);
				})}
				<Button
					type="button"
					variant="outline"
					className="w-fit"
					onClick={() => append(createEmptyPerRoomCategoryRow())}
				>
					<Plus className="mr-2 h-4 w-4" />
					{t("form.pricing.form.per_room.buttons.add_category")}
				</Button>
			</CardContent>
		</Card>
	);
};

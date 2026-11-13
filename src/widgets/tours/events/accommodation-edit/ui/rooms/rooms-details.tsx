import { AddIcon } from "@solar-icons/react/bold/add";
import { type FC } from "react";
import { type UseFormReturn, useFieldArray, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";

import {
	Accordion,
	CustomCollapsibleListToolbar,
	LoaderButton,
	useCollapsibleList,
	withErrorBoundary
} from "@/shared/ui";

import {
	ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD,
	ENUM_ACCOMMODATION_PRICING_FIELD,
	ENUM_FORM_EVENT_PRODUCT,
	ENUM_FORM_ROOMS,
	type TAccommodationEditSchema
} from "@/entities/tour";

import { removeWithPriceRow, useConfirmRemoveLastNode } from "../../../model";
import { useIsInheritedProduct } from "../../../model/use-is-inherited-product";
import { ENUM_FORM_SECTION } from "../../model";

import { RoomCard } from "./room-card";

/** Per-room price rows, index-aligned to the rooms list. */
const ROOM_PRICE_ROWS_PATH = `${ENUM_FORM_SECTION.PRICING}.${ENUM_ACCOMMODATION_PRICING_FIELD.EXPENSES}.${ENUM_ACCOMMODATION_PER_ROOM_EXPENSES_FIELD.ROOMS}`;

interface IRoomsProps {
	form: UseFormReturn<TAccommodationEditSchema>;
}

const RoomsDetailsBase: FC<IRoomsProps> = ({ form }) => {
	const { t } = useTranslation("accommodation_edit_page");
	const confirmRemoveLastNode = useConfirmRemoveLastNode();
	const isInherited = useIsInheritedProduct(form);
	const supplyId = useWatch({
		control: form.control,
		name: ENUM_FORM_EVENT_PRODUCT.SUPPLY_ID
	});
	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: `${ENUM_FORM_SECTION.ROOMS}.${ENUM_FORM_ROOMS.ROOMS_LIST}`
	});
	const list = useCollapsibleList(fields.length, supplyId);

	// The last node going away deletes its photos too: ask first (fe6.4 §6).
	const handleRemove = async (index: number) => {
		if (fields.length === 1 && !(await confirmRemoveLastNode())) return;
		removeWithPriceRow(form, remove, ROOM_PRICE_ROWS_PATH, index);
		list.removeItem(index);
	};

	const handleAddRoom = () => {
		append({
			[ENUM_FORM_ROOMS.ROOM_NAME]: "",
			[ENUM_FORM_ROOMS.DESCRIPTION]: ""
		});
		list.openItem(fields.length);
	};

	return (
		<div className="grid gap-6">
			<div className="flex flex-wrap items-center justify-between gap-4">
				<h2 className="text-xl">{t("form.rooms.details.title")}</h2>
				{fields.length > 0 ? (
					<CustomCollapsibleListToolbar
						onExpandAll={list.expandAll}
						onCollapseAll={list.collapseAll}
					/>
				) : null}
			</div>

			<div className="grid gap-4">
				{fields.length > 0 ? (
					<Accordion
						type="multiple"
						value={list.value}
						onValueChange={list.onValueChange}
						className="grid gap-4"
					>
						{fields.map((field, index) => (
							<RoomCard
								key={field.id}
								form={form}
								index={index}
								onRemove={() => handleRemove(index)}
								readOnly={isInherited}
							/>
						))}
					</Accordion>
				) : null}

				{!isInherited ? (
					<div>
						<LoaderButton
							type="button"
							onClick={handleAddRoom}
							className="gap-2"
							icon={<AddIcon />}
							label={t("form.rooms.details.form.buttons.add")}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
};

export const RoomsDetails = withErrorBoundary(RoomsDetailsBase);

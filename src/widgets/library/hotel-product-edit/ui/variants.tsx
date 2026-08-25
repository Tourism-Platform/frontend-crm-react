import { Loader, PlusIcon, Trash2 } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
	Button,
	CustomField,
	Form,
	Separator,
	withErrorBoundary
} from "@/shared/ui";
import { useValueToTranslateLabel } from "@/shared/utils";

import {
	CURRENCY_OPTIONS,
	DEFAULT_EVENT_CURRENCY,
	type ENUM_CURRENCY_OPTIONS_TYPE
} from "@/entities/commission";
import {
	ENUM_FORM_HOTEL_ROOMS,
	ENUM_HOTEL_ROOM_CHARGE,
	type ENUM_HOTEL_ROOM_CHARGE_TYPE,
	type ENUM_HOTEL_ROOM_TYPE_TYPE,
	ENUM_SUPPLIER_SURCHARGE,
	HOTEL_ROOM_CHARGE_LABELS,
	HOTEL_ROOM_TYPE_LABELS,
	type IHotelVariant,
	type IHotelVariantWrite,
	type ISupplierFeeFormRow,
	type THotelRoomCharge,
	useCreateHotelVariantMutation,
	useDeleteHotelVariantMutation,
	useUpdateHotelVariantMutation
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

interface IHotelRoomFormRow {
	id?: string;
	typ: ENUM_HOTEL_ROOM_TYPE_TYPE | "";
	chargeTyp: ENUM_HOTEL_ROOM_CHARGE_TYPE;
	cost: string;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
	fees: ISupplierFeeFormRow[];
	fromDate: string;
	toDate: string;
	seasonChargeTyp: ENUM_HOTEL_ROOM_CHARGE_TYPE;
	seasonCost: string;
	seasonCurrency: ENUM_CURRENCY_OPTIONS_TYPE;
	seasonFees: ISupplierFeeFormRow[];
}

interface IHotelVariantForm {
	name: string;
	rooms: IHotelRoomFormRow[];
}

interface IHotelProductVariantsProps {
	supplierId: string;
	productId: string;
	variants?: IHotelVariant[];
}

const chargeToFormFields = (
	expenses: THotelRoomCharge | null | undefined
): Pick<IHotelRoomFormRow, "chargeTyp" | "cost" | "currency" | "fees"> => {
	if (!expenses) {
		return {
			chargeTyp: ENUM_HOTEL_ROOM_CHARGE.FIXED,
			cost: "",
			currency: DEFAULT_EVENT_CURRENCY,
			fees: []
		};
	}

	const money =
		expenses.typ === ENUM_HOTEL_ROOM_CHARGE.PER_DURATION
			? expenses.rate.cost
			: expenses.cost;

	return {
		chargeTyp: expenses.typ,
		cost: money != null ? String(money.val) : "",
		currency: money?.currency ?? DEFAULT_EVENT_CURRENCY,
		fees: expenses.fees ?? []
	};
};

const mapChargeFormToExpenses = (
	chargeTyp: ENUM_HOTEL_ROOM_CHARGE_TYPE,
	cost: string,
	currency: ENUM_CURRENCY_OPTIONS_TYPE,
	fees: ISupplierFeeFormRow[]
): THotelRoomCharge => {
	const money = {
		val: Number(cost) || 0,
		currency: currency || DEFAULT_EVENT_CURRENCY
	};
	const feesOrNull = fees.length ? fees : null;

	if (chargeTyp === ENUM_HOTEL_ROOM_CHARGE.PER_DURATION) {
		return {
			typ: ENUM_HOTEL_ROOM_CHARGE.PER_DURATION,
			rate: {
				typ: ENUM_SUPPLIER_SURCHARGE.FIXED,
				cost: money
			},
			fees: feesOrNull,
			markup: null
		};
	}

	return {
		typ: ENUM_HOTEL_ROOM_CHARGE.FIXED,
		cost: money,
		fees: feesOrNull,
		markup: null
	};
};

const emptyRoom = (): IHotelRoomFormRow => ({
	id: undefined,
	typ: "",
	chargeTyp: ENUM_HOTEL_ROOM_CHARGE.FIXED,
	cost: "",
	currency: DEFAULT_EVENT_CURRENCY,
	fees: [],
	fromDate: "",
	toDate: "",
	seasonChargeTyp: ENUM_HOTEL_ROOM_CHARGE.FIXED,
	seasonCost: "",
	seasonCurrency: DEFAULT_EVENT_CURRENCY,
	seasonFees: []
});

const emptyVariantForm = (): IHotelVariantForm => ({
	name: "",
	rooms: [emptyRoom()]
});

const roomToForm = (
	room: IHotelVariant["rooms"][number]
): IHotelRoomFormRow => {
	const base = chargeToFormFields(room.expenses);
	const rate = room.rates?.[0];
	const season = chargeToFormFields(rate?.expenses);

	return {
		id: room.id,
		typ: room.typ ?? "",
		...base,
		fromDate: rate?.fromDate ?? "",
		toDate: rate?.toDate ?? "",
		seasonChargeTyp: season.chargeTyp,
		seasonCost: season.cost,
		seasonCurrency: season.currency,
		seasonFees: season.fees
	};
};

const variantToForm = (variant?: IHotelVariant | null): IHotelVariantForm => {
	if (!variant) return emptyVariantForm();
	return {
		name: variant.name,
		rooms: variant.rooms.length
			? variant.rooms.map(roomToForm)
			: [emptyRoom()]
	};
};

const mapFormToWrite = (values: IHotelVariantForm): IHotelVariantWrite => ({
	name: values.name.trim(),
	rooms: values.rooms
		.filter((room) => room.typ)
		.map((room) => {
			const typ = room.typ as ENUM_HOTEL_ROOM_TYPE_TYPE;
			const expenses = mapChargeFormToExpenses(
				room.chargeTyp,
				room.cost,
				room.currency,
				room.fees
			);

			const hasRate = Boolean(room.fromDate.trim() && room.toDate.trim());
			const seasonCost =
				room.seasonCost.trim() !== "" ? room.seasonCost : room.cost;
			const rates = hasRate
				? [
						{
							fromDate: room.fromDate.trim(),
							toDate: room.toDate.trim(),
							expenses: mapChargeFormToExpenses(
								room.seasonChargeTyp,
								seasonCost,
								room.seasonCurrency,
								room.seasonFees
							)
						}
					]
				: null;

			return {
				...(room.id ? { [ENUM_FORM_HOTEL_ROOMS.ID]: room.id } : {}),
				typ,
				expenses,
				rates
			};
		})
});

const HotelProductVariantsBase: FC<IHotelProductVariantsProps> = ({
	supplierId,
	productId,
	variants = []
}) => {
	const { t } = useTranslation("hotel_product_edit_page");
	const roomTypeOptions = useValueToTranslateLabel(HOTEL_ROOM_TYPE_LABELS);
	const [selectedId, setSelectedId] = useState<string | "new">("new");

	const [createHotelVariant, { isLoading: isCreating }] =
		useCreateHotelVariantMutation();
	const [updateHotelVariant, { isLoading: isUpdating }] =
		useUpdateHotelVariantMutation();
	const [deleteHotelVariant, { isLoading: isDeleting }] =
		useDeleteHotelVariantMutation();

	const selectedVariant =
		selectedId === "new"
			? null
			: (variants.find((item) => item.id === selectedId) ?? null);

	const form = useForm<IHotelVariantForm>({
		mode: "onSubmit",
		defaultValues: variantToForm(selectedVariant)
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "rooms"
	});

	useEffect(() => {
		form.reset(variantToForm(selectedVariant));
	}, [selectedVariant, form, selectedId]);

	const isSaving = isCreating || isUpdating;

	const chargeOptions = useValueToTranslateLabel(HOTEL_ROOM_CHARGE_LABELS);

	const onSubmit = form.handleSubmit(async (values) => {
		if (!values.name.trim()) {
			toast.error(t("form.toasts.save.error"));
			return;
		}

		const data = mapFormToWrite(values);
		if (!data.rooms.length) {
			toast.error(t("form.toasts.save.error"));
			return;
		}

		try {
			if (selectedId === "new") {
				const created = await createHotelVariant({
					supplierId,
					productId,
					data
				}).unwrap();
				toast.success(t("form.toasts.save.success"));
				setSelectedId(created.id);
				return;
			}

			await updateHotelVariant({
				supplierId,
				productId,
				variantId: selectedId,
				data
			}).unwrap();
			toast.success(t("form.toasts.save.success"));
		} catch (error) {
			toast.error(t("form.toasts.save.error"));
			console.error(error);
		}
	});

	const handleDelete = async () => {
		if (selectedId === "new") {
			form.reset(emptyVariantForm());
			return;
		}

		try {
			await deleteHotelVariant({
				supplierId,
				productId,
				variantId: selectedId
			}).unwrap();
			toast.success(t("form.toasts.delete.success"));
			setSelectedId("new");
			form.reset(emptyVariantForm());
		} catch (error) {
			toast.error(t("form.toasts.delete.error"));
			console.error(error);
		}
	};

	return (
		<div className="grid gap-6">
			<div className="flex flex-wrap gap-2">
				{variants.map((variant) => (
					<Button
						key={variant.id}
						type="button"
						variant={
							selectedId === variant.id ? "default" : "outline"
						}
						size="sm"
						onClick={() => setSelectedId(variant.id)}
					>
						{variant.name}
					</Button>
				))}
				<Button
					type="button"
					variant={selectedId === "new" ? "default" : "outline"}
					size="sm"
					onClick={() => setSelectedId("new")}
				>
					<PlusIcon className="mr-1 h-4 w-4" />
					{t("form.variants.add")}
				</Button>
			</div>

			<Separator />

			<Form {...form}>
				<form onSubmit={onSubmit} className="grid gap-4">
					<CustomField
						control={form.control}
						name="name"
						t={t}
						label="form.variants.fields.name.label"
						placeholder="form.variants.fields.name.placeholder"
						fieldType="input"
					/>

					{fields.map((field, index) => (
						<div
							key={field.id}
							className="grid gap-3 rounded-md border p-4 md:grid-cols-2"
						>
							<input
								type="hidden"
								{...form.register(`rooms.${index}.id`)}
							/>
							<CustomField
								control={form.control}
								name={`rooms.${index}.typ`}
								t={t}
								label="form.variants.fields.roomTyp.label"
								placeholder="form.variants.fields.roomTyp.placeholder"
								fieldType="select"
								options={roomTypeOptions}
							/>
							<CustomField
								control={form.control}
								name={`rooms.${index}.chargeTyp`}
								t={t}
								label="form.variants.fields.chargeTyp.label"
								placeholder="form.variants.fields.chargeTyp.placeholder"
								fieldType="select"
								options={chargeOptions}
							/>
							<CustomField
								control={form.control}
								name={`rooms.${index}.cost`}
								t={t}
								label="form.variants.fields.cost.label"
								placeholder="form.variants.fields.cost.placeholder"
								fieldType="input"
								type="number"
								min={0}
								step="any"
							/>
							<CustomField
								control={form.control}
								name={`rooms.${index}.currency`}
								t={t}
								label="form.variants.fields.currency.label"
								placeholder="form.variants.fields.currency.placeholder"
								fieldType="select"
								options={CURRENCY_OPTIONS}
							/>
							<div className="md:col-span-2">
								<FeeLinesField
									control={form.control}
									name={`rooms.${index}.fees`}
								/>
							</div>
							<CustomField
								control={form.control}
								name={`rooms.${index}.fromDate`}
								t={t}
								label="form.variants.fields.fromDate.label"
								placeholder="form.variants.fields.fromDate.placeholder"
								fieldType="input"
							/>
							<CustomField
								control={form.control}
								name={`rooms.${index}.toDate`}
								t={t}
								label="form.variants.fields.toDate.label"
								placeholder="form.variants.fields.toDate.placeholder"
								fieldType="input"
							/>
							<CustomField
								control={form.control}
								name={`rooms.${index}.seasonChargeTyp`}
								t={t}
								label="form.variants.fields.seasonChargeTyp.label"
								placeholder="form.variants.fields.seasonChargeTyp.placeholder"
								fieldType="select"
								options={chargeOptions}
							/>
							<CustomField
								control={form.control}
								name={`rooms.${index}.seasonCost`}
								t={t}
								label="form.variants.fields.seasonCost.label"
								placeholder="form.variants.fields.seasonCost.placeholder"
								fieldType="input"
								type="number"
								min={0}
								step="any"
							/>
							<CustomField
								control={form.control}
								name={`rooms.${index}.seasonCurrency`}
								t={t}
								label="form.variants.fields.seasonCurrency.label"
								placeholder="form.variants.fields.seasonCurrency.placeholder"
								fieldType="select"
								options={CURRENCY_OPTIONS}
								className="md:col-span-2"
							/>
							<div className="md:col-span-2">
								<FeeLinesField
									control={form.control}
									name={`rooms.${index}.seasonFees`}
								/>
							</div>
							{fields.length > 1 ? (
								<div className="md:col-span-2 flex justify-end">
									<Button
										type="button"
										variant="ghost"
										size="sm"
										onClick={() => remove(index)}
									>
										<Trash2 className="mr-1 h-4 w-4" />
										{t("form.variants.buttons.delete")}
									</Button>
								</div>
							) : null}
						</div>
					))}

					<div className="flex flex-wrap justify-between gap-3">
						<Button
							type="button"
							variant="outline"
							onClick={() => append(emptyRoom())}
						>
							<PlusIcon className="mr-1 h-4 w-4" />
							{t("form.variants.add_room")}
						</Button>
						<div className="flex gap-2">
							{selectedId !== "new" || form.formState.isDirty ? (
								<Button
									type="button"
									variant="destructive"
									onClick={handleDelete}
									disabled={isDeleting}
								>
									{isDeleting && (
										<Loader className="mr-2 h-4 w-4 animate-spin" />
									)}
									{isDeleting
										? t("form.variants.buttons.deleting")
										: t("form.variants.buttons.delete")}
								</Button>
							) : null}
							<Button type="submit" size="lg" disabled={isSaving}>
								{isSaving && (
									<Loader className="mr-2 h-4 w-4 animate-spin" />
								)}
								{isSaving
									? t("form.variants.buttons.saving")
									: t("form.variants.buttons.save")}
							</Button>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
};

export const HotelProductVariants = withErrorBoundary(HotelProductVariantsBase);

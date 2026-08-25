import { Loader, PlusIcon } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
	ENUM_TRAIN_VARIANT_CHARGE,
	type ENUM_TRAIN_VARIANT_CHARGE_TYPE,
	type ISupplierFeeFormRow,
	type ITrainVariant,
	type ITrainVariantWrite,
	TRAIN_VARIANT_CHARGE_LABELS,
	useCreateTrainVariantMutation,
	useDeleteTrainVariantMutation,
	useUpdateTrainVariantMutation
} from "@/entities/supplier";

import { FeeLinesField } from "@/features/pricing";

interface ITrainVariantForm {
	name: string;
	chargeTyp: ENUM_TRAIN_VARIANT_CHARGE_TYPE;
	cost: string;
	currency: ENUM_CURRENCY_OPTIONS_TYPE;
	fees: ISupplierFeeFormRow[];
}

interface ITrainProductVariantsProps {
	supplierId: string;
	productId: string;
	variants?: ITrainVariant[];
}

const emptyForm = (): ITrainVariantForm => ({
	name: "",
	chargeTyp: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
	cost: "",
	currency: DEFAULT_EVENT_CURRENCY,
	fees: []
});

const variantToForm = (variant?: ITrainVariant | null): ITrainVariantForm => {
	if (!variant) return emptyForm();
	const expenses = variant.expenses;
	if (!expenses) {
		return {
			name: variant.name,
			chargeTyp: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
			cost: "",
			currency: DEFAULT_EVENT_CURRENCY,
			fees: []
		};
	}

	const money =
		expenses.typ === ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON
			? expenses.costPerPerson
			: expenses.cost;

	return {
		name: variant.name,
		chargeTyp: expenses.typ,
		cost: money != null ? String(money.val) : "",
		currency: money?.currency ?? DEFAULT_EVENT_CURRENCY,
		fees: expenses.fees ?? []
	};
};

const mapFormToWrite = (values: ITrainVariantForm): ITrainVariantWrite => {
	const money = {
		val: Number(values.cost) || 0,
		currency: values.currency || DEFAULT_EVENT_CURRENCY
	};
	const fees = values.fees.length ? values.fees : null;

	if (values.chargeTyp === ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON) {
		return {
			name: values.name.trim(),
			expenses: {
				typ: ENUM_TRAIN_VARIANT_CHARGE.PER_PERSON,
				costPerPerson: money,
				fees,
				markup: null
			}
		};
	}

	return {
		name: values.name.trim(),
		expenses: {
			typ: ENUM_TRAIN_VARIANT_CHARGE.FIXED,
			cost: money,
			fees,
			markup: null
		}
	};
};

const TrainProductVariantsBase: FC<ITrainProductVariantsProps> = ({
	supplierId,
	productId,
	variants = []
}) => {
	const { t } = useTranslation("train_product_edit_page");
	const [selectedId, setSelectedId] = useState<string | "new">("new");

	const [createTrainVariant, { isLoading: isCreating }] =
		useCreateTrainVariantMutation();
	const [updateTrainVariant, { isLoading: isUpdating }] =
		useUpdateTrainVariantMutation();
	const [deleteTrainVariant, { isLoading: isDeleting }] =
		useDeleteTrainVariantMutation();

	const selectedVariant =
		selectedId === "new"
			? null
			: (variants.find((item) => item.id === selectedId) ?? null);

	const form = useForm<ITrainVariantForm>({
		mode: "onSubmit",
		defaultValues: variantToForm(selectedVariant)
	});

	useEffect(() => {
		form.reset(variantToForm(selectedVariant));
	}, [selectedVariant, form, selectedId]);

	const isSaving = isCreating || isUpdating;

	const chargeOptions = useValueToTranslateLabel(TRAIN_VARIANT_CHARGE_LABELS);

	const onSubmit = form.handleSubmit(async (values) => {
		if (!values.name.trim()) {
			toast.error(t("form.toasts.save.error"));
			return;
		}

		const data = mapFormToWrite(values);

		try {
			if (selectedId === "new") {
				const created = await createTrainVariant({
					supplierId,
					productId,
					data
				}).unwrap();
				toast.success(t("form.toasts.save.success"));
				setSelectedId(created.id);
				return;
			}

			await updateTrainVariant({
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
			form.reset(emptyForm());
			return;
		}

		try {
			await deleteTrainVariant({
				supplierId,
				productId,
				variantId: selectedId
			}).unwrap();
			toast.success(t("form.toasts.delete.success"));
			setSelectedId("new");
			form.reset(emptyForm());
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
				<form onSubmit={onSubmit} className="grid gap-4 md:grid-cols-2">
					<CustomField
						control={form.control}
						name="name"
						t={t}
						label="form.variants.fields.name.label"
						placeholder="form.variants.fields.name.placeholder"
						fieldType="input"
						className="md:col-span-2"
					/>
					<CustomField
						control={form.control}
						name="chargeTyp"
						t={t}
						label="form.variants.fields.chargeTyp.label"
						placeholder="form.variants.fields.chargeTyp.placeholder"
						fieldType="select"
						options={chargeOptions}
					/>
					<CustomField
						control={form.control}
						name="cost"
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
						name="currency"
						t={t}
						label="form.variants.fields.currency.label"
						placeholder="form.variants.fields.currency.placeholder"
						fieldType="select"
						options={CURRENCY_OPTIONS}
						className="md:col-span-2"
					/>
					<div className="md:col-span-2">
						<FeeLinesField control={form.control} name="fees" />
					</div>
					<div className="md:col-span-2 flex justify-end gap-2">
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
				</form>
			</Form>
		</div>
	);
};

export const TrainProductVariants = withErrorBoundary(TrainProductVariantsBase);

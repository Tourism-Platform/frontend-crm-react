import { Loader } from "lucide-react";
import { type FC } from "react";
import { useTranslation } from "react-i18next";

import {
	Button,
	CustomField,
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	Form,
	Separator
} from "@/shared/ui";

import type { TEventOverride } from "@/entities/tour";
import { ENUM_FLIGHT_PRICING_TYPE } from "@/entities/tour";

import { FeeLinesField } from "@/features/pricing";

import {
	ENUM_FORM_OVERRIDE_PRODUCT,
	FORM_OVERRIDE_HOUSING_CHARGE_LIST,
	FORM_OVERRIDE_POLICY_LIST,
	FORM_OVERRIDE_PRICING_LIST,
	type TOverrideEventKind,
	useOverrideEventDialog
} from "../model";

interface IOverrideEventDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	kind: TOverrideEventKind;
	initialOverride?: TEventOverride | null;
	isSubmitting?: boolean;
	onConfirm: (data: TEventOverride) => void | Promise<void>;
}

export const OverrideEventDialog: FC<IOverrideEventDialogProps> = ({
	open,
	onOpenChange,
	kind,
	initialOverride,
	isSubmitting,
	onConfirm
}) => {
	const { t } = useTranslation("common_events");
	const { form, handleConfirm, showPolicy, showChargeTyp } =
		useOverrideEventDialog({
			open,
			kind,
			initialOverride,
			onConfirm
		});
	const pricingType = form.watch(ENUM_FORM_OVERRIDE_PRODUCT.PRICING_TYPE);
	const showHousingCharge =
		showChargeTyp && pricingType === ENUM_FLIGHT_PRICING_TYPE.FLAT_RATE;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="min-w-[720px] max-w-3xl">
				<DialogHeader>
					<DialogTitle>
						{t("override_product.dialog.title")}
					</DialogTitle>
					<DialogDescription>
						{t("override_product.dialog.description")}
					</DialogDescription>
				</DialogHeader>

				<Form {...form}>
					<div className="grid gap-4">
						{FORM_OVERRIDE_PRICING_LIST.map(({ key, ...item }) => (
							<CustomField
								key={key}
								control={form.control}
								name={key}
								t={t}
								{...item}
							/>
						))}
						{showHousingCharge
							? FORM_OVERRIDE_HOUSING_CHARGE_LIST().map(
									({ key, ...item }) => (
										<CustomField
											key={key}
											control={form.control}
											name={key}
											t={t}
											{...item}
										/>
									)
								)
							: null}
						<FeeLinesField
							control={form.control}
							name={ENUM_FORM_OVERRIDE_PRODUCT.FEES}
						/>
						{showPolicy ? (
							<>
								<Separator />
								{FORM_OVERRIDE_POLICY_LIST.map(
									({ key, ...item }) => (
										<CustomField
											key={key}
											control={form.control}
											name={key}
											t={t}
											{...item}
										/>
									)
								)}
							</>
						) : null}
					</div>
				</Form>

				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="button"
							variant="outline"
							disabled={isSubmitting}
						>
							{t("override_product.dialog.cancel")}
						</Button>
					</DialogClose>
					<Button
						type="button"
						onClick={handleConfirm}
						disabled={isSubmitting}
					>
						{isSubmitting ? (
							<Loader className="mr-2 h-4 w-4 animate-spin" />
						) : null}
						{isSubmitting
							? t("override_product.dialog.confirming")
							: t("override_product.dialog.confirm")}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

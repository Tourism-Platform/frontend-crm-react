import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { type FC, useEffect } from "react";
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

import {
	OPERATOR_GENERAL_INFO_SCHEMA,
	type TOperatorGeneralInfoSchema,
	useGetOperatorFinanceInfoQuery,
	useUpdateOperatorFinanceInfoMutation
} from "@/entities/finance";

import { GENERAL_INFO_LIST } from "../../model";

const GeneralInfoBase: FC = () => {
	const { t } = useTranslation("financial_settings_page_operator");
	const {
		data: generalInfoData,
		isError: isGeneralInfoError,
		isLoading: isGeneralInfoLoading
	} = useGetOperatorFinanceInfoQuery();
	const [updateOperatorFinanceInfo, { isLoading: isUpdating }] =
		useUpdateOperatorFinanceInfoMutation();

	const form = useForm<TOperatorGeneralInfoSchema>({
		resolver: zodResolver(OPERATOR_GENERAL_INFO_SCHEMA),
		mode: "onSubmit"
	});

	useEffect(() => {
		if (generalInfoData) {
			form.reset(generalInfoData);
		}
	}, [generalInfoData, form.reset]);

	useEffect(() => {
		if (isGeneralInfoError) {
			toast.error(t("general.form.toasts.save.error"));
		}
	}, [isGeneralInfoError, t]);

	async function handleSave(data: TOperatorGeneralInfoSchema) {
		try {
			await updateOperatorFinanceInfo(data).unwrap();
			toast.success(t("general.form.toasts.save.success"));
		} catch (e) {
			toast.error(t("general.form.toasts.save.error"));
			console.error(e);
		}
	}

	const isLoading =
		isUpdating || isGeneralInfoLoading || form.formState.isSubmitting;

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(handleSave)}
				className="flex flex-col gap-8"
			>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<h2 className="text-xl">
							{t("general.form.fields.default_tour_margin.label")}
						</h2>
						<p className="text-sm text-muted-foreground">
							{t(
								"general.form.fields.default_tour_margin.description"
							)}
						</p>
					</div>
					<CustomField
						control={form.control}
						{...GENERAL_INFO_LIST[0]}
						name={GENERAL_INFO_LIST[0].key}
						t={t}
					/>
				</div>
				<Separator />
				<div className="flex flex-col gap-6">
					<div className="flex flex-col gap-2">
						<h2 className="text-xl">
							{t("general.form.fields.staff_payouts.label")}
						</h2>
						<p className="text-sm text-muted-foreground">
							{t("general.form.fields.staff_payouts.description")}
						</p>
					</div>
					<CustomField
						control={form.control}
						{...GENERAL_INFO_LIST[1]}
						name={GENERAL_INFO_LIST[1].key}
						t={t}
					/>
				</div>

				<div>
					<Button type="submit" disabled={isLoading}>
						{isLoading ? (
							<>
								<Loader className="mr-2 h-4 w-4 animate-spin" />
								{isGeneralInfoLoading
									? t("general.form.buttons.loading")
									: t("general.form.buttons.saving")}
							</>
						) : (
							t("general.form.buttons.save")
						)}
					</Button>
				</div>
			</form>
		</Form>
	);
};

export const GeneralInfo = withErrorBoundary(GeneralInfoBase);

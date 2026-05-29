import type { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { cn } from "@/shared/lib";
import { Card, CardContent, CardHeader, Label, Separator } from "@/shared/ui";

import { OPERATOR_PAYMENT_METHOD_LABELS } from "../../constants";
import {
	ENUM_PAYMENT_ROUTE_METHODS,
	type TOperatorPaymentRoute
} from "../../types";

interface IPaymentRouteCardProps {
	route: TOperatorPaymentRoute;
	actions?: ReactNode;
}

type TField = {
	label: string;
	value: string;
	className?: string;
	href?: string;
};

function getRouteFields(
	route: TOperatorPaymentRoute,
	t: ReturnType<typeof useTranslation>["t"]
): TField[] {
	const { details, currency } = route;
	if (details.typ === ENUM_PAYMENT_ROUTE_METHODS.CLASSIC_SWIFT) {
		return [
			{
				label: t(
					"payment_settings.form.modal.fields.account_name_iban.label"
				),
				value: details.accountNameIban
			},
			{
				label: t("payment_settings.form.modal.fields.swift_bic.label"),
				value: details.swiftBic
			},
			{
				label: t("payment_settings.form.modal.fields.currency.label"),
				value: currency
			},
			{
				label: t("payment_settings.form.modal.fields.bank_name.label"),
				value: details.bankName
			},
			{
				label: t(
					"payment_settings.form.modal.fields.bank_address.label"
				),
				value: details.bankAddress
			},
			{
				label: t("payment_settings.form.modal.fields.note.label"),
				value: route.note || "--//--//--",
				className: "col-span-2"
			}
		];
	}

	// WISE — пары или одиночные поля
	return [
		{
			label: t(
				"payment_settings.form.modal.fields.account_id_email.label"
			),
			value: details.accountIdEmail
		},
		{
			label: t("payment_settings.form.modal.fields.currency.label"),
			value: currency
		},
		{
			label: t("payment_settings.form.modal.fields.payment_link.label"),
			value: details.paymentLink,
			href: details.paymentLink
		},
		{
			label: t("payment_settings.form.modal.fields.note.label"),
			value: route.note || "--//--//--",
			className: "col-span-2"
		}
	];
}

const RowPreview: FC<TField> = ({ label, value, href, className }) => (
	<div className={cn("flex flex-col gap-1", className)}>
		<Label>{label}:</Label>
		{href ? (
			<a
				href={href}
				target="_blank"
				rel="noopener noreferrer"
				className="text-sm text-primary hover:underline break-all"
			>
				{value}
			</a>
		) : (
			<p className="text-sm text-muted-foreground break-all">{value}</p>
		)}
	</div>
);

export const PaymentRouteCard: FC<IPaymentRouteCardProps> = ({
	route,
	actions
}) => {
	const { t } = useTranslation([
		"financial_settings_page_operator",
		"options"
	]);
	const rows = getRouteFields(route, t);

	return (
		<Card className="relative w-full py-4">
			<CardHeader className="block">
				<p className="text-xl font-semibold text-foreground">
					{route.internalLabel}
					<span className="text-muted-foreground font-normal mx-1.5">
						·
					</span>
					<span className="text-muted-foreground font-normal">
						{t(OPERATOR_PAYMENT_METHOD_LABELS[route.methodType], {
							ns: "options"
						})}
					</span>
				</p>
			</CardHeader>
			<Separator />
			<CardContent className="px-4">
				<div className="grid grid-cols-2 gap-2">
					{rows.map((row, key) => (
						<RowPreview {...row} key={key} />
					))}
				</div>
			</CardContent>
			{actions && (
				<div className="flex items-center gap-2 absolute top-3 right-3">
					{actions}
				</div>
			)}
		</Card>
	);
};

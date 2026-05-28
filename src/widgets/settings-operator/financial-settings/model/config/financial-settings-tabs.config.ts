import { Currency, GeneralInfo, PaymentSettings, TaxSettings } from "../../ui";
import {
	ENUM_FINANCIAL_SETTINGS_OPERATOR_TAB,
	type IFinancialSettingsOperatorTab
} from "../types/financial-settings-tabs.types";

export const FINANCIAL_SETTINGS_OPERATOR_TABS: IFinancialSettingsOperatorTab[] =
	[
		{
			type: ENUM_FINANCIAL_SETTINGS_OPERATOR_TAB.GENERAL,
			label: "tabs.general",
			slot: GeneralInfo
		},
		{
			type: ENUM_FINANCIAL_SETTINGS_OPERATOR_TAB.PAYMENT_SETTINGS,
			label: "tabs.receiving_payments",
			slot: PaymentSettings
		},
		{
			type: ENUM_FINANCIAL_SETTINGS_OPERATOR_TAB.TAX_SETTINGS,
			label: "tabs.tax_settings",
			slot: TaxSettings
		},
		{
			type: ENUM_FINANCIAL_SETTINGS_OPERATOR_TAB.CURRENCY,
			label: "tabs.currency",
			slot: Currency
		}
	];

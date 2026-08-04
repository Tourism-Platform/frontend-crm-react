import { Currency } from "../../../../shared/api/generated/Api";
import { OPERATOR_PAYMENT_ROUTES_PATHS } from "../../../../shared/api/generated/paths";

export type TReceivingPaymentsSeedItem =
	typeof OPERATOR_PAYMENT_ROUTES_PATHS.createPaymentRoute._types.body;

export const RECEIVING_PAYMENTS_SEED: readonly TReceivingPaymentsSeedItem[] = [
	{
		internal_label: "Main EUR account",
		currency: Currency.EUR,
		note: "Primary SWIFT route for EU clients",
		details: {
			typ: "classic_swift",
			account_name_iban: "Tour Firm LLC / DE89 3704 0044 0532 0130 00",
			swift_bic: "COBADEFFXXX",
			bank_name: "Commerzbank AG",
			bank_address: "Kaiserplatz, 60311 Frankfurt am Main, Germany"
		}
	},
	{
		internal_label: "USD SWIFT",
		currency: Currency.USD,
		note: null,
		details: {
			typ: "classic_swift",
			account_name_iban: "Tour Firm Inc / US12 3456 7890 1234 5678 90",
			swift_bic: "CHASUS33",
			bank_name: "JPMorgan Chase Bank",
			bank_address: "383 Madison Avenue, New York, NY 10179, USA"
		}
	},
	{
		internal_label: "Wise payments",
		currency: Currency.USD,
		note: "Online payment link",
		details: {
			typ: "custom",
			items: [
				{ key: "account_id_email", val: "payments@tourfirm.example" },
				{ key: "payment_link", val: "https://wise.com/pay/me/tourfirm" }
			]
		}
	}
] as const;

import { ClientPaymentStatus } from "../../../../shared/api/generated/Api";

export type TClientPaymentSeedItem = {
	amount: number;
	status: ClientPaymentStatus;
	note?: string;
	attachment_count: number;
	created_at: string;
	amount_uzs?: number;
	exchange_rate?: number;
};

export const CLIENT_PAYMENT_SEED: readonly TClientPaymentSeedItem[] = [
	{
		amount: 1500,
		status: ClientPaymentStatus.Confirmed,
		note: "First payment",
		attachment_count: 1,
		created_at: "2024-12-01T10:00:00Z",
		amount_uzs: 19_200_000,
		exchange_rate: 12_800
	},
	{
		amount: 2300,
		status: ClientPaymentStatus.NotConfirmed,
		note: "Pending payment",
		attachment_count: 0,
		created_at: "2024-12-05T14:30:00Z",
		amount_uzs: 29_440_000,
		exchange_rate: 12_800
	},
	{
		amount: 750,
		status: ClientPaymentStatus.Confirmed,
		attachment_count: 0,
		created_at: "2024-12-10T09:15:00Z",
		amount_uzs: 9_600_000,
		exchange_rate: 12_800
	},
	{
		amount: 3100,
		status: ClientPaymentStatus.NotConfirmed,
		attachment_count: 0,
		created_at: "2024-12-15T16:45:00Z",
		amount_uzs: 39_680_000,
		exchange_rate: 12_800
	},
	{
		amount: 1250,
		status: ClientPaymentStatus.Confirmed,
		attachment_count: 0,
		created_at: "2024-12-20T11:20:00Z",
		amount_uzs: 16_000_000,
		exchange_rate: 12_800
	},
	{
		amount: 500,
		status: ClientPaymentStatus.NotConfirmed,
		note: "Partially paid",
		attachment_count: 0,
		created_at: "2024-12-21T09:00:00Z",
		amount_uzs: 6_400_000,
		exchange_rate: 12_800
	},
	{
		amount: 4200,
		status: ClientPaymentStatus.Confirmed,
		attachment_count: 0,
		created_at: "2024-12-22T14:15:00Z",
		amount_uzs: 53_760_000,
		exchange_rate: 12_800
	},
	{
		amount: 1100,
		status: ClientPaymentStatus.NotConfirmed,
		note: "Awaiting confirmation",
		attachment_count: 0,
		created_at: "2024-12-23T11:45:00Z",
		amount_uzs: 14_080_000,
		exchange_rate: 12_800
	},
	{
		amount: 2750,
		status: ClientPaymentStatus.Confirmed,
		attachment_count: 0,
		created_at: "2024-12-24T16:30:00Z",
		amount_uzs: 35_200_000,
		exchange_rate: 12_800
	},
	{
		amount: 3500,
		status: ClientPaymentStatus.NotConfirmed,
		attachment_count: 0,
		created_at: "2024-12-25T10:00:00Z",
		amount_uzs: 44_800_000,
		exchange_rate: 12_800
	}
] as const;

export function buildPaymentAttachmentFile(orderNumber: string): File {
	const label = `Payment receipt ${orderNumber}`;
	const content = `%PDF-1.4
1 0 obj<< /Type /Catalog /Pages 2 0 R >>endobj
2 0 obj<< /Type /Pages /Kids [3 0 R] /Count 1 >>endobj
3 0 obj<< /Type /Page /Parent 2 0 R /MediaBox [0 0 300 144] >>endobj
trailer<< /Root 1 0 R >>
%%EOF
${label}
`;
	return new File([content], `${label}.pdf`, { type: "application/pdf" });
}

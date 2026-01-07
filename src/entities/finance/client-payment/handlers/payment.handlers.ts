import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";
import { type TFileMetadata } from "@/shared/hooks";

import { PAYMENTS_MOCK } from "../mock";
import {
	ENUM_PAYMENT_STATUS,
	type IPaymentBackend,
	type IPaymentPaginatedResponseBackend,
	type TPaymentStatusCounts
} from "../types";

const BASE_URL = ENV.VITE_API_URL || "";
const DEFAULT_FILE_URL =
	"https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VCAE65snBIiK1zJ4RHlMC0E6u5pUdLos7WFtX";

const processFiles = (
	files?: Pick<TFileMetadata, "name" | "size" | "type">[]
): TFileMetadata[] | undefined => {
	if (!files) return undefined;
	return files.map((f, index) => {
		return {
			id: `mock-file-${Date.now()}-${index}`,
			name: f.name || "uploaded-file.pdf",
			size: f.size || 1024 * 1024,
			type: f.type || "application/pdf",
			url: DEFAULT_FILE_URL
		};
	});
};

let payments = [...PAYMENTS_MOCK];

export const financeClientPaymentHandlers = [
	http.get(
		`${BASE_URL}/finance/client-payments/available-orders`,
		async (): Promise<HttpResponse<string[]>> => {
			await delay(500);
			const availableOrders: string[] = [
				"ORD-12345",
				"ORD-12346",
				"ORD-12347",
				"ORD-12348",
				"ORD-12349"
			];
			return HttpResponse.json(availableOrders, { status: 200 });
		}
	),
	http.get(
		`${BASE_URL}/finance/client-payments`,
		async ({
			request
		}): Promise<HttpResponse<IPaymentPaginatedResponseBackend>> => {
			await delay(500);
			const url = new URL(request.url);
			const page = Number(url.searchParams.get("page")) || 1;
			const limit = Number(url.searchParams.get("limit")) || 10;
			const search = url.searchParams.get("search");
			const status = url.searchParams
				.get("status")
				?.split(",")
				.filter(Boolean);

			const statusCounts = payments.reduce(
				(acc: Record<string, number>, current) => {
					acc[current.status] = (acc[current.status] || 0) + 1;
					return acc;
				},
				Object.values(ENUM_PAYMENT_STATUS).reduce(
					(acc: Record<string, number>, status) => {
						acc[status] = 0;
						return acc;
					},
					{} as Record<string, number>
				)
			) as TPaymentStatusCounts;

			let filteredPayments = [...payments];

			if (search) {
				const query = search.toLowerCase();
				filteredPayments = filteredPayments.filter(
					(p) =>
						p.payment_id.toLowerCase().includes(query) ||
						p.order_id.toLowerCase().includes(query)
				);
			}

			if (status && status.length > 0) {
				filteredPayments = filteredPayments.filter(
					(p) => status && status.includes(p.status)
				);
			}

			const start = (page - 1) * limit;
			const end = start + limit;
			const pagedData = filteredPayments.slice(start, end);

			return HttpResponse.json(
				{
					data: pagedData,
					total: filteredPayments.length,
					status_counts: statusCounts
				},
				{ status: 200 }
			);
		}
	),

	http.post(`${BASE_URL}/finance/client-payments`, async ({ request }) => {
		await delay(500);
		const body = (await request.json()) as Partial<IPaymentBackend>;

		const newPayment: IPaymentBackend = {
			...body,
			id: (payments.length + 1).toString(),
			payment_id:
				body.payment_id ||
				`INV-${Math.floor(Math.random() * 10000)
					.toString()
					.padStart(4, "0")}`,
			order_id: body.order_id ?? "",
			date_created: new Date().toISOString(),
			amount: body.amount ?? 0,
			currency: body.currency || "USD",
			status: body.order_id
				? ENUM_PAYMENT_STATUS.ASSIGNED
				: ENUM_PAYMENT_STATUS.NOT_ASSIGNED,
			files: processFiles(body.files)
		} as IPaymentBackend;

		payments.push(newPayment);

		return HttpResponse.json(newPayment, { status: 201 });
	}),

	http.patch(
		`${BASE_URL}/finance/client-payments/:id`,
		async ({ request, params }) => {
			await delay(500);
			const { id } = params;
			const body = (await request.json()) as Partial<IPaymentBackend>;
			const index = payments.findIndex((p) => p.id === id);

			if (index !== -1) {
				const status = body.order_id
					? ENUM_PAYMENT_STATUS.ASSIGNED
					: body.status || payments[index].status;

				payments[index] = {
					...payments[index],
					...body,
					status,
					files: processFiles(body.files) || payments[index].files
				};
				return HttpResponse.json(payments[index], { status: 200 });
			}

			return new HttpResponse(null, { status: 404 });
		}
	),

	http.delete(
		`${BASE_URL}/finance/client-payments/:id`,
		async ({ params }) => {
			await delay(500);
			const { id } = params;
			payments = payments.filter((p) => p.id !== id);
			return new HttpResponse(null, { status: 204 });
		}
	)
];

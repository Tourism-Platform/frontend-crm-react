import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";
import { type TFileMetadata } from "@/shared/hooks";

import { SUPPLIER_PAYMENTS_MOCK } from "../mock";
import {
	ENUM_SUPPLIER_PAYMENT_STATUS,
	type ISupplierPaymentBackend,
	type ISupplierPaymentPaginatedResponseBackend,
	type TSupplierPaymentStatusCounts
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

const payments = [...SUPPLIER_PAYMENTS_MOCK];

export const financeSupplierPaymentHandlers = [
	http.get(
		`${BASE_URL}/finance/supplier-payments`,
		async ({
			request
		}): Promise<HttpResponse<ISupplierPaymentPaginatedResponseBackend>> => {
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
				Object.values(ENUM_SUPPLIER_PAYMENT_STATUS).reduce(
					(acc: Record<string, number>, status) => {
						acc[status] = 0;
						return acc;
					},
					{} as Record<string, number>
				)
			) as TSupplierPaymentStatusCounts;

			let filteredPayments = [...payments];

			if (search) {
				const query = search.toLowerCase();
				filteredPayments = filteredPayments.filter(
					(p) =>
						p.id.toLowerCase().includes(query) ||
						p.order_id.toLowerCase().includes(query) ||
						p.supplier.toLowerCase().includes(query)
				);
			}

			if (status && status.length > 0) {
				filteredPayments = filteredPayments.filter((p) =>
					status.includes(p.status)
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

	http.patch(
		`${BASE_URL}/finance/supplier-payments/:id`,
		async ({ request, params }) => {
			await delay(500);
			const { id } = params;
			const body =
				(await request.json()) as Partial<ISupplierPaymentBackend>;
			const index = payments.findIndex((p) => p.id === id);

			if (index !== -1) {
				payments[index] = {
					...payments[index],
					...body,
					status: ENUM_SUPPLIER_PAYMENT_STATUS.CONFIRMED,
					files: processFiles(body.files) || payments[index].files
				};
				return HttpResponse.json(payments[index], { status: 200 });
			}

			return new HttpResponse(null, { status: 404 });
		}
	)
];

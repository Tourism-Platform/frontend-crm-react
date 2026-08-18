import { HttpResponse } from "msw";

import { createMockHandler } from "@/shared/api";
import type { PackageCreate, TourPackageModel } from "@/shared/api";

import { createPackageMock } from "../mock/package.mock";

const packagesByOption = new Map<string, TourPackageModel[]>();

const optionKey = (tourId: string, optionId: string) => `${tourId}:${optionId}`;

const listForOption = (tourId: string, optionId: string) => {
	const key = optionKey(tourId, optionId);
	const existing = packagesByOption.get(key);
	if (existing) return existing;
	const initial: TourPackageModel[] = [];
	packagesByOption.set(key, initial);
	return initial;
};

export const tourPackageHandlers = [
	createMockHandler(
		{
			url: "/tour/:tourId/:optionId/package",
			method: "GET"
		},
		async ({ params }) => {
			const tourId = String(params.tourId);
			const optionId = String(params.optionId);
			return HttpResponse.json(listForOption(tourId, optionId));
		}
	),
	createMockHandler<PackageCreate>(
		{
			url: "/tour/:tourId/:optionId/package",
			method: "POST"
		},
		async ({ params, body }) => {
			const tourId = String(params.tourId);
			const optionId = String(params.optionId);
			const created = createPackageMock({
				id: crypto.randomUUID(),
				tour_option_id: optionId,
				name: body.name,
				expenses: body.expenses as TourPackageModel["expenses"],
				fees: (body.fees as TourPackageModel["fees"]) ?? null,
				markup: (body.markup as TourPackageModel["markup"]) ?? null,
				supplier_id: body.supplier_id ?? null
			});
			listForOption(tourId, optionId).push(created);
			return HttpResponse.json(created);
		}
	),
	createMockHandler(
		{
			url: "/tour/:tourId/:optionId/package/:packageId",
			method: "GET"
		},
		async ({ params }) => {
			const tourId = String(params.tourId);
			const optionId = String(params.optionId);
			const packageId = String(params.packageId);
			const found = listForOption(tourId, optionId).find(
				(item) => item.id === packageId
			);
			if (!found) {
				return new HttpResponse(null, { status: 404 });
			}
			return HttpResponse.json(found);
		}
	),
	createMockHandler<PackageCreate>(
		{
			url: "/tour/:tourId/:optionId/package/:packageId",
			method: "PATCH"
		},
		async ({ params, body }) => {
			const tourId = String(params.tourId);
			const optionId = String(params.optionId);
			const packageId = String(params.packageId);
			const list = listForOption(tourId, optionId);
			const index = list.findIndex((item) => item.id === packageId);
			if (index < 0) {
				return new HttpResponse(null, { status: 404 });
			}
			const current = list[index];
			const updated = createPackageMock({
				...current,
				name: body.name ?? current.name,
				expenses:
					(body.expenses as TourPackageModel["expenses"]) ??
					current.expenses,
				fees:
					body.fees === undefined
						? current.fees
						: ((body.fees as TourPackageModel["fees"]) ?? null),
				markup:
					body.markup === undefined
						? current.markup
						: ((body.markup as TourPackageModel["markup"]) ?? null),
				supplier_id:
					body.supplier_id === undefined
						? current.supplier_id
						: (body.supplier_id ?? null)
			});
			list[index] = updated;
			return HttpResponse.json(updated);
		}
	)
];

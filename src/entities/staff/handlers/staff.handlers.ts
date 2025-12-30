import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";

import { ENUM_COMMISSION_OPTIONS } from "@/entities/commission";

import { mockStaffMembers } from "../mock";
import {
	ENUM_STAFF_ROLE_OPTIONS,
	ENUM_STAFF_STATUS_OPTIONS,
	type IStaffBackend
} from "../types";

const BASE_URL = ENV.VITE_API_URL || "";

let staff = [...mockStaffMembers];

export const staffHandlers = [
	http.get(`${BASE_URL}/staff`, async () => {
		await delay(800);
		return HttpResponse.json(staff, { status: 200 });
	}),

	http.post(`${BASE_URL}/staff`, async ({ request }) => {
		await delay(1000);
		const body = (await request.json()) as Partial<IStaffBackend>;
		const newMember: IStaffBackend = {
			...body,
			id: (staff.length + 1).toString(),
			first_name: "New",
			last_name: "Member",
			email: body.email || "new@example.com",
			role: body.role || ENUM_STAFF_ROLE_OPTIONS.SALES_MANAGER,
			status: ENUM_STAFF_STATUS_OPTIONS.PENDING,
			type: ENUM_COMMISSION_OPTIONS.FIXED,
			split: null
		} as IStaffBackend;
		staff.push(newMember);
		return HttpResponse.json(newMember, { status: 201 });
	}),

	http.patch(`${BASE_URL}/staff/:id`, async ({ params, request }) => {
		await delay(1000);
		const { id } = params;
		const body = (await request.json()) as Partial<IStaffBackend>;
		const index = staff.findIndex((s) => s.id === id);
		if (index !== -1) {
			staff[index] = { ...staff[index], ...body };
			return HttpResponse.json(staff[index], { status: 200 });
		}
		return new HttpResponse(null, { status: 404 });
	}),

	http.delete(`${BASE_URL}/staff/:id`, async ({ params }) => {
		await delay(800);
		const { id } = params;
		staff = staff.filter((s) => s.id !== id);
		return new HttpResponse(null, { status: 204 });
	})
];

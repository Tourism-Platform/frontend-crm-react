import { HttpResponse, delay, http } from "msw";

import { ENV } from "@/shared/config";
import type { TFileMetadata } from "@/shared/hooks";

import { BUSINESS_DOCUMENTS_MOCK } from "../mock";

const BASE_URL = ENV.VITE_API_URL || "";

let documentsStore = [...BUSINESS_DOCUMENTS_MOCK];

export const businessDocumentsHandlers = [
	http.get(`${BASE_URL}/user/business-documents`, async () => {
		await delay(600);
		return HttpResponse.json(documentsStore, { status: 200 });
	}),

	http.post(`${BASE_URL}/user/business-documents`, async ({ request }) => {
		await delay(1000);
		const formData = await request.formData();
		const file = formData.get("file") as File;

		if (!file) {
			return HttpResponse.json(
				{ message: "No file provided" },
				{ status: 400 }
			);
		}

		const newDocument: TFileMetadata = {
			id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
			name: file.name,
			size: file.size,
			type: file.type,
			url: "https://ul5vcs6l0p.ufs.sh/f/iizX6pu5Eb0VCAE65snBIiK1zJ4RHlMC0E6u5pUdLos7WFtX"
		};

		documentsStore.push(newDocument);
		return HttpResponse.json(newDocument, { status: 201 });
	}),

	http.delete(
		`${BASE_URL}/user/business-documents/:documentId`,
		async ({ params }) => {
			await delay(500);
			const { documentId } = params;
			documentsStore = documentsStore.filter(
				(doc) => doc.id !== documentId
			);
			return new HttpResponse(null, { status: 204 });
		}
	)
];

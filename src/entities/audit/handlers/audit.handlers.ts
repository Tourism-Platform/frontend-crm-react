import { HttpResponse } from "msw";

import { AUDIT_PATHS, createMockHandler, toListResponse } from "@/shared/api";

import { AUDIT_LOG_MOCK } from "../mock";

export const auditHandlers = [
	createMockHandler(AUDIT_PATHS.listOrgAudit, ({ query }) => {
		const userId = query.get("user_id");

		return HttpResponse.json(
			toListResponse(
				AUDIT_LOG_MOCK.filter(
					(log) => !userId || log.user_id === userId
				),
				query
			)
		);
	})
];

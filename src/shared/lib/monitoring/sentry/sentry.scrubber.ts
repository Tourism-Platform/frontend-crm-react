const FILTERED = "[Filtered]";

const SENSITIVE_QUERY_PARAM =
	/([?&](?:token|access_token|refresh_token|api_key|key|password|secret|signature)=)[^&#\s"]+/gi;

/**
 * Клиентская чистка до отправки: чувствительные query-параметры в URL.
 * Поля по именам (password, token…) дополнительно режет Data Scrubber
 * на стороне Sentry
 */
export const scrubPayload = <T>(payload: T): T => {
	try {
		return JSON.parse(
			JSON.stringify(payload).replace(
				SENSITIVE_QUERY_PARAM,
				`$1${FILTERED}`
			)
		) as T;
	} catch {
		return payload;
	}
};

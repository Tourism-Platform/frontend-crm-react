/**
 * Генерация TypeScript-типов из OpenAPI-спецификации.
 *
 * Использование: npx tsx --env-file=.env scripts/generate-api-types.ts
 */

import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { generateApi } from "swagger-typescript-api";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL = process.env.VITE_API_URL;
const PROJECT_ROOT = resolve(__dirname, "..");
const OUTPUT_DIR = join(PROJECT_ROOT, "src/shared/api/generated");

if (!API_URL) {
	console.error("❌ VITE_API_URL is not defined in .env");
	process.exit(1);
}

const SPEC_URL = API_URL.endsWith("/openapi.json")
	? API_URL
	: `${API_URL.replace(/\/$/, "")}/openapi.json`;

async function main() {
	console.log(`📦 Generating Api.ts from ${SPEC_URL}...`);

	await generateApi({
		fileName: "Api.ts",
		output: OUTPUT_DIR,
		url: SPEC_URL,
		generateClient: false,
		extractEnums: true,
		extractRequestParams: true,
		extractRequestBody: true,
	});

	console.log("✅ Api.ts generated");
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});

/**
 * Генерация TypeScript-типов из OpenAPI-спецификации.
 *
 * Использование: npx tsx --env-file=.env scripts/generate-api-types.ts [local]
 * local — спека из API_SPEC_FILE (по умолчанию data/backend/openapi.json) вместо VITE_API_URL
 */

import { existsSync } from "fs";
import { dirname, join, resolve } from "path";
import { fileURLToPath } from "url";
import { generateApi } from "swagger-typescript-api";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const IS_LOCAL = process.argv.slice(2).includes("local");
const API_URL = process.env.VITE_API_URL;
const PROJECT_ROOT = resolve(__dirname, "..");
const OUTPUT_DIR = join(PROJECT_ROOT, "src/shared/api/generated");
const SPEC_FILE = resolve(PROJECT_ROOT, process.env.API_SPEC_FILE ?? "data/backend/openapi.json");

if (!IS_LOCAL && !API_URL) {
	console.error("❌ VITE_API_URL is not defined in .env");
	process.exit(1);
}

if (IS_LOCAL && !existsSync(SPEC_FILE)) {
	console.error(`❌ Spec file not found: ${SPEC_FILE}`);
	process.exit(1);
}

const SPEC_URL = API_URL?.endsWith("/openapi.json")
	? API_URL
	: `${API_URL?.replace(/\/$/, "")}/openapi.json`;
const SPEC_SOURCE = IS_LOCAL ? SPEC_FILE : SPEC_URL;

async function main() {
	console.log(`📦 Generating Api.ts from ${SPEC_SOURCE}...`);

	await generateApi({
		fileName: "Api.ts",
		output: OUTPUT_DIR,
		...(IS_LOCAL ? { input: SPEC_FILE } : { url: SPEC_URL }),
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

/**
 * Скрипт генерации констант API-путей и типов из OpenAPI-спецификации.
 * Группирует пути по тегам и создаёт отдельный файл на каждый тег.
 *
 * Использование: npx tsx --env-file=.env scripts/generate-api-paths.ts
 */

import { writeFileSync, mkdirSync } from "fs";
import { join, dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { generateApi } from "swagger-typescript-api";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const API_URL = process.env.VITE_API_URL;
const PROJECT_ROOT = resolve(__dirname, "..");
const OUTPUT_DIR = join(PROJECT_ROOT, "src/shared/api/generated/paths");
const TYPES_OUTPUT = join(PROJECT_ROOT, "src/shared/api/generated");

if (!API_URL) {
	console.error("❌ VITE_API_URL is not defined in .env");
	process.exit(1);
}

const SPEC_URL = API_URL.endsWith('/openapi.json') ? API_URL : `${API_URL.replace(/\/$/, '')}/openapi.json`;

interface OpenAPIOperation {
	tags?: string[];
	summary?: string;
	operationId?: string;
	parameters?: Array<{
		name: string;
		in: string;
		required?: boolean;
		schema?: { type?: string; $ref?: string; items?: { $ref?: string } };
	}>;
	requestBody?: {
		content?: Record<string, {
			schema?: any;
		}>;
	};
	responses?: Record<
		string,
		{
			content?: Record<string, {
				schema?: any;
			}>;
		}
	>;
}

interface OpenAPIPathItem {
	[method: string]: OpenAPIOperation;
}

interface OpenAPISpec {
	paths: Record<string, OpenAPIPathItem>;
}

interface PathEntry {
	name: string;
	path: string;
	method: string;
	pathParams: string[];
	bodyType: string;
	queryType: string;
	responseType: string;
	deps: string[];
}

function toPascalCase(str: string): string {
	return str
		.replace(/[^a-zA-Z0-9]/g, " ")
		.split(/\s+/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join("");
}

function summaryToName(summary: string): string {
	return summary
		.replace(/[^a-zA-Z0-9\s]/g, "")
		.split(/\s+/)
		.map((word, i) =>
			i === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
		)
		.join("");
}

function operationIdToName(operationId: string): string {
	const parts = operationId.split("_");
	const httpMethods = ["get", "post", "patch", "delete", "put"];
	if (httpMethods.includes(parts[parts.length - 1])) parts.pop();

	const cleaned = parts.filter(
		(p) => !p.startsWith("{") && p !== "" && !/^[a-f0-9-]{36}$/.test(p)
	);

	return cleaned
		.map((part, i) =>
			i === 0 ? part.toLowerCase() : part.charAt(0).toUpperCase() + part.slice(1).toLowerCase()
		)
		.join("");
}

function getTSFromSchema(schema: any): { type: string, deps: string[] } {
	if (!schema || (Object.keys(schema).length === 0)) return { type: "void", deps: [] };

	if (schema.$ref) {
		const rawName = schema.$ref.split("/").pop()!;
		const name = toPascalCase(rawName);
		return { type: name, deps: [name] };
	}

	if (schema.anyOf || schema.oneOf) {
		const variants = (schema.anyOf || schema.oneOf) as any[];
		const types: string[] = [];
		const deps = new Set<string>();

		for (const variant of variants) {
			const info = getTSFromSchema(variant);
			types.push(info.type);
			info.deps.forEach(d => deps.add(d));
		}
		// Убираем дубли и void из Union, если есть другие типы
		const uniqueTypes = Array.from(new Set(types)).filter(t => t !== "void" || types.length === 1);
		return { type: uniqueTypes.join(" | "), deps: Array.from(deps) };
	}

	if (schema.allOf) {
		const variants = schema.allOf as any[];
		const types: string[] = [];
		const deps = new Set<string>();

		for (const variant of variants) {
			const info = getTSFromSchema(variant);
			types.push(info.type);
			info.deps.forEach(d => deps.add(d));
		}
		return { type: types.join(" & "), deps: Array.from(deps) };
	}

	if (schema.type === "array") {
		const info = getTSFromSchema(schema.items);
		return { type: `${info.type}[]`, deps: info.deps };
	}

	if (Array.isArray(schema.type)) {
		const types = schema.type.map((t: string) => t === "integer" ? "number" : t);
		return { type: types.join(" | "), deps: [] };
	}

	if (schema.type === "integer") return { type: "number", deps: [] };
	if (schema.type === "null") return { type: "null", deps: [] };
	
	return { type: schema.type || "any", deps: [] };
}

function resolveSchemaType(schema: any, operationId: string, prefix: string): { type: string, deps: string[] } {
	if (!schema) return { type: "void", deps: [] };
	
	const info = getTSFromSchema(schema);
	// Пропускаем все простые типы, Union, Intersection и Массивы.
	// Оставляем генерацию имен только для "чистых" объектов ({}) или "any"
	if (
		info.type !== "any" && 
		info.type !== "object" && 
		!info.type.startsWith("{")
	) {
		return info;
	}

	// Для инлайновых объектов создаем именованный тип
	const typeName = `${prefix}${toPascalCase(operationId)}`;
	return { type: typeName, deps: [typeName] };
}

function resolveQueryType(params: any[] | undefined): { type: string, deps: string[] } {
	const queryParams = params?.filter(p => p.in === "query") || [];
	if (queryParams.length === 0) return { type: "void", deps: [] };

	const parts: string[] = [];
	const deps = new Set<string>();

	for (const p of queryParams) {
		const info = getTSFromSchema(p.schema);
		info.deps.forEach(d => deps.add(d));
		parts.push(`${p.name}${p.required ? '' : '?'}: ${info.type}`);
	}

	return { type: `{ ${parts.join(", ")} }`, deps: Array.from(deps) };
}

function tagToFileName(tag: string): string {
	return tag.toLowerCase().replace(/[&]/g, "-").replace(/\s+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function tagToObjectName(tag: string): string {
	return tag.replace(/[&]/g, "_").replace(/\s+/g, "_").replace(/_+/g, "_").toUpperCase() + "_PATHS";
}

function extractPathParams(path: string): string[] {
	const matches = path.matchAll(/\{(\w+)\}/g);
	return [...matches].map((m) => m[1]);
}

function pathToTemplateLiteral(path: string): string {
	return path.replace(/\{(\w+)\}/g, (_, name) => `\${${toCamelCase(name)}}`);
}

function toCamelCase(str: string): string {
	return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase());
}

function generateFileContent(tag: string, entries: PathEntry[]): string {
	const objectName = tagToObjectName(tag);
	const allDeps = Array.from(new Set(entries.flatMap(e => e.deps)))
		.filter(t => t !== "void" && t !== "any" && !t.includes("[]"));

	const lines = entries.map((entry) => {
		const params = entry.pathParams;
		const method = entry.method.toUpperCase();
		const types = `_types: {} as { body: ${entry.bodyType}, query: ${entry.queryType}, response: ${entry.responseType} }`;

		if (params.length > 0) {
			const paramList = params.map((p) => `${toCamelCase(p)}: string`).join(", ");
			return `\t${entry.name}: (${paramList}) => ({ url: \`${pathToTemplateLiteral(entry.path)}\`, method: "${method}", ${types} }) as const`;
		}
		return `\t${entry.name}: { url: "${entry.path}", method: "${method}", ${types} } as const`;
	});

	const seen = new Set<string>();
	const uniqueLines = lines.filter((line) => {
		const name = line.match(/\t(\w+):/)?.[1];
		if (!name || seen.has(name)) return false;
		seen.add(name);
		return true;
	});

	return [
		// "/* eslint-disable @typescript-eslint/naming-convention */",
		allDeps.length > 0 ? `import type {\n${allDeps.sort().map(t => `\t${t}`).join(",\n")}\n} from \"../Api\";\n` : "",
		"// AUTO-GENERATED — не редактировать вручную",
		"// Сгенерировано скриптом scripts/generate-api-paths.ts",
		"",
		`export const ${objectName} = {`,
		uniqueLines.join(",\n"),
		"} as const;",
	].join("\n");
}

async function main() {
	console.log(`🚀 Codegen started from ${SPEC_URL}...`);

	// 1. Генерируем типы
	console.log("📦 Step 1: Generating Api.ts...");
	await generateApi({
		fileName: "Api.ts",
		output: TYPES_OUTPUT,
		url: SPEC_URL,
		generateClient: false,
		extractEnums: true,
		extractRequestParams: true,
		extractRequestBody: true,
		silent: true,
	});

	// 2. Генерируем пути
	console.log("🔗 Step 2: Parsing spec & generating pathways...");
	const response = await fetch(SPEC_URL!);
	const spec: OpenAPISpec = await response.json() as OpenAPISpec;
	const tagMap = new Map<string, PathEntry[]>();

	for (const [path, methods] of Object.entries(spec.paths)) {
		for (const method of ["get", "post", "put", "patch", "delete"]) {
			const operation = (methods as any)[method] as OpenAPIOperation | undefined;
			if (!operation) continue;

			const operationId = operation.operationId ?? `${method}_${path}`;
			const name = operation.summary ? summaryToName(operation.summary) : operationIdToName(operationId);
			
			const reqContent = operation.requestBody?.content;
			const bodySchema = reqContent ? Object.values(reqContent)[0]?.schema : undefined;
			const bodyInfo = resolveSchemaType(bodySchema, operationId, "Body");
			
			const queryInfo = resolveQueryType(operation.parameters);
			
			const resContent = (operation.responses?.["200"] || operation.responses?.["201"] || operation.responses?.["204"])?.content;
			const responseSchema = resContent ? Object.values(resContent)[0]?.schema : undefined;
			const responseInfo = resolveSchemaType(responseSchema, operationId, "Response");

			const deps = Array.from(new Set([...bodyInfo.deps, ...queryInfo.deps, ...responseInfo.deps]));

			console.log(`  - [${method.toUpperCase()}] ${path} -> ${name}`);
			if (queryInfo.type !== "void") console.log(`    Query: ${queryInfo.type}`);

			for (const tag of (operation.tags ?? ["Default"])) {
				if (!tagMap.has(tag)) tagMap.set(tag, []);
				tagMap.get(tag)!.push({ 
					name, path, method, 
					pathParams: extractPathParams(path), 
					bodyType: bodyInfo.type, 
					queryType: queryInfo.type, 
					responseType: responseInfo.type,
					deps
				});
			}
		}
	}

	mkdirSync(OUTPUT_DIR, { recursive: true });
	const indexExports: string[] = [];

	for (const [tag, entries] of tagMap) {
		const fileName = `${tagToFileName(tag)}.paths.ts`;
		writeFileSync(join(OUTPUT_DIR, fileName), generateFileContent(tag, entries), "utf-8");
		console.log(`  ✔ ${fileName} generated`);
		indexExports.push(`export { ${tagToObjectName(tag)} } from "./${tagToFileName(tag)}.paths";`);
	}

	writeFileSync(join(OUTPUT_DIR, "index.ts"), `// AUTO-GENERATED\n\n${indexExports.join("\n")}\n`, "utf-8");
	console.log(`\n✅ Done! Check the generated files.`);
}

main().catch(console.error);

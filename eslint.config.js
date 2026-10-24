import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import boundaries from 'eslint-plugin-boundaries'
import unicorn from 'eslint-plugin-unicorn'
import { readFileSync } from 'node:fs'

// Имена из codegen Api.ts: barrel @/shared/api их реэкспортирует, поэтому путь не ловится — ловим по имени
const API_TYPE_NAMES = [
  ...readFileSync(new URL('./src/shared/api/generated/Api.ts', import.meta.url), 'utf8')
    .matchAll(/^export (?:interface|type|enum|const|class) (\w+)/gm),
].map((match) => match[1])

const RAW_API_MESSAGE =
  'Raw Api.ts types/enums are allowed only in entities/**/types (*-backend.interface.ts) and shared/types. Alias as T*Backend and import from ../types.'

// Группы ограничений no-restricted-imports. В flat config опции правила не мержатся — каждая зона собирает свой набор
const RESTRICT = {
  entityConverters: {
    group: ['@/entities/**/converters', '@/entities/**/converters/**', '**/entities/**/converters/**', '../../*/converters', '../../*/converters/**'],
    message: "Converters are private: import only from the same entity api via '../converters'. UI gets frontend models from RTK hooks.",
  },
  sharedConverters: {
    group: ['@/shared/converters', '@/shared/converters/**'],
    message: 'Shared converters are for entities/**/api and entities/**/converters only.',
  },
  mapperNames: {
    group: ['@/entities/**'],
    importNamePattern: '^(map\\w+To(Frontend|Backend)|\\w+(Mapper|Converter))$',
    message: 'Converters/enum mappers are private to the entity api. Use frontend models from RTK hooks.',
  },
  backendNames: {
    group: ['@/entities/**'],
    importNamePattern: '(Backend|_BACKEND\\w*)$|_BACKEND_',
    message: 'UI works with frontend I*/ENUM_* models only — no T*Backend / ENUM_*_BACKEND.',
  },
  rawApiFile: {
    group: ['**/shared/api/generated/Api', '**/shared/api/generated/Api.ts', '@/shared/api/generated/Api'],
    message: RAW_API_MESSAGE,
  },
  paths: {
    group: ['@/shared/api/generated/paths', '@/shared/api/generated/paths/**'],
    message: '*_PATHS are allowed only in entities/**/api, handlers, types and shared/api.',
  },
  pathNames: {
    group: ['@/shared/api', '@/shared/api/generated'],
    importNamePattern: '_PATHS$',
    message: '*_PATHS are allowed only in entities/**/api, handlers, types and shared/api.',
  },
  sharedApiAll: {
    group: ['@/shared/api', '@/shared/api/**'],
    message: 'Converters must not import shared/api. Use T*Backend / ENUM_*_BACKEND from ../types (shared: @/shared/types).',
  },
}

const RAW_API_PATHS = ['@/shared/api', '@/shared/api/generated'].map((name) => ({
  name,
  importNames: API_TYPE_NAMES,
  message: RAW_API_MESSAGE,
}))

const restrictImports = (groups, { rawApi = true } = {}) => ({
  'no-restricted-imports': [
    'error',
    {
      ...(rawApi && { paths: RAW_API_PATHS }),
      patterns: groups.map((key) => RESTRICT[key]),
    },
  ],
})

const UI_FILES = [
  'src/pages/**/*.{ts,tsx}',
  'src/widgets/**/*.{ts,tsx}',
  'src/features/**/*.{ts,tsx}',
  'src/entities/**/ui/**/*.{ts,tsx}',
  'src/shared/ui/**/*.{ts,tsx}',
]

const TEST_FILES = ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}']

export default defineConfig([
  globalIgnores(['dist', 'node_modules', 'scripts']),


  // Основная конфигурация для исходного кода
  {
    files: ['**/*.{ts,tsx}'],
    ignores: ['**/*.config.{ts,js}', 'vite.config.ts', 'tailwind.config.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
       parser: tseslint.parser,
        parserOptions: {
          project: './tsconfig.app.json',
          tsconfigRootDir: import.meta.dirname,
        },
    },
    plugins: {
      boundaries,
       unicorn,
    },
    rules: {
      'no-unused-vars': 'off', // Отключаем базовое правило
      '@typescript-eslint/no-unused-vars': ['error'], // Включаем правило из плагина typescript

      // Проверка логов пока выключим
      'no-console': 'off',
      '@typescript-eslint/no-explicit-any': 'off', 
      
      // Отключаем React Refresh предупреждения
      'react-refresh/only-export-components': 'off',
      
      // Разрешаем require в конфигах
      '@typescript-eslint/no-require-imports': ['error', {
        allow: ['/tailwind\\.config\\.(js|ts)$/', '/vite\\.config\\.(js|ts)$/']
      }],


       // Правила наименования файлов
      'unicorn/filename-case': ['error', {
        cases: {
          kebabCase: true, // разрешаем kebab-case
          camelCase: false, // запрещаем camelCase
          pascalCase: false, // запрещаем PascalCase
        },
        ignore: [
          // Исключения для хуков (должны начинаться с use)
          /^use[A-Z][a-zA-Z]*\.(ts|tsx)$/,
          
          // Исключения для простых служебных файлов с точками
          // Формат: entity.type.ts (например: user.service.ts, channel.types.ts)
          /^[a-z][a-z0-9]*\.(service|api|util|config|types|interface|store|hook|slice)\.ts$/,

          // Исключения для составных служебных файлов
          // Формат: entity.function.type.ts (например: channel.service.interface.ts, user.store.types.ts)
          /^[a-z][a-z0-9]*\.(service|store|api|util|config|hook|slice)\.(types|interface)\.ts$/,
          
          // Исключения для стандартных файлов Next.js/React
          /^(page|layout|loading|error|not-found|template|default)\.tsx?$/,
          
          // Исключения для конфигурационных файлов проекта
          /^(globals|metadata)\.css$/,
          /^\.[a-z][a-z0-9-]*rc(\.(js|ts|json))?$/,
        ]
      }],

      // Соглашения именования переменных и типов
      '@typescript-eslint/naming-convention': [
        'error',
        // Интерфейсы: I<PascalCase>
        {
          selector: 'interface',
          format: ['PascalCase'],
          prefix: ['I']
        },

        // Типы: ENUM<PascalCase>  
        {
          selector: 'typeAlias',
          format: ['PascalCase'],
          filter: {
            regex: '^ENUM_[A-Z]',
            match: false
          },
          prefix: ['T']
        },

        // Enum и const assertions: ENUM_<NAME>
        // {
        //   selector: 'variable',
        //   modifiers: ['const', 'exported'],
        //   format: ['UPPER_CASE'],
        //   filter: {
        //     regex: '^ENUM_',
        //     match: true
        //   }
        // },

        // Глобальные константы: ALL_CAPS
        {
          selector: 'variable',
          modifiers: ['const', 'exported'],
          types: ['string', 'number', 'boolean'],
          format: ['UPPER_CASE']
        },

        // Функции: camelCase или PascalCase
        {
          selector: 'function',
          format: ['camelCase', 'PascalCase']
        },

        // Хуки: use<PascalCase>
        {
          selector: 'variable',
          modifiers: ['const', 'exported'],
          filter: {
            regex: '^use[A-Z]',
            match: true
          },
          format: ['camelCase']
        },
        {
          selector: 'function',
          filter: {
            regex: '^use[A-Z]',
            match: true
          },
          format: ['camelCase']
        },

        // React компоненты: PascalCase
        // {
        //   selector: 'variable',
        //   types: ['function'],
        //   filter: {
        //     regex: '^with[A-Z]',
        //     match: false
        //   },
        //   modifiers: ['exported'],
        //   format: ['PascalCase']
        // },
      ],

      // FSD import rules
      'boundaries/element-types': ['error', {
        default: 'disallow',
        rules: [
          // app может импортировать все
          { from: 'app', allow: ['pages', 'widgets', 'features', 'entities', 'entity-api', 'shared'] },
          
          // pages могут импортировать widgets, features, entities, shared
          { from: 'pages', allow: ['widgets', 'features', 'entities', 'entity-api', 'shared'] },
          
          // widgets могут импортировать features, entities, shared
          { from: 'widgets', allow: ['features', 'entities', 'entity-api', 'shared'] },
          
          // features могут импортировать entities, shared
          { from: 'features', allow: ['entities', 'entity-api', 'shared', 'features'] },
          
          // converters — только из api и converters (относительный ../converters), не из ui/hooks/lib/schema/mock
          { from: 'entity-api', allow: ['entity-converters', 'shared-converters', 'entity-api', 'entities', 'shared'] },
          { from: 'entity-converters', allow: ['entity-converters', 'shared-converters', 'entities', 'shared'] },

          // остальное в entities: api ок (хуки), converters нет
          { from: 'entities', allow: ['entities', 'entity-api', 'shared'] },

          { from: 'shared-converters', allow: ['shared-converters', 'shared'] },

          // shared не может импортировать другие слои
           { from: 'shared', allow: ['app', 'shared', 'entities', 'entity-api'] },
        ],
      }],

      // Запрещаем импорты между элементами одного слоя
      'boundaries/no-private': 'error',

      // Граница DTO ↔ Domain: по умолчанию converters, сырые Api.ts и PATHS запрещены
      ...restrictImports(['entityConverters', 'sharedConverters', 'mapperNames', 'rawApiFile', 'paths', 'pathNames']),
    },
    settings: {
      'boundaries/elements': [
        { type: 'entity-converters', pattern: 'src/entities/**/converters/**' },
        { type: 'entity-api', pattern: 'src/entities/**/api/**' },
        { type: 'shared-converters', pattern: 'src/shared/converters/**' },
        { type: 'app', pattern: 'src/app/**/*' },
        { type: 'pages', pattern: 'src/pages/**/*' },
        { type: 'widgets', pattern: 'src/widgets/**/*' },
        { type: 'features', pattern: 'src/features/**/*' },
        { type: 'entities', pattern: 'src/entities/**/*' },
        { type: 'shared', pattern: 'src/shared/**/*' },
      ],
      'boundaries/ignore': [
        '**/*.test.{ts,tsx}',
        '**/*.spec.{ts,tsx}',
        '**/*.stories.{ts,tsx}',
      ],
      react: { version: 'detect' },
      // Enable resolution of TypeScript path aliases (tsconfig "paths": { "@/*": ["./src/*"] })
      // so eslint-plugin-boundaries and other rules can resolve imports like "@/shared/...".
      'import/resolver': {
        typescript: {
          // Point to the project tsconfig(s) so the resolver knows alias mappings
          project: ['./tsconfig.json', './tsconfig.app.json'],
        },
      },
    },
  },

  // UI: ещё и без T*Backend / ENUM_*_BACKEND (даже через barrel сущности)
  {
    files: UI_FILES,
    rules: restrictImports(['entityConverters', 'sharedConverters', 'mapperNames', 'backendNames', 'rawApiFile', 'paths', 'pathNames']),
  },

  // api: PATHS и shared converters ок; свои converters — относительным ../converters,
  // мапперы чужой сущности — через её barrel (@/entities/x)
  {
    files: ['src/entities/**/api/**/*.{ts,tsx}'],
    rules: restrictImports(['entityConverters', 'rawApiFile']),
  },

  // converters: backend-типы/enum только из ../types, shared/api целиком нельзя;
  // мапперы чужой сущности для вложенных объектов — через её barrel
  {
    files: ['src/entities/**/converters/**/*.{ts,tsx}'],
    rules: restrictImports(['entityConverters', 'sharedApiAll']),
  },

  // shared/converters и shared/utils: общие мапперы и гео-утилиты — как в blogix, enum из shared/api напрямую
  {
    files: ['src/shared/converters/**/*.{ts,tsx}', 'src/shared/utils/**/*.{ts,tsx}'],
    rules: restrictImports(['entityConverters'], { rawApi: false }),
  },

  // handlers: PATHS ок
  {
    files: ['src/entities/**/handlers/**/*.{ts,tsx}', 'src/app/mws/**/*.{ts,tsx}'],
    rules: restrictImports(['entityConverters', 'sharedConverters', 'mapperNames', 'rawApiFile']),
  },

  // types — единственная точка входа к Api.ts (алиасы T*Backend, value re-export enum); PATHS для _types
  {
    files: ['src/entities/**/types/**/*.{ts,tsx}', 'src/shared/types/**/*.{ts,tsx}'],
    rules: restrictImports(['entityConverters', 'sharedConverters', 'mapperNames'], { rawApi: false }),
  },

  // shared/api: codegen, baseApi, msw utils
  {
    files: ['src/shared/api/**/*.{ts,tsx}'],
    rules: restrictImports(['entityConverters', 'sharedConverters', 'mapperNames'], { rawApi: false }),
  },

  // тесты могут звать converters напрямую, но сырые Api.ts — нет
  {
    files: TEST_FILES,
    rules: restrictImports(['rawApiFile']),
  },

  // тесты shared/converters проверяют маппинг на сырых enum
  {
    files: ['src/shared/converters/**/*.test.{ts,tsx}'],
    rules: { 'no-restricted-imports': 'off' },
  },

  // schema: только zod-схемы; T*Schema / interface — в entities/**/types
  {
    files: ['src/entities/**/schema/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-syntax': ['error',
        {
          selector: "ExportNamedDeclaration[declaration.type='TSTypeAliasDeclaration']",
          message: 'Form types (T*Schema etc.) belong in entities/**/types. Schema exports zod only; z.infer lives in types.',
        },
        {
          selector: "ExportNamedDeclaration[declaration.type='TSInterfaceDeclaration']",
          message: 'Interfaces belong in entities/**/types, not schema.',
        },
        {
          selector: "ExportNamedDeclaration[exportKind='type']",
          message: 'export type is forbidden in schema — move the type to entities/**/types.',
        },
      ],
    },
  },

  // ⚡ Здесь добавляем исключение для shadcn-ui
  {
    files: ['src/shared/ui/shadcn-ui/**/*.ts', 'src/shared/ui/shadcn-ui/**/*.tsx',  'src/shared/ui/custom/**/*.tsx'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-explicit-any': 'off', 
    },
  },

  // ⚡ Исключение для .d.ts файлов (декларации типов)
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
    },
  },

  // Отдельная конфигурация для конфигурационных файлов
  {
    files: ['**/*.config.{ts,js}', 'vite.config.ts', 'tailwind.config.ts'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      'no-console': 'off',
    },
  },
])
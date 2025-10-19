import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'
import boundaries from 'eslint-plugin-boundaries'
import unicorn from 'eslint-plugin-unicorn'

export default defineConfig([
  globalIgnores(['dist', 'node_modules']),


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
          { from: 'app', allow: ['pages', 'widgets', 'features', 'entities', 'shared'] },
          
          // pages могут импортировать widgets, features, entities, shared
          { from: 'pages', allow: ['widgets', 'features', 'entities', 'shared'] },
          
          // widgets могут импортировать features, entities, shared
          { from: 'widgets', allow: ['features', 'entities', 'shared'] },
          
          // features могут импортировать entities, shared
          { from: 'features', allow: ['entities', 'shared'] },
          
          // entities могут импортировать только shared
          { from: 'entities', allow: ['entities', 'shared'] },
          
          // shared не может импортировать другие слои
           { from: 'shared', allow: ['app', 'shared'] },
        ],
      }],
      
      // Запрещаем импорты между элементами одного слоя
      'boundaries/no-private': 'error',
    },
    settings: {
      'boundaries/elements': [
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
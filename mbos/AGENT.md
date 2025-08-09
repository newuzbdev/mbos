# MBOS Landing Page - Agent Guide

## Commands
- `npm run dev` - Start development server with Turbo
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- No test setup currently (no test files found)

## Architecture
- **Framework**: Next.js 15.3.1 with App Router
- **Language**: TypeScript with strict mode
- **Styling**: TailwindCSS v4
- **Internationalization**: 3 locales (en, ru, uz) with custom middleware
- **UI Components**: Radix UI, Lucide React, Framer Motion
- **Structure**: 
  - `app/[lang]/` - Internationalized pages
  - `components/` - Reusable React components (Header, Footer, etc.)
  - `locales/` - Translation files (en.json, ru.json, uz.json)
  - `lib/` - Utility libraries

## Code Style (enforced by .prettierrc)
- 2 spaces, single quotes, no semicolons, no trailing commas
- JSX single quotes, single attribute per line, arrow parens avoided
- Import alias: `@/*` maps to project root
- TypeScript: strict mode enabled, ES2017 target
- Components use PascalCase, props use camelCase
- Client components marked with `'use client'` directive

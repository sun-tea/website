# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 personal portfolio website built with TypeScript, React 19, and TailwindCSS. It features a main portfolio page and several sub-applications including a music stats page (/me) and a meal planner (/meal-planner).

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues automatically
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Architecture

### App Router Structure

- Uses Next.js App Router with `src/app/` directory structure
- Main routes:
  - `/` - Portfolio homepage with Hero, Skills, and FeaturedProjects sections
  - `/me` - Music statistics dashboard using Last.fm data
  - `/meal-planner` - Recipe browsing application with MealDB integration

### Key Architectural Patterns

1. **Global Providers Setup** (layout.tsx):
   - ThemeProvider for dark/light mode
   - QueryProvider for React Query state management
   - ReactQueryDevtools enabled in development

2. **State Management**:
   - React Query (@tanstack/react-query) for server state
   - Context API for theme state
   - Local component state with hooks

3. **Custom Hooks Pattern**:
   - `useMusicStats()`, `useRecipesByCategory()`, `useBouldering()`

4. **Service Layer Architecture**:
   - `/services/` - API integration and data fetching
   - `/adapters/` - Data transformation layers (e.g., MealDBAdapter)
   - Zod schemas for runtime type validation

5. **Component Organization**:
   - Feature-based folder structure under each route
   - Shared components in `/app/components/`
   - Route-specific components in `/app/[route]/components/`

### Styling & UI

- TailwindCSS 4.0 with PostCSS
- SCSS global styles (globals.scss)
- Dark/light theme support throughout
- Responsive design with mobile-first approach

### Code Standards

- TypeScript with strict mode enabled
- ESLint with Next.js and import ordering rules
- Prettier formatting (no semicolons, single quotes, 80 char width)
- Path aliases: `@/*` maps to `./src/*`

### Third-party Integrations

- Last.fm API for music statistics
- MealDB API for recipe data
- Simple Icons for social media icons
- Framer Motion for animations

Always run `npm run lint` and `npm run format:check` before making commits to ensure code quality standards are met.

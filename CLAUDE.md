# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Masquerade is an open-source Salesforce UI mockup and wireframing tool built in the style of Salesforce's Lightning App Builder. Users design Salesforce applications by dragging and dropping components onto a canvas.

## Development Commands

```bash
npm run dev      # Start Vite dev server at http://localhost:5173
npm run build    # TypeScript compile + Vite production build
npm run lint     # Run ESLint
npm run preview  # Preview production build locally
```

## Tech Stack

- **React 18 + TypeScript 5.6** with Vite
- **react-konva/konva** for canvas rendering
- **@salesforce-ux/design-system** (SLDS) for Salesforce styling
- **idb** for IndexedDB persistence

## Architecture

### Core Application Flow

**App.tsx** is the main component containing:
- Drag-and-drop state management (`draggedComponent`, `dragOverZone`, `canvasElements`)
- Component rendering via `renderOOBComponent()` switch statement
- Lightning App Builder-style layout: toolbar (44px) + sidebar palette + canvas + property panel

### Key Directories

- **src/types/** - Component type definitions. `oob-components.ts` defines the 24+ out-of-box components (Standard: Accordion, Assistant, Chatter Feed, etc. | Base SLDS: Button, Card, Input, etc.)
- **src/components/slds/** - React wrapper components using Salesforce Design System
- **src/shapes/** - Konva canvas shape components with registry pattern
- **src/store/persistence.ts** - IndexedDB operations for save/load/export designs
- **src/styles/** - CSS files including `builder.css` (Lightning App Builder chrome), `globals.css` (theme), `slds-tokens.css` (design tokens)

### Canvas Structure

The canvas simulates a Salesforce app with:
- SF app header with navigation tabs
- Two drop zones: main content area and sidebar
- Each canvas element has: `id`, `componentId`, `type`, `name`, `zone` properties

### Component Naming Convention

SLDS-prefixed components (SLDSButton, SLDSCard, SLDSInput, etc.) wrap Salesforce Design System elements.

## TypeScript Configuration

Strict mode enabled with `noUnusedLocals` and `noUnusedParameters`. Uses ES2020 target with "react-jsx" automatic imports.

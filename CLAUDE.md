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

---

## Workflow Orchestration

### 1. Plan Mode Default
- Enter plan mode for ANY non-trivial task (3+ steps or architectural decisions)
- If something goes sideways, STOP and re-plan immediately - don't keep pushing
- Use plan mode for verification steps, not just building
- Write detailed specs upfront to reduce ambiguity

### 2. Subagent Strategy
- Use subagents liberally to keep main context window clean
- Offload research, exploration, and parallel analysis to subagents
- For complex problems, throw more compute at it via subagents
- One task per subagent for focused execution

### 3. Self-Improvement Loop
- After ANY correction from the user: update `tasks/lessons.md` with the pattern
- Write rules for yourself that prevent the same mistake
- Ruthlessly iterate on these lessons until mistake rate drops
- Review lessons at session start for relevant project

### 4. Verification Before Done
- Never mark a task complete without proving it works
- Diff behavior between main and your changes when relevant
- Ask yourself: "Would a staff engineer approve this?"
- Run tests, check logs, demonstrate correctness

### 5. Demand Elegance (Balanced)
- For non-trivial changes: pause and ask "is there a more elegant way?"
- If a fix feels hacky: "Knowing everything I know now, implement the elegant solution"
- Skip this for simple, obvious fixes - don't over-engineer
- Challenge your own work before presenting it

### 6. Autonomous Bug Fixing
- When given a bug report: just fix it. Don't ask for hand-holding
- Point at logs, errors, failing tests - then resolve them
- Zero context switching required from the user
- Go fix failing CI tests without being told how

## Task Management

1. **Plan First**: Write plan to `tasks/todo.md` with checkable items
2. **Verify Plan**: Check in before starting implementation
3. **Track Progress**: Mark items complete as you go
4. **Explain Changes**: High-level summary at each step
5. **Document Results**: Add review section to `tasks/todo.md`
6. **Capture Lessons**: Update `tasks/lessons.md` after corrections

## Core Principles

- **Simplicity First**: Make every change as simple as possible. Impact minimal code.
- **No Laziness**: Find root causes. No temporary fixes. Senior developer standards.
- **Minimal Impact**: Changes should only touch what's necessary. Avoid introducing bugs.

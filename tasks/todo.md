# Task Tracking: MVP 2.0 Implementation

## Specifications Completed

- [x] 01-wizard-flow.md - New Design Wizard (Page Type → Object → Layout)
- [x] 02-canvas-interaction.md - Region-based canvas with selection/drag/drop
- [x] 03-property-panel.md - Right sidebar property editor
- [x] 04-component-previews.md - High-fidelity component renders

---

## Phase 1: Foundation (Week 1)

### 1.1 State Management Setup
- [x] Create `src/context/DesignContext.tsx` with useReducer
- [x] Define state shape: design, selection, drag state, wizard state
- [x] Create `src/hooks/useDesign.ts` consumer hook
- [x] Wrap App.tsx with DesignProvider
- [x] Type safety cleanup: replaced all `any` types, removed dead `DesignAction`, fixed `objectName` type

### 1.2 Wizard Modal Infrastructure
- [ ] Create `src/components/wizard/WizardModal.tsx` (overlay + container)
- [ ] Create `src/components/wizard/WizardBreadcrumb.tsx`
- [ ] Implement slide/morph transitions between steps
- [ ] Add wizard state to context

### 1.3 Wizard Step 1: Page Type Selection
- [ ] Create `src/components/wizard/steps/PageTypeStep.tsx`
- [ ] Create `src/components/wizard/cards/PageTypeCard.tsx`
- [ ] Implement 2x2 grid layout
- [ ] Add hover states and selection

### 1.4 Wizard Step 2: Object Selection
- [ ] Create `src/components/wizard/steps/ObjectStep.tsx`
- [ ] Create `src/components/wizard/cards/ObjectListItem.tsx`
- [ ] Pre-populate 8 standard objects
- [ ] Implement search/filter
- [ ] Create `src/components/wizard/NewObjectForm.tsx`

### 1.5 Wizard Step 3: Layout Selection
- [ ] Create `src/components/wizard/steps/LayoutStep.tsx`
- [ ] Create `src/components/wizard/cards/LayoutCard.tsx`
- [ ] Define 5 MVP layouts in `src/data/layouts.ts`
- [ ] Create layout thumbnail SVGs/CSS

---

## Phase 2: Canvas & Regions (Week 2)

### 2.1 Salesforce Container
- [ ] Refactor canvas to "SF Container" concept
- [ ] Implement builder toolbar (existing, enhance)
- [ ] Implement SF app header (existing, enhance)
- [ ] Create region grid system based on selected layout

### 2.2 Region Components
- [ ] Create `src/components/canvas/Region.tsx`
- [ ] Implement empty state (dashed border + placeholder)
- [ ] Implement drop zone logic with position indicators
- [ ] Support dynamic regions from layout definition

### 2.3 Drag and Drop Enhancement
- [ ] Implement position-aware drop indicators
- [ ] Create drag ghost preview
- [ ] Support drag from palette to region
- [ ] Support drag between regions
- [ ] Support reorder within region

### 2.4 Selection System
- [ ] Implement click-to-select on canvas elements
- [ ] Create selection header bar (blue, with name + delete)
- [ ] Add delete icon functionality
- [ ] Implement keyboard shortcuts (Delete, Escape)
- [ ] Single selection only (click elsewhere deselects)

---

## Phase 3: Property Panel (Week 3)

### 3.1 Panel Infrastructure
- [ ] Create `src/components/properties/PropertyPanel.tsx`
- [ ] Implement slide-in/out animation
- [ ] Wire to selection state (show when selected)
- [ ] Create header with component name and close button

### 3.2 Property Controls
- [ ] Create `src/components/properties/controls/TextField.tsx`
- [ ] Create `src/components/properties/controls/SelectField.tsx`
- [ ] Create `src/components/properties/controls/ToggleField.tsx`
- [ ] Create `src/components/properties/controls/TabSelectorField.tsx`
- [ ] Create `src/components/properties/controls/LinkButton.tsx`

### 3.3 Section System
- [ ] Create `src/components/properties/PropertySection.tsx`
- [ ] Implement collapsible sections
- [ ] Define property schemas per component type

### 3.4 Apply/Cancel Logic
- [ ] Implement pending changes state
- [ ] Create footer with Cancel/Apply buttons
- [ ] Apply updates component properties
- [ ] Cancel reverts and closes panel

---

## Phase 4: Component Previews (Week 4)

### 4.1 Preview Infrastructure
- [ ] Create `src/components/previews/ComponentPreview.tsx` (router)
- [ ] Create shared components (PreviewCard, PreviewTable, PreviewIcon)
- [ ] Define sample data in `src/data/sample-data.ts`

### 4.2 MVP Component Previews
- [ ] Create `RecordDetailPreview.tsx`
- [ ] Create `HighlightsPanelPreview.tsx`
- [ ] Create `RelatedListPreview.tsx`
- [ ] Create `ReportChartPreview.tsx` (CSS/SVG charts)
- [ ] Create `RichTextPreview.tsx`
- [ ] Create `AccordionPreview.tsx` (with interactivity)

### 4.3 Preview Polish
- [ ] Ensure SLDS visual compliance
- [ ] Test different data configurations
- [ ] Implement accordion expand/collapse
- [ ] Test at various container widths

---

## Phase 5: Integration & Polish (Week 5)

### 5.1 End-to-End Flow
- [ ] Test complete wizard → canvas → edit flow
- [ ] Ensure persistence saves new data structure
- [ ] Load saved designs correctly

### 5.2 UI Polish
- [ ] Consistent spacing and alignment
- [ ] Smooth animations throughout
- [ ] Loading states where needed
- [ ] Error handling

### 5.3 Component Palette Update
- [ ] Ensure palette shows MVP components
- [ ] Component icons match SLDS
- [ ] Drag preview matches component

---

## Review Section

_Add implementation notes and review comments here as work progresses_

### Phase 1 Review
- Started: 2026-02-20
- Completed:
- Notes:
  - 1.1 complete. All `any` types removed from DesignContext.tsx. Dead `DesignAction` union removed from design.ts. `PageDesign.objectName` changed from `SalesforceObject` literal union to `string` to support custom objects.
  - Pre-existing build errors in legacy code (tldraw shapes, SLDS wrappers with wrong import paths) — not related to Phase 1 work.

### Phase 2 Review
- Started:
- Completed:
- Notes:

### Phase 3 Review
- Started:
- Completed:
- Notes:

### Phase 4 Review
- Started:
- Completed:
- Notes:

### Phase 5 Review
- Started:
- Completed:
- Notes:

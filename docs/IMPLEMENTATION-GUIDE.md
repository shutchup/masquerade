# Implementation Quick Reference

## Phase 1 Checklist (Foundation)

### Step 1: Create Design Context

```bash
# Create new files
src/context/DesignContext.tsx     # State management
src/hooks/useDesign.ts            # Context consumer hook
```

**DesignContext.tsx key exports:**
- `DesignProvider` - Wrap app
- `useDesignState()` - Read state
- `useDesignDispatch()` - Dispatch actions

### Step 2: Page Type Picker Modal

```bash
src/components/builder/PageTypePicker.tsx
```

**UI Structure:**
```
┌─────────────────────────────────────────────────────────┐
│  Create New Page                                    [X] │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │   📄        │  │   🏠        │  │   📱        │     │
│  │  Record     │  │   Home      │  │   App       │     │
│  │   Page      │  │   Page      │  │   Page      │     │
│  │             │  │             │  │             │     │
│  │ For object  │  │ Dashboard   │  │ Custom app  │     │
│  │ records     │  │ landing     │  │ pages       │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                         │
│  [ Cancel ]                                             │
└─────────────────────────────────────────────────────────┘
```

### Step 3: Template Gallery

```bash
src/components/builder/TemplateGallery.tsx
```

**UI Structure:**
```
┌─────────────────────────────────────────────────────────┐
│  Select a Template                                  [X] │
├─────────────────────────────────────────────────────────┤
│  [Sales] [Service] [Blank]  ← Category tabs             │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │  [Preview]  │  │  [Preview]  │  │  [Preview]  │     │
│  │             │  │             │  │             │     │
│  │  Account    │  │ Opportunity │  │   Lead      │     │
│  │  Record     │  │   Record    │  │  Record     │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                         │
│  [ Back ]                            [ Use Template ]   │
└─────────────────────────────────────────────────────────┘
```

### Step 4: Update App.tsx

1. Wrap with `<DesignProvider>`
2. Replace `useState` with context
3. Add modal state for page type/template flow
4. Update canvas to use regions from layout

---

## Component Preview Requirements

Each component needs a `*Preview.tsx` that renders a convincing wireframe.

### Priority 1 (Most Used)

| Component | Key Visual Elements |
|-----------|---------------------|
| `RelatedListPreview` | Object icon, table headers, row placeholders |
| `TabsPreview` | Tab buttons, active indicator |
| `AccordionPreview` | Expandable headers with chevrons |
| `RichTextPreview` | Text placeholder block |
| `ChatterFeedPreview` | Publisher input, post cards |

### Priority 2 (Standard LAB)

| Component | Key Visual Elements |
|-----------|---------------------|
| `HighlightsPanelPreview` | 4 field slots, record name |
| `PathPreview` | Stage pills, current indicator |
| `ReportChartPreview` | Chart type visualization |
| `ListViewPreview` | Full table with search |
| `FlowPreview` | Start button, progress indicator |

### Priority 3 (Rest)

| Component | Key Visual Elements |
|-----------|---------------------|
| `AssistantPreview` | Chat bubble with Einstein icon |
| `EinsteinNBAPreview` | Recommendation cards |
| `TodaysTasksPreview` | Checkbox + task list |
| `TodaysEventsPreview` | Calendar icon + event rows |
| `RecentItemsPreview` | Icon + item list |

---

## File Structure After Phase 1

```
src/
├── App.tsx                           # Updated with modal flow
├── context/
│   └── DesignContext.tsx             # NEW
├── hooks/
│   └── useDesign.ts                  # NEW
├── components/
│   ├── builder/
│   │   ├── PageTypePicker.tsx        # NEW
│   │   ├── TemplateGallery.tsx       # NEW
│   │   └── Canvas/
│   │       ├── Canvas.tsx            # NEW - extracted from App
│   │       └── Region.tsx            # NEW - droppable region
│   └── previews/
│       ├── RelatedListPreview.tsx    # NEW
│       ├── TabsPreview.tsx           # NEW
│       └── ...                       # All component previews
├── data/
│   ├── templates/
│   │   └── index.ts                  # DONE ✓
│   └── component-schemas.ts          # DONE ✓
└── types/
    └── design.ts                     # DONE ✓
```

---

## Quick CSS Classes Needed

```css
/* Selection state */
.canvas-element--selected {
  outline: 2px solid #0176d3;
  outline-offset: 2px;
}

/* Drop indicator */
.drop-indicator {
  height: 4px;
  background: #0176d3;
  margin: 4px 0;
}

/* Region placeholder */
.region--empty {
  border: 2px dashed #c9c9c9;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #706e6b;
}

/* Delete button on selection */
.element-delete-btn {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ba0517;
  color: white;
  border: none;
  cursor: pointer;
}
```

---

## State Shape

```typescript
interface DesignState {
  // Current design
  design: PageDesign | null;

  // Selection
  selectedElementId: string | null;

  // Drag state
  dragOverRegionId: string | null;
  dropIndex: number | null;

  // UI state
  showPageTypePicker: boolean;
  showTemplateGallery: boolean;
  selectedPageType: PageType | null;

  // History (for undo - Phase 2)
  history: PageDesign[];
  historyIndex: number;
}
```

---

## Testing Checklist

### Page Type Picker
- [ ] Modal opens on "New" button
- [ ] Three page types displayed
- [ ] Clicking type advances to template gallery
- [ ] Cancel closes modal

### Template Gallery
- [ ] Shows templates for selected page type
- [ ] Category tabs filter correctly
- [ ] Clicking template shows preview
- [ ] "Use Template" loads design

### Canvas
- [ ] Regions render based on layout
- [ ] Components drop into correct region
- [ ] Clicking component selects it
- [ ] Selected component shows in property panel
- [ ] Delete button removes component

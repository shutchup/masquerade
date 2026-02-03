# Masquerade MVP 2.0: Lightning App Builder Wireframing

## Vision

Transform Masquerade from a "component palette + canvas" tool into an **authentic Lightning App Builder experience for wireframing**. Users should feel like they're using the real LAB, but they're creating mockups, not actual apps.

**Philosophy**: Pixel-perfect LAB chrome, zero Salesforce connection required.

---

## Priority Tiers

### P0 - Core LAB Experience (Must Ship)

These features are essential for the "feels like LAB" experience.

#### 1. Page Type Picker Modal

**What**: Modal that appears when creating a new design, presenting page type options.

**Page Types**:
| Type | Description | Initial Layout |
|------|-------------|----------------|
| Record Page | For object records (Account, Contact, etc.) | Header + 2-column |
| Home Page | Dashboard-style landing page | Full-width sections |
| App Page | Custom application page | Flexible regions |

**UX Flow**:
```
[New Design] → [Page Type Modal] → [Template Selection] → [Canvas]
```

**Implementation**:
- New component: `PageTypePicker.tsx`
- Modal with 3 visual cards
- Each card shows preview thumbnail + description
- Selection flows to template picker or canvas

---

#### 2. Template Gallery

**What**: Pre-built templates organized by industry/use case.

**Template Categories**:

**Sales Cloud**
- Account Record Page (Highlights Panel, Activity Timeline, Related Lists)
- Opportunity Record Page (Path, Key Fields, Products Related List)
- Lead Record Page (Convert Button, Lead Score, Campaign History)

**Service Cloud**
- Case Record Page (Case Feed, Knowledge Sidebar, Related Cases)
- Knowledge Article (Rich Text, Article Properties, Feedback)

**Blank Templates**
- Single Column
- Two Column (Equal)
- Two Column (Sidebar Left - 3:9 ratio)
- Two Column (Sidebar Right - 9:3 ratio)
- Three Column

**Data Structure**:
```typescript
interface PageTemplate {
  id: string;
  name: string;
  category: 'sales' | 'service' | 'experience' | 'blank';
  pageType: 'record' | 'home' | 'app';
  description: string;
  thumbnail: string;
  layout: LayoutDefinition;
  prefilledComponents: CanvasElement[];
}

interface LayoutDefinition {
  regions: Region[];
}

interface Region {
  id: string;
  name: string;
  type: 'header' | 'main' | 'sidebar' | 'footer';
  widthRatio?: number; // For column layouts (e.g., 9 for 9/12)
  acceptsComponents: string[]; // Component types allowed
}
```

---

#### 3. Canvas Element Selection & Interaction

**What**: Complete the interaction loop - select, view properties, edit, delete.

**Selection Behavior**:
- Click component → blue selection border (2px, `#0176d3`)
- Selection shows delete button (X) in top-right corner
- Selected component's properties appear in right panel
- Click empty canvas → deselect
- Escape key → deselect

**Drag-to-Reorder**:
- Drag handle on left side of component
- Drag within region to reorder
- Visual drop indicator (blue line between components)
- Drag between regions (main ↔ sidebar)

**State Changes**:
```typescript
// Add to App state
const [selectedElementId, setSelectedElementId] = useState<string | null>(null);

// Selection handler on canvas elements
const handleElementClick = (elementId: string) => {
  setSelectedElementId(elementId);
};
```

---

#### 4. Property Panel Integration

**What**: Wire up the existing PropertyPanel component to show/edit selected component properties.

**Properties by Component Type**:

| Component | Editable Properties |
|-----------|---------------------|
| Rich Text | Content (placeholder text) |
| Tabs | Tab labels, number of tabs |
| Related List | Object name, columns shown |
| Card | Title, subtitle, icon |
| Button | Label, variant, size |
| Data Table | Columns, row count |
| Accordion | Section labels, expanded state |

**Implementation**:
- Pass `selectedElementId` to PropertyPanel
- PropertyPanel reads element from canvas state
- On property change, update canvas element
- Changes reflect immediately in canvas preview

---

#### 5. Complete Component Previews

**What**: All 24 OOB components need convincing preview renders.

**Current State** (from codebase):
- ✅ Implemented: Button, Input, Card, Rich Text, Tabs
- ⚠️ Partial: List View, Related List (generic card)
- ❌ Missing: Most standard components

**Components Needing Preview Implementation**:

| Component | Preview Design |
|-----------|---------------|
| Accordion | Expandable sections with headers |
| App Launcher | 9-dot grid icon |
| Assistant | Chat bubble with Einstein icon |
| Chatter Feed | Post input + sample posts |
| Einstein Next Best Actions | Recommendation cards |
| Flow | Flow diagram icon + "Start Flow" |
| Key Deals | Deal cards with amounts |
| List View | Table headers + row placeholders |
| Performance Chart | Bar/line chart placeholder |
| Recent Items | Icon + item list |
| Related List | Table with object icon |
| Report Chart | Chart visualization placeholder |
| Today's Events | Calendar icon + event list |
| Today's Tasks | Checkbox + task list |
| Button Group | Multiple buttons in row |
| Data Table | Full table with headers |
| Form | Input fields layout |
| Modal | Dimmed overlay representation |
| Picklist | Dropdown with chevron |
| Page Header | Title, icon, breadcrumb |

---

### P1 - Polish Features (Should Have)

#### 6. Layout Templates Within Canvas

**What**: Change the canvas layout structure after creation.

**Layouts Available**:
- Single column (100%)
- Two column equal (50/50)
- Two column sidebar left (25/75)
- Two column sidebar right (75/25)
- Three column (33/33/33)

**Implementation**:
- Layout selector in toolbar or canvas header
- Changing layout redistributes components
- Components move to closest equivalent region

---

#### 7. Device Preview Toggle

**What**: Make the existing Desktop/Tablet/Phone buttons functional.

**Viewport Widths**:
| Device | Width | Canvas Behavior |
|--------|-------|-----------------|
| Desktop | 1200px | Full layout |
| Tablet | 768px | Sidebar collapses below |
| Phone | 375px | Single column, stacked |

**Implementation**:
- State for `viewportMode: 'desktop' | 'tablet' | 'phone'`
- Canvas wrapper applies max-width
- Components reflow based on width

---

#### 8. Design Management UI

**What**: Proper save/load interface instead of just persistence.

**Features**:
- "My Designs" library view (grid of thumbnails)
- Rename designs inline
- Duplicate design
- Delete with confirmation
- Sort by last modified

**UI Components**:
- `DesignLibrary.tsx` - Grid/list of saved designs
- `SaveDesignModal.tsx` - Name input on first save
- Integrate into toolbar "Save" button

---

#### 9. Export Features

**What**: Get designs out of the tool.

**Export Formats**:
- **PNG**: Screenshot of canvas
- **PDF**: Multi-page if needed
- **JSON**: Design data (for sharing/backup)

**Implementation**:
- Use `html2canvas` for PNG/PDF export
- JSON export already exists in persistence.ts
- Export button in toolbar

---

### P2 - Delight Features (Nice to Have)

#### 10. Undo/Redo

Track canvas changes with history stack.

#### 11. Keyboard Shortcuts

- `Delete` / `Backspace` - Remove selected component
- `Cmd/Ctrl + D` - Duplicate selected
- `Cmd/Ctrl + Z` - Undo
- `Cmd/Ctrl + Shift + Z` - Redo
- `Escape` - Deselect

#### 12. Zoom Controls

- Zoom slider in toolbar
- Fit to screen button
- 100% reset button

#### 13. Right-Click Context Menu

- Duplicate
- Delete
- Move to top/bottom
- Copy/Paste

#### 14. Grid/Snap Options

- Toggle grid overlay
- Snap to grid
- Alignment guides

---

## Technical Architecture

### State Management Recommendation

Current `useState` in App.tsx will become unwieldy. Recommend:

**Option A**: React Context + useReducer
```typescript
// designContext.tsx
interface DesignState {
  pageType: PageType;
  layout: LayoutDefinition;
  regions: Record<string, CanvasElement[]>;
  selectedElementId: string | null;
  history: DesignState[]; // For undo
}

type DesignAction =
  | { type: 'ADD_ELEMENT'; regionId: string; element: CanvasElement }
  | { type: 'REMOVE_ELEMENT'; elementId: string }
  | { type: 'SELECT_ELEMENT'; elementId: string | null }
  | { type: 'UPDATE_ELEMENT'; elementId: string; properties: Partial<CanvasElement> }
  | { type: 'REORDER_ELEMENTS'; regionId: string; elementIds: string[] }
  | { type: 'CHANGE_LAYOUT'; layout: LayoutDefinition };
```

**Option B**: Zustand (lighter weight)
```typescript
// store/designStore.ts
import { create } from 'zustand';

interface DesignStore {
  // State
  pageType: PageType;
  regions: Record<string, CanvasElement[]>;
  selectedElementId: string | null;

  // Actions
  addElement: (regionId: string, element: CanvasElement) => void;
  removeElement: (elementId: string) => void;
  selectElement: (elementId: string | null) => void;
  // ...
}
```

**Recommendation**: Start with Context + useReducer (no new dependency), migrate to Zustand if complexity grows.

---

### Component Architecture

```
src/
├── components/
│   ├── builder/
│   │   ├── PageTypePicker.tsx      # P0 - Page type selection modal
│   │   ├── TemplateGallery.tsx     # P0 - Template browser
│   │   ├── LayoutSelector.tsx      # P1 - Change canvas layout
│   │   ├── Toolbar.tsx             # Extract from App.tsx
│   │   └── Canvas/
│   │       ├── Canvas.tsx          # Main canvas container
│   │       ├── Region.tsx          # Droppable region
│   │       ├── CanvasElement.tsx   # Rendered component wrapper
│   │       └── SelectionOverlay.tsx # Blue selection border
│   ├── palette/
│   │   ├── ComponentPalette.tsx    # Extract from App.tsx
│   │   ├── ComponentCard.tsx       # Draggable component item
│   │   └── CategoryTabs.tsx        # Standard/Base/Custom tabs
│   ├── properties/
│   │   ├── PropertyPanel.tsx       # Already exists, enhance
│   │   └── editors/                # Property type editors
│   │       ├── TextEditor.tsx
│   │       ├── SelectEditor.tsx
│   │       └── NumberEditor.tsx
│   ├── previews/                   # Component preview renders
│   │   ├── AccordionPreview.tsx
│   │   ├── ChatterFeedPreview.tsx
│   │   ├── RelatedListPreview.tsx
│   │   └── ... (all 24 components)
│   └── modals/
│       ├── SaveDesignModal.tsx
│       ├── DesignLibraryModal.tsx
│       └── ExportModal.tsx
├── context/
│   └── DesignContext.tsx           # State management
├── data/
│   ├── templates/                  # Template definitions
│   │   ├── sales-templates.ts
│   │   ├── service-templates.ts
│   │   └── blank-templates.ts
│   └── component-schemas.ts        # Property definitions per component
├── hooks/
│   ├── useDesign.ts                # Design context consumer
│   ├── useDragDrop.ts              # DnD logic
│   └── useKeyboardShortcuts.ts     # P2
└── types/
    ├── design.ts                   # PageDesign, CanvasElement, etc.
    ├── templates.ts                # Template types
    └── oob-components.ts           # Already exists
```

---

### Data Models

```typescript
// types/design.ts

export type PageType = 'record' | 'home' | 'app';

export interface PageDesign {
  id: string;
  name: string;
  pageType: PageType;
  objectName?: string;        // For record pages (e.g., "Account")
  templateId?: string;        // Source template
  layout: LayoutDefinition;
  regions: Record<string, CanvasElement[]>;
  metadata: {
    createdAt: number;
    updatedAt: number;
    thumbnail?: string;
  };
}

export interface LayoutDefinition {
  id: string;
  name: string;
  regions: RegionDefinition[];
}

export interface RegionDefinition {
  id: string;
  name: string;
  type: 'header' | 'main' | 'sidebar' | 'footer' | 'full';
  gridColumn?: string;        // CSS grid column (e.g., "1 / 10")
  minHeight?: number;
  maxComponents?: number;
}

export interface CanvasElement {
  id: string;
  componentId: string;        // Reference to OOB component definition
  type: string;
  name: string;
  properties: Record<string, unknown>;
  order: number;
}

// types/templates.ts

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: 'sales' | 'service' | 'experience' | 'blank';
  pageType: PageType;
  objectName?: string;
  thumbnail: string;          // Path or base64
  layout: LayoutDefinition;
  defaultComponents: Array<{
    regionId: string;
    componentId: string;
    properties?: Record<string, unknown>;
  }>;
}
```

---

## Implementation Phases

### Phase 1: Foundation (Estimated: First Sprint)

**Goal**: Page type selection and template system working.

1. Create `DesignContext` with useReducer
2. Build `PageTypePicker` modal
3. Define 3-4 basic templates (JSON data)
4. Build `TemplateGallery` component
5. Update App.tsx to use new flow
6. Refactor canvas to use regions from layout

**Deliverable**: User can create new design → pick page type → select template → land on canvas with layout

---

### Phase 2: Interaction (Estimated: Second Sprint)

**Goal**: Full selection and editing loop.

1. Implement element selection state
2. Build `SelectionOverlay` component
3. Wire PropertyPanel to selection
4. Implement delete functionality
5. Build drag-to-reorder within regions
6. Complete all 24 component previews

**Deliverable**: User can select components, see/edit properties, delete, reorder

---

### Phase 3: Polish (Estimated: Third Sprint)

**Goal**: Production-ready feel.

1. Device preview toggle
2. Design library UI (save/load/rename)
3. Export to PNG
4. Layout selector
5. Bug fixes and UX polish

**Deliverable**: Feature-complete MVP 2.0

---

## Success Metrics

1. **Authenticity**: Screenshots indistinguishable from real LAB at first glance
2. **Usability**: New user can create a wireframe in < 5 minutes
3. **Component Coverage**: All 24 OOB components have quality previews
4. **Persistence**: Designs save/load reliably
5. **Export**: Users can share their wireframes as images

---

## Open Questions

1. **Object Selection for Record Pages**: Should we have a mock object picker (Account, Contact, etc.) that influences available components and template suggestions?

2. **Custom Components**: Should MVP 2.0 support user-defined components, or defer to MVP 3.0?

3. **Collaboration**: Any multiplayer/sharing features in scope?

4. **Component Variations**: Some components (like Related List) have many configurations. How much fidelity do we need?

5. **Mobile Preview**: Is responsive preview enough, or do we need actual mobile-specific layouts?

---

## Appendix: Salesforce LAB Component Reference

### Standard Components (Lightning App Builder)

| Component | Category | Record Page | Home Page | App Page |
|-----------|----------|-------------|-----------|----------|
| Accordion | Layout | ✓ | ✓ | ✓ |
| Activities | Data | ✓ | | |
| Chatter Feed | Social | ✓ | ✓ | ✓ |
| Chatter Publisher | Social | ✓ | ✓ | ✓ |
| Einstein Next Best Actions | AI | ✓ | | |
| Favorites | Navigation | | ✓ | |
| Flow | Automation | ✓ | ✓ | ✓ |
| Highlights Panel | Data | ✓ | | |
| Knowledge | Content | ✓ | ✓ | |
| List View | Data | | ✓ | ✓ |
| Path | Process | ✓ | | |
| Recent Items | Navigation | | ✓ | ✓ |
| Related List | Data | ✓ | | |
| Related Record | Data | ✓ | | |
| Report Chart | Analytics | ✓ | ✓ | ✓ |
| Rich Text | Content | ✓ | ✓ | ✓ |
| Tabs | Layout | ✓ | ✓ | ✓ |
| Visualforce Page | Legacy | ✓ | ✓ | ✓ |

---

*Document Version: 1.0*
*Created: 2026-02-03*
*Author: Claude Code Planning Session*

# Specification: Canvas Interaction

## Overview

The "canvas" is actually the Salesforce Container - a persistent shell that mimics the Salesforce application UI. Components are dropped into layout regions within this container.

## Salesforce Container Structure

```
┌─────────────────────────────────────────────────────────────────────────┐
│ BUILDER TOOLBAR (dark blue)                                              │
│ ← Back │ {Object} ▼ │ {Settings} │ {Record} ▼ │ App Name │ Share │ ... │
├─────────────────────────────────────────────────────────────────────────┤
│ SF APP HEADER                                                           │
│ ::: App Launcher │ {App Name} │ Tab1 ▼ │ Tab2 ▼ │ ...            │ ✏️  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  LAYOUT REGIONS (based on selected layout)                             │
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │ HEADER REGION                                                    │   │
│  │ "Add Component(s) Here"                                          │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
│  ┌────────────────────────────────┐ ┌──────────────────────────────┐   │
│  │ MAIN REGION                    │ │ SIDEBAR REGION               │   │
│  │                                │ │                              │   │
│  │ "Add Component(s) Here"        │ │ "Add Component(s) Here"      │   │
│  │                                │ │                              │   │
│  └────────────────────────────────┘ └──────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Region Specifications

### Empty Region State
- **Border**: Dashed, light gray (#c9c9c9)
- **Background**: Transparent or very light (#fafafa)
- **Placeholder Text**: "Add Component(s) Here" (centered, gray)
- **Min Height**: 100px

### Region with Components
- **Border**: None (components define their own boundaries)
- **Spacing**: 8px gap between components
- **Overflow**: Scroll if content exceeds region height

### Region Structure by Layout

| Layout | Regions | CSS Grid Definition |
|--------|---------|---------------------|
| Header and One Region | header, main | `"header" auto "main" 1fr` |
| Header and Right Sidebar | header, main, sidebar | `"header header" auto "main sidebar" 1fr / 9fr 3fr` |
| Header and Left Sidebar | header, sidebar, main | `"header header" auto "sidebar main" 1fr / 3fr 9fr` |
| Header and Two Equal | header, left, right | `"header header" auto "left right" 1fr / 1fr 1fr` |
| One Region | main | `"main" 1fr` |

---

## Drag and Drop

### Dragging from Component Palette

1. **Drag Start**:
   - Component palette item shows drag cursor
   - Create drag ghost (semi-transparent component preview)

2. **Drag Over Region**:
   - Region shows drop indicator line at exact position
   - Line appears between existing components or at top/bottom
   - Blue line (#0176d3), 4px height

3. **Drop**:
   - Component inserted at indicated position
   - Component immediately appears with default properties
   - Component auto-selected after drop

### Position Indicator Logic

```typescript
function calculateDropIndex(
  mouseY: number,
  regionElement: HTMLElement,
  existingComponents: ComponentElement[]
): number {
  // Calculate insertion point based on mouse position
  // relative to existing component boundaries

  for (let i = 0; i < existingComponents.length; i++) {
    const rect = existingComponents[i].getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;

    if (mouseY < midpoint) {
      return i; // Insert before this component
    }
  }

  return existingComponents.length; // Insert at end
}
```

---

## Component Selection

### Selection Trigger
- **Single Click**: Select component
- **Click Empty Area**: Deselect all

### Selection Visual

```
┌─ runtime-component-name ────────────────────────────────────────────[🗑]─┐
│                                                                          │
│  [Component Preview Content]                                             │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

- **Border**: 2px solid blue (#0176d3)
- **Header Bar**: Blue background (#0176d3), white text
  - Left: Component name/identifier
  - Right: Delete (trash) icon
- **Header Height**: 28px

### Selection State

```typescript
interface SelectionState {
  selectedElementId: string | null;
}
```

---

## Component Actions

### Delete
- **Trigger**: Click trash icon in selection header
- **Behavior**:
  - Remove component from region
  - Clear selection
  - No confirmation modal (can undo in future)

### Reorder (Drag within Region)
- **Trigger**: Drag selected component
- **Behavior**:
  - Show drag ghost
  - Show position indicator as user drags
  - Drop at new position
  - Component remains selected

### Move Between Regions
- **Trigger**: Drag component to different region
- **Behavior**:
  - Remove from source region
  - Add to target region at indicated position
  - Component remains selected

---

## Keyboard Shortcuts (MVP)

| Key | Action | Condition |
|-----|--------|-----------|
| Delete / Backspace | Delete selected component | Component selected |
| Escape | Deselect | Component selected |

---

## Component Wrapper Structure

Each dropped component is wrapped:

```typescript
interface CanvasElement {
  id: string;           // Unique ID (uuid)
  componentId: string;  // Reference to component type (e.g., 'related-list')
  type: string;         // Component type key
  name: string;         // Display name (can be customized)
  regionId: string;     // Which region it's in
  order: number;        // Position within region
  properties: Record<string, unknown>; // Component-specific props
}
```

```tsx
// CanvasElementWrapper.tsx
<div
  className={cn(
    'canvas-element',
    isSelected && 'canvas-element--selected'
  )}
  onClick={() => onSelect(element.id)}
  draggable
  onDragStart={handleDragStart}
>
  {isSelected && (
    <div className="canvas-element__header">
      <span className="canvas-element__name">{element.name}</span>
      <button
        className="canvas-element__delete"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(element.id);
        }}
      >
        <TrashIcon />
      </button>
    </div>
  )}

  <div className="canvas-element__content">
    <ComponentPreview component={element} />
  </div>
</div>
```

---

## CSS Classes

```css
/* Region Styles */
.canvas-region {
  min-height: 100px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.canvas-region--empty {
  border: 2px dashed #c9c9c9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvas-region__placeholder {
  color: #706e6b;
  font-size: 14px;
}

.canvas-region--drag-over {
  background: rgba(1, 118, 211, 0.05);
}

/* Drop Indicator */
.drop-indicator {
  height: 4px;
  background: #0176d3;
  border-radius: 2px;
  margin: -2px 0;
}

/* Canvas Element */
.canvas-element {
  position: relative;
  background: white;
  border-radius: 4px;
  cursor: pointer;
}

.canvas-element--selected {
  outline: 2px solid #0176d3;
  outline-offset: 0;
}

.canvas-element__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0176d3;
  color: white;
  padding: 4px 8px;
  font-size: 12px;
  border-radius: 4px 4px 0 0;
}

.canvas-element__name {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.canvas-element__delete {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.canvas-element__delete:hover {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.canvas-element__content {
  /* Component preview renders here */
}

/* Dragging States */
.canvas-element--dragging {
  opacity: 0.5;
}

.canvas-element--drag-ghost {
  position: fixed;
  pointer-events: none;
  z-index: 10000;
  opacity: 0.8;
  transform: rotate(2deg);
}
```

---

## State Management

```typescript
interface CanvasState {
  layout: LayoutDefinition;
  regions: Record<string, CanvasElement[]>;
  selectedElementId: string | null;
  dragState: {
    isDragging: boolean;
    dragSource: 'palette' | 'canvas' | null;
    draggedComponentId: string | null;
    draggedElementId: string | null;
    dropTargetRegionId: string | null;
    dropIndex: number | null;
  };
}

type CanvasAction =
  | { type: 'ADD_ELEMENT'; regionId: string; element: CanvasElement; index: number }
  | { type: 'REMOVE_ELEMENT'; elementId: string }
  | { type: 'MOVE_ELEMENT'; elementId: string; toRegionId: string; toIndex: number }
  | { type: 'REORDER_ELEMENT'; elementId: string; newIndex: number }
  | { type: 'SELECT_ELEMENT'; elementId: string | null }
  | { type: 'SET_DRAG_STATE'; dragState: Partial<CanvasState['dragState']> }
  | { type: 'UPDATE_ELEMENT_PROPERTIES'; elementId: string; properties: Record<string, unknown> };
```

---

## Acceptance Criteria

### Regions
- [ ] Empty regions show dashed border and placeholder text
- [ ] Regions sized according to layout definition
- [ ] Regions scroll if content overflows

### Drag and Drop
- [ ] Components can be dragged from palette to any region
- [ ] Position indicator shows exact drop location
- [ ] Component appears at correct position after drop
- [ ] Newly dropped component is auto-selected

### Selection
- [ ] Clicking component selects it
- [ ] Selection shows blue border and header bar
- [ ] Header shows component name and delete icon
- [ ] Clicking empty area deselects
- [ ] Only one component selected at a time

### Actions
- [ ] Delete icon removes component
- [ ] Delete/Backspace key removes selected component
- [ ] Components can be reordered within region via drag
- [ ] Components can be moved between regions via drag

### Performance
- [ ] Smooth drag animations (60fps)
- [ ] No layout shift during drag operations
- [ ] Responsive to fast interactions

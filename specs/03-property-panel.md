# Specification: Property Panel

## Overview

The Property Panel is a right sidebar that appears when a component is selected. It allows users to configure component-specific properties.

## Panel Behavior

### Trigger
- **Show**: When a component is selected on canvas
- **Hide**: When component is deselected (click empty area or Escape)
- **Animation**: Slide in from right (200ms ease-out)

### Position
- **Location**: Right side of canvas area
- **Width**: 320px
- **Height**: Full height of canvas area (below builder toolbar)

---

## Panel Structure

```
┌─────────────────────────────────────────┐
│ {Component Name}              [▼] [X]  │  ← Header
├─────────────────────────────────────────┤
│ ┌─ Details ─────────────────────────┐   │  ← Tab (underlined)
│ │                                   │   │
│ │ SECTION NAME                  [▼] │   │  ← Collapsible section
│ │ ┌─────────────────────────────┐   │   │
│ │ │ Property Label              │   │   │
│ │ │ [Input Control]             │   │   │
│ │ └─────────────────────────────┘   │   │
│ │                                   │   │
│ │ + Add Item                        │   │  ← Link button
│ │                                   │   │
│ └───────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│                          [Cancel] [Apply]│  ← Footer
└─────────────────────────────────────────┘
```

---

## Header

### Elements
- **Component Name**: Bold, 16px
- **Dropdown Arrow**: Opens component-level actions (future)
- **Close Button (X)**: Deselects component and closes panel

### Style
```css
.property-panel__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e5e5;
}

.property-panel__title {
  font-size: 16px;
  font-weight: 600;
  color: #181818;
}

.property-panel__close {
  background: none;
  border: none;
  cursor: pointer;
  color: #706e6b;
  padding: 4px;
}
```

---

## Tabs

### MVP
- Single tab: **"Details"** (always active)

### Future
- Additional tabs: "Related", "Visibility", etc.

### Tab Style
- Active tab: Blue underline (#0176d3)
- Tab text: 14px, medium weight when active

---

## Sections

### Collapsible Sections
- **Header**: Section name in caps + expand/collapse arrow
- **Default State**: Expanded
- **Click**: Toggles section visibility

### Section Style
```css
.property-section {
  border-bottom: 1px solid #e5e5e5;
}

.property-section__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #706e6b;
}

.property-section__header:hover {
  background: #f3f3f3;
}

.property-section__content {
  padding: 0 16px 16px;
}

.property-section--collapsed .property-section__content {
  display: none;
}
```

---

## Input Controls

### Text Input

```tsx
<div className="property-field">
  <label className="property-field__label">
    Field Label
    {required && <span className="property-field__required">*</span>}
  </label>
  <input
    type="text"
    className="property-field__input"
    value={value}
    onChange={handleChange}
    placeholder={placeholder}
  />
</div>
```

### Dropdown / Select

```tsx
<div className="property-field">
  <label className="property-field__label">Field Label</label>
  <select className="property-field__select" value={value} onChange={handleChange}>
    {options.map(opt => (
      <option key={opt.value} value={opt.value}>{opt.label}</option>
    ))}
  </select>
</div>
```

### Toggle / Switch

```tsx
<div className="property-field property-field--inline">
  <label className="property-field__label">Enable Feature</label>
  <button
    className={cn('property-toggle', isOn && 'property-toggle--on')}
    onClick={() => onChange(!isOn)}
  >
    <span className="property-toggle__track">
      <span className="property-toggle__thumb" />
    </span>
  </button>
</div>
```

### Tab Selector

```tsx
<div className="property-field">
  <label className="property-field__label">Filter Type</label>
  <div className="property-tabs">
    {options.map(opt => (
      <button
        key={opt.value}
        className={cn(
          'property-tabs__tab',
          value === opt.value && 'property-tabs__tab--active'
        )}
        onClick={() => onChange(opt.value)}
      >
        {opt.label}
      </button>
    ))}
  </div>
</div>
```

### Link Button (Add Action)

```tsx
<button className="property-link-button" onClick={onAdd}>
  <PlusIcon />
  <span>Add Filter</span>
</button>
```

---

## Control Styles

```css
/* Field Container */
.property-field {
  margin-bottom: 16px;
}

.property-field--inline {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Label */
.property-field__label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: #181818;
  margin-bottom: 4px;
}

.property-field__required {
  color: #ba0517;
  margin-left: 2px;
}

/* Text Input */
.property-field__input {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  outline: none;
}

.property-field__input:focus {
  border-color: #0176d3;
  box-shadow: 0 0 0 1px #0176d3;
}

/* Select */
.property-field__select {
  width: 100%;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

/* Toggle */
.property-toggle {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

.property-toggle__track {
  display: block;
  width: 44px;
  height: 24px;
  background: #c9c9c9;
  border-radius: 12px;
  position: relative;
  transition: background 0.2s;
}

.property-toggle--on .property-toggle__track {
  background: #0176d3;
}

.property-toggle__thumb {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s;
}

.property-toggle--on .property-toggle__thumb {
  transform: translateX(20px);
}

/* Tab Selector */
.property-tabs {
  display: flex;
  border: 1px solid #c9c9c9;
  border-radius: 4px;
  overflow: hidden;
}

.property-tabs__tab {
  flex: 1;
  padding: 8px 12px;
  font-size: 14px;
  background: white;
  border: none;
  cursor: pointer;
  border-right: 1px solid #c9c9c9;
}

.property-tabs__tab:last-child {
  border-right: none;
}

.property-tabs__tab--active {
  background: #0176d3;
  color: white;
}

/* Link Button */
.property-link-button {
  display: flex;
  align-items: center;
  gap: 4px;
  background: none;
  border: none;
  color: #0176d3;
  font-size: 14px;
  cursor: pointer;
  padding: 8px 0;
}

.property-link-button:hover {
  text-decoration: underline;
}
```

---

## Footer

### Buttons
- **Cancel**: Reverts changes, closes panel
- **Apply**: Saves changes to component, keeps panel open

### Style
```css
.property-panel__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #e5e5e5;
  background: #fafafa;
}

.property-btn {
  padding: 8px 16px;
  font-size: 14px;
  border-radius: 4px;
  cursor: pointer;
}

.property-btn--secondary {
  background: white;
  border: 1px solid #c9c9c9;
  color: #181818;
}

.property-btn--primary {
  background: #0176d3;
  border: 1px solid #0176d3;
  color: white;
}

.property-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

---

## Component-Specific Properties

### Related List

| Section | Property | Type | Default |
|---------|----------|------|---------|
| General | Object | Dropdown | "Contact" |
| General | List Title | Text | "{Object} Name" |
| Display | Columns | Multi-select | ["Name", "Email"] |
| Display | Row Count | Number | 5 |
| Display | Show Header | Toggle | true |

### Highlights Panel

| Section | Property | Type | Default |
|---------|----------|------|---------|
| Fields | Field 1 | Dropdown | "Name" |
| Fields | Field 2 | Dropdown | "Phone" |
| Fields | Field 3 | Dropdown | "Email" |
| Fields | Field 4 | Dropdown | "Industry" |

### Accordion

| Section | Property | Type | Default |
|---------|----------|------|---------|
| Sections | Section List | List editor | [{label: "Section 1"}] |
| Behavior | Allow Multiple Open | Toggle | false |

### Rich Text

| Section | Property | Type | Default |
|---------|----------|------|---------|
| Content | Text Content | Textarea | "Enter text..." |

### Report Chart

| Section | Property | Type | Default |
|---------|----------|------|---------|
| Data | Chart Type | Tab selector | "bar" |
| Data | Report Name | Text | "Sample Report" |
| Display | Show Title | Toggle | true |

### Record Detail

| Section | Property | Type | Default |
|---------|----------|------|---------|
| Layout | Columns | Dropdown | "2" |
| Fields | Field List | Multi-select | [...] |

---

## State Management

```typescript
interface PropertyPanelState {
  isOpen: boolean;
  selectedElement: CanvasElement | null;
  pendingChanges: Record<string, unknown>;
  isDirty: boolean;
}

// When component selected
dispatch({ type: 'OPEN_PANEL', element });

// When property changes
dispatch({ type: 'SET_PENDING_CHANGE', key, value });

// When Apply clicked
dispatch({ type: 'APPLY_CHANGES' }); // Commits to canvas state

// When Cancel clicked
dispatch({ type: 'CANCEL_CHANGES' }); // Reverts pending changes, closes panel
```

---

## Component Structure

```
src/components/properties/
├── PropertyPanel.tsx           # Main panel container
├── PropertyHeader.tsx          # Header with name and close
├── PropertyTabs.tsx            # Tab navigation
├── PropertySection.tsx         # Collapsible section
├── PropertyFooter.tsx          # Cancel/Apply buttons
└── controls/
    ├── TextField.tsx           # Text input
    ├── SelectField.tsx         # Dropdown
    ├── ToggleField.tsx         # Switch
    ├── TabSelectorField.tsx    # Tab-style selector
    ├── NumberField.tsx         # Number input
    ├── TextareaField.tsx       # Multi-line text
    └── LinkButton.tsx          # "+ Add" style buttons
```

---

## Acceptance Criteria

### Panel Behavior
- [ ] Panel slides in from right when component selected
- [ ] Panel slides out when component deselected
- [ ] X button closes panel and deselects component
- [ ] Panel width is 320px
- [ ] Smooth slide animation (200ms)

### Header
- [ ] Shows selected component name
- [ ] X button visible and functional

### Sections
- [ ] Sections are collapsible
- [ ] Click header toggles expanded/collapsed
- [ ] Sections show appropriate properties for component type

### Controls
- [ ] Text inputs capture user input
- [ ] Dropdowns show options and allow selection
- [ ] Toggles switch on/off
- [ ] Tab selectors switch between options
- [ ] All controls reflect current component property values

### Footer
- [ ] Cancel reverts changes and closes panel
- [ ] Apply saves changes to component
- [ ] Apply button disabled when no changes
- [ ] Component preview updates after Apply

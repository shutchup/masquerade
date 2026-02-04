# Specification: New Design Wizard Flow

## Overview

The New Design Wizard is a multi-step modal that guides users through creating a new design. This is the **primary entry point** and **USP** of the application.

## Trigger Conditions

1. **First Visit**: Wizard opens automatically when user first loads the app
2. **New Design**: Wizard opens when user clicks "New Design" button in toolbar
3. **No Skip Option**: Users must complete the wizard to reach the canvas

## Modal Specifications

### Container
- **Type**: Centered modal with dark semi-transparent overlay
- **Width**: ~700px (medium)
- **Style**: Salesforce Setup modal style
  - White background
  - Subtle box shadow
  - Rounded corners (4px)
  - X close button in top-right corner

### Header
- **Style**: Breadcrumb navigation showing progress
- **Format**: `New Page > {Step Name}`
- **Examples**:
  - Step 1: `New Page > Select Type`
  - Step 2: `New Page > Record Page > Select Object`
  - Step 3: `New Page > Record Page > Account > Select Layout`

### Transitions
- Steps morph/transition within the same modal
- Smooth animation when advancing to next step
- Back navigation via breadcrumb clicks

---

## Step 1: Select Page Type

### Layout
- **Grid**: 2x2 card grid
- **Card Size**: ~200px x 180px each

### Page Types (MVP)

| Page Type | Icon (SLDS) | Description | Status |
|-----------|-------------|-------------|--------|
| Record Page | `standard/record.svg` | Design a page for viewing and editing records | MUST |
| App Page | `standard/apps.svg` | Create a custom application page | MUST |
| Home Page | `standard/home.svg` | Build a dashboard-style landing page | MUST |
| Experience Page | `standard/portal.svg` | Design pages for Experience Cloud | Nice-to-have |

### Card Content
- Icon (large, centered)
- Title (bold)
- Short description (1-2 lines)
- Hover state: subtle lift/shadow

### Behavior
- Click card → Advance to Step 2 for that page type
- For MVP: Only "Record Page" flows through; others show "Coming Soon"

---

## Step 2: Select Object (Record Page only)

### Layout
- **List View**: Searchable list of objects
- **Action Button**: "+ New Object" at top

### Pre-populated Objects

| Object | API Name | Icon |
|--------|----------|------|
| Account | Account | standard:account |
| Contact | Contact | standard:contact |
| Lead | Lead | standard:lead |
| Opportunity | Opportunity | standard:opportunity |
| Case | Case | standard:case |
| Task | Task | standard:task |
| Event | Event | standard:event |
| Campaign | Campaign | standard:campaign |

### Object List Item
- Icon (SLDS standard object icons)
- Label (e.g., "Account")
- Hover state: highlight background

### Search
- Search input at top
- Filters list as user types
- Searches both label and API name

### "+ New Object" Action
Opens nested modal/form with fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| Label | Text input | Yes | Display name (e.g., "Project") |
| Plural Label | Text input | Yes | Plural form (e.g., "Projects") |
| Object Name | Text input | Yes | API name (e.g., "Project__c") |
| Icon | Icon picker + text | No | SLDS icon reference |
| Description | Textarea | No | Optional description |

**Form Buttons**: Cancel, Create (disabled until required fields filled)

### Behavior
- Click object → Advance to Step 3
- New Object → Opens form → Create → Adds to list and selects it

---

## Step 3: Select Layout

### Layout
- **Grid**: 4 columns, responsive rows
- **Cards**: Layout thumbnail + name below

### MVP Layouts (5 essential)

| Layout Name | Thumbnail Description | Regions |
|-------------|----------------------|---------|
| Header and One Region | Full header + full main | header, main |
| Header and Right Sidebar | Header + 9:3 split | header, main, sidebar |
| Header and Left Sidebar | Header + 3:9 split | header, sidebar, main |
| Header and Two Equal Regions | Header + 6:6 split | header, left, right |
| One Region | Single full-width area | main |

### Layout Card
- Thumbnail: Gray placeholder boxes showing region arrangement
- Name below thumbnail
- Selected state: Blue border

### Behavior
- Click layout → Close wizard → Load SF Container with layout regions

---

## State Management

```typescript
interface WizardState {
  isOpen: boolean;
  currentStep: 1 | 2 | 3;
  selectedPageType: 'record' | 'app' | 'home' | 'experience' | null;
  selectedObject: SalesforceObject | null;
  selectedLayout: LayoutDefinition | null;
  customObjects: CustomObject[]; // User-created objects
}

interface CustomObject {
  id: string;
  label: string;
  pluralLabel: string;
  objectName: string;
  icon?: string;
  description?: string;
}
```

---

## Component Structure

```
src/components/wizard/
├── NewDesignWizard.tsx       # Main wizard container
├── WizardModal.tsx           # Modal wrapper with overlay
├── WizardBreadcrumb.tsx      # Breadcrumb navigation
├── steps/
│   ├── PageTypeStep.tsx      # Step 1: Page type selection
│   ├── ObjectStep.tsx        # Step 2: Object selection
│   ├── LayoutStep.tsx        # Step 3: Layout selection
│   └── NewObjectForm.tsx     # Nested form for creating objects
└── cards/
    ├── PageTypeCard.tsx      # Individual page type card
    ├── ObjectListItem.tsx    # Object list row
    └── LayoutCard.tsx        # Layout thumbnail card
```

---

## CSS Classes (SLDS-aligned)

```css
.wizard-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9000;
}

.wizard-modal {
  background: white;
  border-radius: 4px;
  width: 700px;
  max-height: 80vh;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
  overflow: hidden;
}

.wizard-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wizard-breadcrumb {
  display: flex;
  gap: 0.5rem;
  font-size: 14px;
  color: #706e6b;
}

.wizard-breadcrumb-item--active {
  color: #181818;
  font-weight: 500;
}

.wizard-body {
  padding: 1.5rem;
  overflow-y: auto;
}

.wizard-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

/* Page Type Grid */
.page-type-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.page-type-card {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 1.5rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.15s ease;
}

.page-type-card:hover {
  border-color: #0176d3;
  box-shadow: 0 2px 8px rgba(1, 118, 211, 0.15);
}

/* Layout Grid */
.layout-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
}

.layout-card {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 1rem;
  cursor: pointer;
}

.layout-card--selected {
  border-color: #0176d3;
  border-width: 2px;
}

.layout-thumbnail {
  aspect-ratio: 4/3;
  background: #f3f3f3;
  border-radius: 2px;
  margin-bottom: 0.5rem;
}
```

---

## Acceptance Criteria

### Step 1
- [ ] Modal opens on first visit and "New Design" click
- [ ] 2x2 grid displays 4 page types (Record, App, Home, Experience)
- [ ] Cards show icon, title, description
- [ ] Hover effect on cards
- [ ] Clicking "Record Page" advances to Step 2
- [ ] Other types show "Coming Soon" for MVP

### Step 2
- [ ] Breadcrumb shows "New Page > Record Page > Select Object"
- [ ] 8 pre-populated objects displayed
- [ ] Search filters list
- [ ] "+ New Object" opens form
- [ ] New Object form validates required fields
- [ ] Creating object adds to list
- [ ] Clicking object advances to Step 3

### Step 3
- [ ] Breadcrumb shows full path
- [ ] 5 layout options displayed in grid
- [ ] Layout thumbnails accurately represent regions
- [ ] Clicking layout closes wizard
- [ ] SF Container loads with selected layout regions

### General
- [ ] X button closes wizard
- [ ] Breadcrumb clicks navigate back
- [ ] Smooth transitions between steps
- [ ] Modal prevents interaction with background

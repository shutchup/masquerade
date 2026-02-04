# Specification: Component Previews

## Overview

Each component dropped on the canvas renders a high-fidelity preview that looks like the actual Salesforce component. Previews show realistic sample data that users can edit through the Property Panel.

## Design Principles

1. **High Fidelity**: Previews should be visually indistinguishable from real Salesforce components
2. **Editable Data**: Sample data can be changed via Property Panel
3. **Partial Interactivity**: Accordions expand, tabs switch, but no real data operations
4. **SLDS Compliance**: Use official Salesforce Design System styling

---

## MVP Components (Priority Order)

### 1. Record Detail

Shows a form-style layout of record fields.

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────┐
│ Record Detail                                                   │
├────────────────────────────────┬────────────────────────────────┤
│ Field Label                    │ Field Label                    │
│ Field Value                    │ Field Value                    │
├────────────────────────────────┼────────────────────────────────┤
│ Field Label                    │ Field Label                    │
│ Field Value                    │ Field Value                    │
├────────────────────────────────┼────────────────────────────────┤
│ Field Label                    │ Field Label                    │
│ Field Value                    │ Field Value                    │
└────────────────────────────────┴────────────────────────────────┘
```

**Properties**:
| Property | Type | Default |
|----------|------|---------|
| columns | 1 \| 2 | 2 |
| fields | FieldDef[] | 6 default fields |

**Sample Data**:
```typescript
const defaultFields = [
  { label: 'Account Name', value: 'Acme Corporation' },
  { label: 'Phone', value: '(555) 123-4567' },
  { label: 'Website', value: 'www.acme.com' },
  { label: 'Industry', value: 'Technology' },
  { label: 'Annual Revenue', value: '$5,000,000' },
  { label: 'Employees', value: '250' },
];
```

---

### 2. Highlights Panel

Compact header showing key record fields.

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────┐
│ 🏢 Acme Corporation                                             │
│ Account                                                         │
├────────────────┬────────────────┬────────────────┬──────────────┤
│ Phone          │ Website        │ Industry       │ Owner        │
│ (555) 123-4567 │ www.acme.com   │ Technology     │ John Smith   │
└────────────────┴────────────────┴────────────────┴──────────────┘
```

**Properties**:
| Property | Type | Default |
|----------|------|---------|
| recordName | string | "Acme Corporation" |
| objectType | string | "Account" |
| icon | string | "standard:account" |
| fields | HighlightField[] | 4 default fields |

**Sample Data**:
```typescript
const defaultHighlightFields = [
  { label: 'Phone', value: '(555) 123-4567' },
  { label: 'Website', value: 'www.acme.com' },
  { label: 'Industry', value: 'Technology' },
  { label: 'Owner', value: 'John Smith' },
];
```

---

### 3. Related List

Table showing related records.

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────┐
│ 👥 Contacts (3)                                    [New] [▼]    │
├─────────────────────────────────────────────────────────────────┤
│ ☐ │ Name              │ Title           │ Email                 │
├───┼───────────────────┼─────────────────┼───────────────────────┤
│ ☐ │ Jane Doe          │ CEO             │ jane@acme.com         │
│ ☐ │ John Smith        │ CTO             │ john@acme.com         │
│ ☐ │ Bob Johnson       │ CFO             │ bob@acme.com          │
└───┴───────────────────┴─────────────────┴───────────────────────┘
```

**Properties**:
| Property | Type | Default |
|----------|------|---------|
| objectName | string | "Contact" |
| title | string | "Contacts" |
| icon | string | "standard:contact" |
| columns | Column[] | ["Name", "Title", "Email"] |
| rowCount | number | 3 |
| showCheckboxes | boolean | true |
| showNewButton | boolean | true |

**Sample Data**:
```typescript
const defaultContactRows = [
  { Name: 'Jane Doe', Title: 'CEO', Email: 'jane@acme.com' },
  { Name: 'John Smith', Title: 'CTO', Email: 'john@acme.com' },
  { Name: 'Bob Johnson', Title: 'CFO', Email: 'bob@acme.com' },
];
```

---

### 4. Report Chart

Visual chart representation.

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────┐
│ Sales by Region                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│    ████████████████████  North    $450K                        │
│    ██████████████        South    $320K                        │
│    ████████              East     $180K                        │
│    ██████████████████    West     $400K                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Properties**:
| Property | Type | Default |
|----------|------|---------|
| chartType | 'bar' \| 'line' \| 'pie' \| 'donut' | 'bar' |
| title | string | "Sales by Region" |
| showTitle | boolean | true |

**Chart Types**:
- **Bar**: Horizontal bars (as shown above)
- **Line**: Line graph with points
- **Pie**: Circular pie chart
- **Donut**: Pie with center cutout

**Implementation Note**: Use CSS/SVG for chart rendering, not a charting library (keep bundle small).

---

### 5. Rich Text

Static text content block.

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  Welcome to the Account page. This section contains important   │
│  information about managing your customer relationships.        │
│                                                                 │
│  Key Features:                                                  │
│  • Track customer interactions                                  │
│  • Manage opportunities                                         │
│  • View related contacts                                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Properties**:
| Property | Type | Default |
|----------|------|---------|
| content | string | Default welcome text |

**Rendering**: Render as HTML with basic formatting support (bold, italic, lists, links).

---

### 6. Accordion

Expandable/collapsible sections.

**Visual Structure**:
```
┌─────────────────────────────────────────────────────────────────┐
│ ▼ Section One                                                   │
├─────────────────────────────────────────────────────────────────┤
│   Content for section one goes here. This is expanded           │
│   by default and shows the section content.                     │
├─────────────────────────────────────────────────────────────────┤
│ ▶ Section Two                                                   │
├─────────────────────────────────────────────────────────────────┤
│ ▶ Section Three                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Properties**:
| Property | Type | Default |
|----------|------|---------|
| sections | Section[] | 3 default sections |
| allowMultiple | boolean | false |

**Interactivity**:
- Click section header to expand/collapse
- If `allowMultiple: false`, only one section open at a time
- Arrow icon rotates on expand

**Sample Data**:
```typescript
const defaultSections = [
  { id: '1', label: 'Section One', content: 'Content for section one...', expanded: true },
  { id: '2', label: 'Section Two', content: 'Content for section two...', expanded: false },
  { id: '3', label: 'Section Three', content: 'Content for section three...', expanded: false },
];
```

---

## Shared Styles

### Card Container

Most components share a card-like container:

```css
.component-preview {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  overflow: hidden;
}

.component-preview__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #e5e5e5;
  background: #fafafa;
}

.component-preview__title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 600;
  color: #181818;
}

.component-preview__icon {
  width: 24px;
  height: 24px;
}

.component-preview__body {
  padding: 16px;
}
```

### Table Styles

For Related List and similar:

```css
.preview-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}

.preview-table th {
  text-align: left;
  padding: 8px 12px;
  background: #fafafa;
  border-bottom: 1px solid #e5e5e5;
  font-weight: 600;
  color: #706e6b;
}

.preview-table td {
  padding: 8px 12px;
  border-bottom: 1px solid #e5e5e5;
}

.preview-table tr:last-child td {
  border-bottom: none;
}

.preview-table__link {
  color: #0176d3;
  text-decoration: none;
}
```

### Form Field Styles

For Record Detail:

```css
.preview-field {
  margin-bottom: 16px;
}

.preview-field__label {
  display: block;
  font-size: 12px;
  color: #706e6b;
  margin-bottom: 4px;
}

.preview-field__value {
  font-size: 14px;
  color: #181818;
}

.preview-form--two-column {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
```

---

## Component File Structure

```
src/components/previews/
├── index.ts                    # Export all previews
├── ComponentPreview.tsx        # Switch/router for component type
├── shared/
│   ├── PreviewCard.tsx         # Shared card container
│   ├── PreviewTable.tsx        # Shared table component
│   ├── PreviewIcon.tsx         # SLDS icon wrapper
│   └── styles.css              # Shared styles
├── RecordDetailPreview.tsx
├── HighlightsPanelPreview.tsx
├── RelatedListPreview.tsx
├── ReportChartPreview.tsx
├── RichTextPreview.tsx
└── AccordionPreview.tsx
```

---

## Preview Component Interface

```typescript
interface PreviewProps {
  element: CanvasElement;
  isSelected: boolean;
}

// Example implementation
const RelatedListPreview: React.FC<PreviewProps> = ({ element }) => {
  const {
    objectName = 'Contact',
    title = 'Contacts',
    columns = ['Name', 'Title', 'Email'],
    rowCount = 3,
    showCheckboxes = true,
    rows = defaultContactRows,
  } = element.properties;

  return (
    <PreviewCard
      title={title}
      icon={`standard:${objectName.toLowerCase()}`}
      count={rows.length}
      actions={<NewButton />}
    >
      <PreviewTable
        columns={columns}
        rows={rows.slice(0, rowCount)}
        showCheckboxes={showCheckboxes}
      />
    </PreviewCard>
  );
};
```

---

## Sample Data Management

### Default Data Store

```typescript
// src/data/sample-data.ts

export const sampleData = {
  contacts: [
    { Name: 'Jane Doe', Title: 'CEO', Email: 'jane@acme.com', Phone: '(555) 111-1111' },
    { Name: 'John Smith', Title: 'CTO', Email: 'john@acme.com', Phone: '(555) 222-2222' },
    { Name: 'Bob Johnson', Title: 'CFO', Email: 'bob@acme.com', Phone: '(555) 333-3333' },
    { Name: 'Alice Williams', Title: 'VP Sales', Email: 'alice@acme.com', Phone: '(555) 444-4444' },
    { Name: 'Charlie Brown', Title: 'VP Marketing', Email: 'charlie@acme.com', Phone: '(555) 555-5555' },
  ],

  opportunities: [
    { Name: 'Acme Expansion', Stage: 'Proposal', Amount: '$50,000', CloseDate: '2026-03-15' },
    { Name: 'Beta Partnership', Stage: 'Negotiation', Amount: '$125,000', CloseDate: '2026-02-28' },
    { Name: 'Gamma Renewal', Stage: 'Closed Won', Amount: '$75,000', CloseDate: '2026-01-31' },
  ],

  cases: [
    { CaseNumber: '00001234', Subject: 'Login Issue', Status: 'Open', Priority: 'High' },
    { CaseNumber: '00001235', Subject: 'Feature Request', Status: 'In Progress', Priority: 'Medium' },
    { CaseNumber: '00001236', Subject: 'Billing Question', Status: 'Closed', Priority: 'Low' },
  ],

  chartData: {
    salesByRegion: [
      { label: 'North', value: 450000 },
      { label: 'South', value: 320000 },
      { label: 'East', value: 180000 },
      { label: 'West', value: 400000 },
    ],
  },
};
```

### Data Customization

Users can edit sample data through Property Panel:
1. Edit individual field values
2. Change number of rows shown
3. Modify column selection
4. Edit chart labels/values

Changes persist in component's `properties` object.

---

## Interactivity Specifications

### Accordion
- **Expand/Collapse**: Click header toggles section
- **Animation**: Smooth height transition (200ms)
- **Arrow Rotation**: 0° → 90° on expand

### Tabs (future component)
- **Switch Tab**: Click tab header changes active content
- **Animation**: Fade transition between content

### Other Components
- **Static**: No interactivity beyond selection
- **Hover States**: Links show pointer cursor, buttons show hover state

---

## Acceptance Criteria

### General
- [ ] All 6 MVP components have high-fidelity previews
- [ ] Previews match Salesforce visual style
- [ ] Sample data is realistic and editable
- [ ] Components render correctly at different widths

### Record Detail
- [ ] Displays fields in 1 or 2 column layout
- [ ] Field labels and values clearly visible
- [ ] Supports variable number of fields

### Highlights Panel
- [ ] Shows record name prominently
- [ ] Displays object type and icon
- [ ] 4 highlight fields in compact row

### Related List
- [ ] Table header with icon and count
- [ ] Sortable column headers (visual only)
- [ ] Checkbox column optional
- [ ] Row data from sample data

### Report Chart
- [ ] Bar chart renders with correct proportions
- [ ] Chart type switchable (bar, line, pie, donut)
- [ ] Title and legend displayed

### Rich Text
- [ ] Renders HTML content
- [ ] Supports basic formatting (bold, italic, lists)
- [ ] Editable via Property Panel textarea

### Accordion
- [ ] Sections expand/collapse on click
- [ ] Only one section open when allowMultiple=false
- [ ] Smooth animation on toggle
- [ ] Chevron icon rotates

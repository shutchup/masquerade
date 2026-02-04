# Specification: SLDS Visual Guidelines

## Overview

This document defines how to use Salesforce Lightning Design System (SLDS) assets for visual authenticity. The goal is to make Masquerade visually indistinguishable from real Salesforce.

## Icon System

### Available Icon Categories

| Category | Path | Purpose | Background |
|----------|------|---------|------------|
| Standard | `/slds/icons/standard/` | Object icons (Account, Contact, etc.) | Colored circle/square |
| Utility | `/slds/icons/utility/` | UI icons (close, search, add, etc.) | Transparent |
| Action | `/slds/icons/action/` | Action icons (edit, delete, new) | Colored circle |
| Custom | `/slds/icons/custom/` | Custom object icons (custom1-100) | Colored circle/square |
| Doctype | `/slds/icons/doctype/` | File type icons (pdf, word, excel) | Transparent |

### File Formats Available

- Individual SVG files: `/slds/icons/{category}/{icon-name}.svg`
- Individual PNG files: `/slds/icons/{category}/{icon-name}_60.png`, `_120.png`
- Sprite sheets: `/slds/icons/{category}-sprite/svg/symbols.svg`

### Icon Usage by Location

| Location | Category | Example |
|----------|----------|---------|
| Object list (wizard) | standard | `standard/account.svg` |
| Component palette | utility | `utility/table.svg`, `utility/text.svg` |
| Delete button | utility | `utility/delete.svg` or `utility/close.svg` |
| Settings/gear | utility | `utility/settings.svg` |
| Search | utility | `utility/search.svg` |
| Add/New | utility | `utility/add.svg` |
| Expand/Collapse | utility | `utility/chevrondown.svg`, `utility/chevronright.svg` |
| Related List header | standard | `standard/contact.svg` (based on object) |
| App Launcher | utility | `utility/apps.svg` |

### Standard Object Icons

| Object | Icon File | Background Color |
|--------|-----------|------------------|
| Account | `standard/account.svg` | #7F8DE1 |
| Contact | `standard/contact.svg` | #A094ED |
| Lead | `standard/lead.svg` | #F88962 |
| Opportunity | `standard/opportunity.svg` | #FCB95B |
| Case | `standard/case.svg` | #F2CF5B |
| Task | `standard/task.svg` | #4BC076 |
| Event | `standard/event.svg` | #EB7092 |
| Campaign | `standard/campaign.svg` | #F49756 |

### Component Icons (for Palette)

| Component | Icon | Category |
|-----------|------|----------|
| Accordion | `utility/expand_alt.svg` | utility |
| Activities | `standard/task.svg` | standard |
| Chatter Feed | `standard/feed.svg` | standard |
| Flow | `standard/flow.svg` | standard |
| Highlights Panel | `utility/info.svg` | utility |
| List View | `utility/list.svg` | utility |
| Path | `utility/steps.svg` | utility |
| Record Detail | `utility/record.svg` | utility |
| Related List | `utility/table.svg` | utility |
| Report Chart | `utility/chart.svg` | utility |
| Rich Text | `utility/richtextindent.svg` | utility |
| Tabs | `utility/tabset.svg` | utility |

---

## Icon Component Implementation

### React Component

```tsx
// src/components/common/SLDSIcon.tsx

interface SLDSIconProps {
  category: 'standard' | 'utility' | 'action' | 'custom' | 'doctype';
  name: string;
  size?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';
  className?: string;
  /** For standard/custom icons, the background color */
  containerClassName?: string;
}

const ICON_SIZES = {
  'xx-small': 16,
  'x-small': 20,
  'small': 24,
  'medium': 32,
  'large': 48,
};

export const SLDSIcon: React.FC<SLDSIconProps> = ({
  category,
  name,
  size = 'small',
  className,
  containerClassName,
}) => {
  const iconPath = `/slds/icons/${category}/${name}.svg`;
  const pixelSize = ICON_SIZES[size];

  // Standard and custom icons need a colored container
  const needsContainer = category === 'standard' || category === 'custom' || category === 'action';

  if (needsContainer) {
    return (
      <span
        className={cn('slds-icon-container', `slds-icon-${category}-${name}`, containerClassName)}
        style={{ width: pixelSize, height: pixelSize }}
      >
        <img
          src={iconPath}
          alt=""
          className={cn('slds-icon', className)}
          width={pixelSize}
          height={pixelSize}
        />
      </span>
    );
  }

  return (
    <img
      src={iconPath}
      alt=""
      className={cn('slds-icon', `slds-icon--${size}`, className)}
      width={pixelSize}
      height={pixelSize}
    />
  );
};
```

### Icon Container Styles

```css
/* Standard object icons have colored circular/square backgrounds */
.slds-icon-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--slds-radius-border-medium);
}

/* Standard object background colors */
.slds-icon-standard-account { background-color: #7F8DE1; }
.slds-icon-standard-contact { background-color: #A094ED; }
.slds-icon-standard-lead { background-color: #F88962; }
.slds-icon-standard-opportunity { background-color: #FCB95B; }
.slds-icon-standard-case { background-color: #F2CF5B; }
.slds-icon-standard-task { background-color: #4BC076; }
.slds-icon-standard-event { background-color: #EB7092; }
.slds-icon-standard-campaign { background-color: #F49756; }

/* Utility icons - no background, inherit color */
.slds-icon-utility {
  fill: currentColor;
}
```

---

## Design Tokens Usage

### Already Defined in `slds-tokens.css`

The project has comprehensive tokens. Use them via CSS variables:

```css
/* Colors */
.my-component {
  color: var(--slds-c-text);
  background: var(--slds-c-background);
  border-color: var(--slds-c-border);
}

/* Brand colors */
.button-primary {
  background: var(--slds-c-brand);
}

/* Spacing */
.my-component {
  padding: var(--slds-spacing-medium);  /* 16px */
  margin-bottom: var(--slds-spacing-small);  /* 12px */
  gap: var(--slds-spacing-x-small);  /* 8px */
}

/* Typography */
.my-component {
  font-family: var(--slds-font-family);
  font-size: var(--slds-font-size-4);  /* 13px - body text */
  line-height: var(--slds-line-height-text);
}

/* Shadows */
.card {
  box-shadow: var(--slds-shadow-card);
}

.modal {
  box-shadow: var(--slds-shadow-elevated);
}

.dropdown {
  box-shadow: var(--slds-shadow-drop-down);
}

/* Border radius */
.card {
  border-radius: var(--slds-radius-border-medium);  /* 4px */
}

/* Z-index */
.modal {
  z-index: var(--slds-z-index-modal);  /* 9000 */
}

/* Transitions */
.animated {
  transition: all var(--slds-duration-promptly) var(--slds-timing-ease-out);  /* 0.2s ease-out */
}
```

---

## Typography

### Font Family

SLDS uses "Salesforce Sans" with system font fallbacks:

```css
font-family: var(--slds-font-family);
/* = 'Salesforce Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif */
```

**Note**: Salesforce Sans is loaded from the `@salesforce-ux/design-system` package or needs to be included separately.

### Font Sizes

| Token | Size | Usage |
|-------|------|-------|
| `--slds-font-size-1` | 10px | Tiny labels |
| `--slds-font-size-2` | 11px | Small labels |
| `--slds-font-size-3` | 12px | Field labels, helper text |
| `--slds-font-size-4` | 13px | **Body text (default)** |
| `--slds-font-size-5` | 14px | Slightly larger body |
| `--slds-font-size-6` | 16px | Subheadings |
| `--slds-font-size-7` | 18px | Section headers |
| `--slds-font-size-8` | 20px | Page titles |
| `--slds-font-size-9` | 24px | Large titles |

---

## Color Palette

### Primary Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--slds-c-brand` | #0176d3 | Primary buttons, links, focus rings |
| `--slds-c-brand-accessible` | #0b5cab | Link text (accessible) |
| `--slds-c-brand-dark` | #014486 | Hover states |
| `--slds-c-brand-light` | #1b96ff | Light accents |

### Text Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--slds-c-text` | #181818 | Primary text |
| `--slds-c-text-weak` | #747474 | Secondary text, placeholders |
| `--slds-c-text-inverse` | #ffffff | Text on dark backgrounds |
| `--slds-c-text-link` | #0b5cab | Link text |

### Background Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--slds-c-background` | #ffffff | Primary background |
| `--slds-c-background-alt` | #f3f3f3 | Secondary background, table headers |
| `--slds-c-background-inverse` | #181818 | Dark backgrounds |

### Feedback Colors

| Token | Value | Usage |
|-------|-------|-------|
| `--slds-c-success` | #2e844a | Success states |
| `--slds-c-warning` | #dd7a01 | Warning states |
| `--slds-c-error` | #ba0517 | Error states |

---

## Component-Specific Styling

### Buttons

```css
/* Neutral button */
.slds-button-neutral {
  background: var(--slds-c-background);
  border: 1px solid var(--slds-c-border);
  color: var(--slds-c-brand);
  border-radius: var(--slds-radius-border-medium);
  padding: 0 var(--slds-spacing-medium);
  height: var(--slds-height-button-medium);  /* 32px */
  font-size: var(--slds-font-size-4);  /* 13px */
}

/* Brand button */
.slds-button-brand {
  background: var(--slds-c-brand);
  border: 1px solid var(--slds-c-brand);
  color: var(--slds-c-text-inverse);
  border-radius: var(--slds-radius-border-medium);
  padding: 0 var(--slds-spacing-medium);
  height: var(--slds-height-button-medium);
  font-size: var(--slds-font-size-4);
}

.slds-button-brand:hover {
  background: var(--slds-c-brand-dark);
}
```

### Inputs

```css
.slds-input {
  border: 1px solid var(--slds-c-border);
  border-radius: var(--slds-radius-border-medium);
  padding: var(--slds-spacing-x-small) var(--slds-spacing-small);
  height: var(--slds-height-input);  /* 32px */
  font-size: var(--slds-font-size-4);
}

.slds-input:focus {
  border-color: var(--slds-c-brand);
  box-shadow: 0 0 0 1px var(--slds-c-brand);
  outline: none;
}
```

### Cards

```css
.slds-card {
  background: var(--slds-c-background);
  border: 1px solid var(--slds-c-border);
  border-radius: var(--slds-radius-border-medium);
  box-shadow: var(--slds-shadow-card);
}

.slds-card__header {
  padding: var(--slds-spacing-small) var(--slds-spacing-medium);
  border-bottom: 1px solid var(--slds-c-border);
}
```

### Modals

```css
.slds-modal__container {
  background: var(--slds-c-background);
  border-radius: var(--slds-radius-border-medium);
  box-shadow: var(--slds-shadow-elevated);
}

.slds-modal__header {
  padding: var(--slds-spacing-medium);
  border-bottom: 1px solid var(--slds-c-border);
}

.slds-modal__footer {
  padding: var(--slds-spacing-small) var(--slds-spacing-medium);
  border-top: 1px solid var(--slds-c-border);
  background: var(--slds-c-background-alt);
}

.slds-backdrop {
  background: rgba(0, 0, 0, 0.5);
  z-index: var(--slds-z-index-modal);
}
```

---

## DO's and DON'Ts

### DO

- ✅ Use SLDS icon assets from `/slds/icons/`
- ✅ Use CSS variables from `slds-tokens.css`
- ✅ Follow SLDS spacing scale (4px increments)
- ✅ Use SLDS shadows for elevation
- ✅ Match SLDS border radius (4px default)
- ✅ Use 13px as default body font size
- ✅ Use #0176d3 as primary brand blue

### DON'T

- ❌ Use emojis as icons
- ❌ Use arbitrary colors (always use tokens)
- ❌ Use non-standard spacing values
- ❌ Use generic icon libraries (Font Awesome, etc.)
- ❌ Use custom shadows that don't match SLDS
- ❌ Assume any visual element without checking SLDS

---

## Resources

- [SLDS Icons Documentation](https://www.lightningdesignsystem.com/icons/)
- [SLDS Design Tokens](https://developer.salesforce.com/docs/platform/lwc/guide/create-components-css-design-tokens.html)
- [SLDS Components Reference](https://www.lightningdesignsystem.com/components/)
- [Salesforce Icons Quick Reference](https://www.salesforceicons.com/)

---

## Acceptance Criteria

- [ ] All icons use SLDS assets from `/slds/icons/`
- [ ] All colors use `--slds-c-*` tokens
- [ ] All spacing uses `--slds-spacing-*` tokens
- [ ] All shadows use `--slds-shadow-*` tokens
- [ ] All font sizes use `--slds-font-size-*` tokens
- [ ] Visual output matches Salesforce Lightning exactly

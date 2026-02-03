/**
 * Core design types for Masquerade MVP 2.0
 * These types model the Lightning App Builder page structure
 */

// ============================================
// Page Types
// ============================================

export type PageType = 'record' | 'home' | 'app';

export type SalesforceObject =
  | 'Account'
  | 'Contact'
  | 'Lead'
  | 'Opportunity'
  | 'Case'
  | 'Task'
  | 'Event'
  | 'Campaign'
  | 'Custom'; // For custom object wireframes

// ============================================
// Layout System
// ============================================

export type RegionType = 'header' | 'main' | 'sidebar' | 'footer' | 'full';

export interface RegionDefinition {
  id: string;
  name: string;
  type: RegionType;
  /** CSS grid column specification (e.g., "1 / 9" for 8 of 12 columns) */
  gridColumn?: string;
  /** CSS grid row if needed */
  gridRow?: string;
  /** Minimum height in pixels */
  minHeight?: number;
  /** Maximum components allowed (-1 for unlimited) */
  maxComponents?: number;
  /** Whether this region can be collapsed */
  collapsible?: boolean;
  /** Placeholder text when empty */
  emptyPlaceholder?: string;
}

export interface LayoutDefinition {
  id: string;
  name: string;
  description: string;
  /** Total columns in grid (typically 12) */
  gridColumns: number;
  regions: RegionDefinition[];
}

// Pre-defined layouts
export type LayoutPreset =
  | 'single-column'
  | 'two-column-equal'
  | 'two-column-left-sidebar'
  | 'two-column-right-sidebar'
  | 'three-column'
  | 'header-two-column';

// ============================================
// Canvas Elements
// ============================================

export interface CanvasElement {
  id: string;
  /** Reference to OOB component definition ID */
  componentId: string;
  /** Component type key (e.g., 'related-list', 'rich-text') */
  type: string;
  /** Display name (can be customized by user) */
  name: string;
  /** Component-specific properties */
  properties: ComponentProperties;
  /** Sort order within region */
  order: number;
}

/** Generic properties - each component type extends this */
export interface ComponentProperties {
  [key: string]: unknown;
}

// ============================================
// Component-Specific Properties
// ============================================

export interface RichTextProperties extends ComponentProperties {
  content: string;
}

export interface TabsProperties extends ComponentProperties {
  tabs: Array<{ id: string; label: string }>;
  defaultTab?: string;
}

export interface RelatedListProperties extends ComponentProperties {
  objectName: string;
  columns: string[];
  rowCount: number;
  showHeader: boolean;
}

export interface AccordionProperties extends ComponentProperties {
  sections: Array<{
    id: string;
    label: string;
    expanded: boolean;
  }>;
  allowMultiple: boolean;
}

export interface ButtonProperties extends ComponentProperties {
  label: string;
  variant: 'base' | 'neutral' | 'brand' | 'destructive' | 'success';
  size: 'small' | 'medium' | 'large';
  disabled: boolean;
}

export interface CardProperties extends ComponentProperties {
  title: string;
  subtitle?: string;
  iconName?: string;
  showFooter: boolean;
}

export interface DataTableProperties extends ComponentProperties {
  columns: Array<{
    key: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'currency';
  }>;
  rowCount: number;
  showCheckboxes: boolean;
}

export interface ChatterFeedProperties extends ComponentProperties {
  showPublisher: boolean;
  feedType: 'record' | 'user' | 'group';
  postCount: number;
}

export interface ListViewProperties extends ComponentProperties {
  objectName: string;
  viewName: string;
  columns: string[];
  rowCount: number;
}

export interface FlowProperties extends ComponentProperties {
  flowName: string;
  showHeader: boolean;
}

export interface ReportChartProperties extends ComponentProperties {
  chartType: 'bar' | 'line' | 'pie' | 'donut' | 'funnel';
  reportName: string;
  showTitle: boolean;
}

// ============================================
// Page Design (Top-level document)
// ============================================

export interface PageDesign {
  id: string;
  name: string;
  pageType: PageType;
  /** For record pages, which object this represents */
  objectName?: SalesforceObject;
  /** Source template if created from one */
  templateId?: string;
  /** Layout configuration */
  layout: LayoutDefinition;
  /** Components organized by region ID */
  regions: Record<string, CanvasElement[]>;
  /** Metadata */
  metadata: PageDesignMetadata;
}

export interface PageDesignMetadata {
  createdAt: number;
  updatedAt: number;
  /** Base64 or URL to thumbnail preview */
  thumbnail?: string;
  /** User-added tags for organization */
  tags?: string[];
  /** Version number for future migration support */
  version: number;
}

// ============================================
// Templates
// ============================================

export type TemplateCategory = 'sales' | 'service' | 'experience' | 'blank';

export interface PageTemplate {
  id: string;
  name: string;
  description: string;
  category: TemplateCategory;
  pageType: PageType;
  /** For record templates, which object */
  objectName?: SalesforceObject;
  /** Preview thumbnail */
  thumbnail: string;
  /** Layout to use */
  layout: LayoutDefinition;
  /** Pre-populated components */
  defaultComponents: TemplateComponent[];
}

export interface TemplateComponent {
  regionId: string;
  componentId: string;
  type: string;
  name: string;
  properties?: ComponentProperties;
}

// ============================================
// Selection & Interaction State
// ============================================

export interface SelectionState {
  /** Currently selected element ID, or null */
  selectedElementId: string | null;
  /** Region being hovered for drop */
  dragOverRegionId: string | null;
  /** Drop position within region */
  dropIndex: number | null;
}

// ============================================
// Design Actions (for reducer)
// ============================================

export type DesignAction =
  | { type: 'SET_PAGE_TYPE'; pageType: PageType; objectName?: SalesforceObject }
  | { type: 'SET_LAYOUT'; layout: LayoutDefinition }
  | { type: 'LOAD_TEMPLATE'; template: PageTemplate }
  | { type: 'LOAD_DESIGN'; design: PageDesign }
  | { type: 'ADD_ELEMENT'; regionId: string; element: CanvasElement; index?: number }
  | { type: 'REMOVE_ELEMENT'; elementId: string }
  | { type: 'UPDATE_ELEMENT'; elementId: string; properties: Partial<ComponentProperties> }
  | { type: 'MOVE_ELEMENT'; elementId: string; toRegionId: string; toIndex: number }
  | { type: 'REORDER_ELEMENTS'; regionId: string; elementIds: string[] }
  | { type: 'SELECT_ELEMENT'; elementId: string | null }
  | { type: 'SET_DRAG_OVER'; regionId: string | null; index: number | null }
  | { type: 'RENAME_DESIGN'; name: string }
  | { type: 'CLEAR_DESIGN' };

// ============================================
// Export/Import
// ============================================

export interface ExportedDesign {
  version: string;
  exportedAt: number;
  design: PageDesign;
}

export type ExportFormat = 'json' | 'png' | 'pdf';

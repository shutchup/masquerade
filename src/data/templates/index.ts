/**
 * Page Templates for Masquerade
 * Organized by category (Sales, Service, Blank)
 */

import type {
  PageTemplate,
  LayoutDefinition,
  TemplateComponent,
} from '../../types/design';

// ============================================
// Layout Definitions
// ============================================

export const LAYOUTS: Record<string, LayoutDefinition> = {
  'single-column': {
    id: 'single-column',
    name: 'Single Column',
    description: 'Full-width single column layout',
    gridColumns: 12,
    regions: [
      {
        id: 'main',
        name: 'Main Content',
        type: 'full',
        gridColumn: '1 / 13',
        minHeight: 400,
        maxComponents: -1,
        emptyPlaceholder: 'Drag components here',
      },
    ],
  },

  'two-column-equal': {
    id: 'two-column-equal',
    name: 'Two Column (Equal)',
    description: 'Two equal-width columns',
    gridColumns: 12,
    regions: [
      {
        id: 'left',
        name: 'Left Column',
        type: 'main',
        gridColumn: '1 / 7',
        minHeight: 400,
        maxComponents: -1,
        emptyPlaceholder: 'Drag components here',
      },
      {
        id: 'right',
        name: 'Right Column',
        type: 'main',
        gridColumn: '7 / 13',
        minHeight: 400,
        maxComponents: -1,
        emptyPlaceholder: 'Drag components here',
      },
    ],
  },

  'two-column-left-sidebar': {
    id: 'two-column-left-sidebar',
    name: 'Sidebar Left',
    description: 'Narrow left sidebar with wide main content',
    gridColumns: 12,
    regions: [
      {
        id: 'sidebar',
        name: 'Sidebar',
        type: 'sidebar',
        gridColumn: '1 / 4',
        minHeight: 400,
        maxComponents: -1,
        collapsible: true,
        emptyPlaceholder: 'Sidebar components',
      },
      {
        id: 'main',
        name: 'Main Content',
        type: 'main',
        gridColumn: '4 / 13',
        minHeight: 400,
        maxComponents: -1,
        emptyPlaceholder: 'Drag components here',
      },
    ],
  },

  'two-column-right-sidebar': {
    id: 'two-column-right-sidebar',
    name: 'Sidebar Right',
    description: 'Wide main content with narrow right sidebar',
    gridColumns: 12,
    regions: [
      {
        id: 'main',
        name: 'Main Content',
        type: 'main',
        gridColumn: '1 / 10',
        minHeight: 400,
        maxComponents: -1,
        emptyPlaceholder: 'Drag components here',
      },
      {
        id: 'sidebar',
        name: 'Sidebar',
        type: 'sidebar',
        gridColumn: '10 / 13',
        minHeight: 400,
        maxComponents: -1,
        collapsible: true,
        emptyPlaceholder: 'Sidebar components',
      },
    ],
  },

  'header-two-column': {
    id: 'header-two-column',
    name: 'Header + Two Column',
    description: 'Full-width header with two columns below',
    gridColumns: 12,
    regions: [
      {
        id: 'header',
        name: 'Header',
        type: 'header',
        gridColumn: '1 / 13',
        gridRow: '1',
        minHeight: 100,
        maxComponents: 2,
        emptyPlaceholder: 'Header components (Highlights Panel, Path)',
      },
      {
        id: 'main',
        name: 'Main Content',
        type: 'main',
        gridColumn: '1 / 10',
        gridRow: '2',
        minHeight: 400,
        maxComponents: -1,
        emptyPlaceholder: 'Drag components here',
      },
      {
        id: 'sidebar',
        name: 'Sidebar',
        type: 'sidebar',
        gridColumn: '10 / 13',
        gridRow: '2',
        minHeight: 400,
        maxComponents: -1,
        collapsible: true,
        emptyPlaceholder: 'Sidebar components',
      },
    ],
  },

  'three-column': {
    id: 'three-column',
    name: 'Three Column',
    description: 'Three equal-width columns',
    gridColumns: 12,
    regions: [
      {
        id: 'left',
        name: 'Left Column',
        type: 'main',
        gridColumn: '1 / 5',
        minHeight: 400,
        maxComponents: -1,
        emptyPlaceholder: 'Left column',
      },
      {
        id: 'center',
        name: 'Center Column',
        type: 'main',
        gridColumn: '5 / 9',
        minHeight: 400,
        maxComponents: -1,
        emptyPlaceholder: 'Center column',
      },
      {
        id: 'right',
        name: 'Right Column',
        type: 'main',
        gridColumn: '9 / 13',
        minHeight: 400,
        maxComponents: -1,
        emptyPlaceholder: 'Right column',
      },
    ],
  },
};

// ============================================
// Sales Cloud Templates
// ============================================

const accountRecordComponents: TemplateComponent[] = [
  {
    regionId: 'header',
    componentId: 'highlights-panel',
    type: 'highlights-panel',
    name: 'Highlights Panel',
    properties: {
      fields: ['Name', 'Industry', 'Phone', 'Website'],
    },
  },
  {
    regionId: 'main',
    componentId: 'tabs',
    type: 'tabs',
    name: 'Tabs',
    properties: {
      tabs: [
        { id: 'details', label: 'Details' },
        { id: 'related', label: 'Related' },
        { id: 'news', label: 'News' },
      ],
      defaultTab: 'details',
    },
  },
  {
    regionId: 'main',
    componentId: 'related-list',
    type: 'related-list',
    name: 'Contacts',
    properties: {
      objectName: 'Contact',
      columns: ['Name', 'Title', 'Email', 'Phone'],
      rowCount: 5,
      showHeader: true,
    },
  },
  {
    regionId: 'main',
    componentId: 'related-list',
    type: 'related-list',
    name: 'Opportunities',
    properties: {
      objectName: 'Opportunity',
      columns: ['Name', 'Stage', 'Amount', 'Close Date'],
      rowCount: 5,
      showHeader: true,
    },
  },
  {
    regionId: 'sidebar',
    componentId: 'chatter-feed',
    type: 'chatter-feed',
    name: 'Chatter',
    properties: {
      showPublisher: true,
      feedType: 'record',
      postCount: 3,
    },
  },
  {
    regionId: 'sidebar',
    componentId: 'todays-tasks',
    type: 'todays-tasks',
    name: "Today's Tasks",
    properties: {},
  },
];

const opportunityRecordComponents: TemplateComponent[] = [
  {
    regionId: 'header',
    componentId: 'path',
    type: 'path',
    name: 'Path',
    properties: {
      stages: [
        'Prospecting',
        'Qualification',
        'Proposal',
        'Negotiation',
        'Closed Won',
      ],
      currentStage: 'Qualification',
    },
  },
  {
    regionId: 'main',
    componentId: 'key-deals',
    type: 'key-deals',
    name: 'Key Fields',
    properties: {
      fields: ['Amount', 'Close Date', 'Probability', 'Next Step'],
    },
  },
  {
    regionId: 'main',
    componentId: 'related-list',
    type: 'related-list',
    name: 'Products',
    properties: {
      objectName: 'OpportunityLineItem',
      columns: ['Product', 'Quantity', 'Unit Price', 'Total'],
      rowCount: 5,
      showHeader: true,
    },
  },
  {
    regionId: 'main',
    componentId: 'related-list',
    type: 'related-list',
    name: 'Contact Roles',
    properties: {
      objectName: 'OpportunityContactRole',
      columns: ['Contact', 'Role', 'Primary'],
      rowCount: 3,
      showHeader: true,
    },
  },
  {
    regionId: 'sidebar',
    componentId: 'einstein-next-best-actions',
    type: 'einstein-next-best-actions',
    name: 'Einstein Recommendations',
    properties: {},
  },
  {
    regionId: 'sidebar',
    componentId: 'todays-tasks',
    type: 'todays-tasks',
    name: 'Activities',
    properties: {},
  },
];

// ============================================
// Service Cloud Templates
// ============================================

const caseRecordComponents: TemplateComponent[] = [
  {
    regionId: 'header',
    componentId: 'highlights-panel',
    type: 'highlights-panel',
    name: 'Highlights Panel',
    properties: {
      fields: ['CaseNumber', 'Status', 'Priority', 'Subject'],
    },
  },
  {
    regionId: 'main',
    componentId: 'chatter-feed',
    type: 'chatter-feed',
    name: 'Case Feed',
    properties: {
      showPublisher: true,
      feedType: 'record',
      postCount: 5,
    },
  },
  {
    regionId: 'main',
    componentId: 'related-list',
    type: 'related-list',
    name: 'Related Cases',
    properties: {
      objectName: 'Case',
      columns: ['CaseNumber', 'Subject', 'Status'],
      rowCount: 3,
      showHeader: true,
    },
  },
  {
    regionId: 'sidebar',
    componentId: 'rich-text',
    type: 'rich-text',
    name: 'Case Details',
    properties: {
      content: 'Description and resolution details appear here.',
    },
  },
  {
    regionId: 'sidebar',
    componentId: 'assistant',
    type: 'assistant',
    name: 'Einstein Assistant',
    properties: {},
  },
];

// ============================================
// Blank Templates
// ============================================

const blankSingleColumn: TemplateComponent[] = [];
const blankTwoColumnSidebar: TemplateComponent[] = [];

// ============================================
// Template Registry
// ============================================

export const TEMPLATES: PageTemplate[] = [
  // Sales Cloud
  {
    id: 'sales-account-record',
    name: 'Account Record Page',
    description:
      'Standard account record layout with highlights, related lists, and activity sidebar',
    category: 'sales',
    pageType: 'record',
    objectName: 'Account',
    thumbnail: '/templates/account-record.png',
    layout: LAYOUTS['header-two-column'],
    defaultComponents: accountRecordComponents,
  },
  {
    id: 'sales-opportunity-record',
    name: 'Opportunity Record Page',
    description:
      'Sales opportunity layout with path, key fields, products, and Einstein recommendations',
    category: 'sales',
    pageType: 'record',
    objectName: 'Opportunity',
    thumbnail: '/templates/opportunity-record.png',
    layout: LAYOUTS['header-two-column'],
    defaultComponents: opportunityRecordComponents,
  },
  {
    id: 'sales-lead-record',
    name: 'Lead Record Page',
    description: 'Lead record with convert button, lead score, and campaign history',
    category: 'sales',
    pageType: 'record',
    objectName: 'Lead',
    thumbnail: '/templates/lead-record.png',
    layout: LAYOUTS['header-two-column'],
    defaultComponents: [], // Define later
  },

  // Service Cloud
  {
    id: 'service-case-record',
    name: 'Case Record Page',
    description: 'Service case layout with case feed, knowledge sidebar, and related cases',
    category: 'service',
    pageType: 'record',
    objectName: 'Case',
    thumbnail: '/templates/case-record.png',
    layout: LAYOUTS['header-two-column'],
    defaultComponents: caseRecordComponents,
  },

  // Blank Templates
  {
    id: 'blank-single-column',
    name: 'Single Column',
    description: 'Blank single column layout - start from scratch',
    category: 'blank',
    pageType: 'app',
    thumbnail: '/templates/blank-single.png',
    layout: LAYOUTS['single-column'],
    defaultComponents: blankSingleColumn,
  },
  {
    id: 'blank-two-column',
    name: 'Two Column with Sidebar',
    description: 'Blank layout with main content and sidebar',
    category: 'blank',
    pageType: 'app',
    thumbnail: '/templates/blank-two-column.png',
    layout: LAYOUTS['two-column-right-sidebar'],
    defaultComponents: blankTwoColumnSidebar,
  },
  {
    id: 'blank-header-two-column',
    name: 'Header + Two Column',
    description: 'Full-width header with main content and sidebar below',
    category: 'blank',
    pageType: 'record',
    thumbnail: '/templates/blank-header-two-col.png',
    layout: LAYOUTS['header-two-column'],
    defaultComponents: [],
  },
  {
    id: 'blank-three-column',
    name: 'Three Column',
    description: 'Three equal-width columns for complex layouts',
    category: 'blank',
    pageType: 'app',
    thumbnail: '/templates/blank-three-column.png',
    layout: LAYOUTS['three-column'],
    defaultComponents: [],
  },
];

// ============================================
// Helper Functions
// ============================================

export function getTemplatesByCategory(category: string): PageTemplate[] {
  return TEMPLATES.filter((t) => t.category === category);
}

export function getTemplatesByPageType(pageType: string): PageTemplate[] {
  return TEMPLATES.filter((t) => t.pageType === pageType);
}

export function getTemplateById(id: string): PageTemplate | undefined {
  return TEMPLATES.find((t) => t.id === id);
}

export function getLayoutById(id: string): LayoutDefinition | undefined {
  return LAYOUTS[id];
}

export function getAllLayouts(): LayoutDefinition[] {
  return Object.values(LAYOUTS);
}

/**
 * Component Property Schemas
 * Defines editable properties for each component type
 * Used by PropertyPanel to render appropriate editors
 */

export type PropertyType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'boolean'
  | 'select'
  | 'multiselect'
  | 'color'
  | 'icon'
  | 'array';

export interface PropertySchema {
  key: string;
  label: string;
  type: PropertyType;
  description?: string;
  defaultValue?: unknown;
  required?: boolean;
  /** For select/multiselect types */
  options?: Array<{ value: string; label: string }>;
  /** For number type */
  min?: number;
  max?: number;
  step?: number;
  /** For array type - schema of array items */
  itemSchema?: PropertySchema[];
  /** Conditional visibility */
  showWhen?: { key: string; value: unknown };
}

export interface ComponentSchema {
  id: string;
  name: string;
  description: string;
  category: 'standard' | 'base' | 'custom';
  icon?: string;
  properties: PropertySchema[];
  /** Default properties when component is created */
  defaultProperties: Record<string, unknown>;
}

// ============================================
// Standard Component Schemas
// ============================================

export const COMPONENT_SCHEMAS: Record<string, ComponentSchema> = {
  // ----------------------------------------
  // Layout Components
  // ----------------------------------------
  accordion: {
    id: 'accordion',
    name: 'Accordion',
    description: 'Expandable sections for organizing content',
    category: 'standard',
    icon: 'utility:expand_alt',
    properties: [
      {
        key: 'sections',
        label: 'Sections',
        type: 'array',
        description: 'Accordion sections',
        itemSchema: [
          { key: 'label', label: 'Label', type: 'text', required: true },
          { key: 'expanded', label: 'Expanded', type: 'boolean' },
        ],
      },
      {
        key: 'allowMultiple',
        label: 'Allow Multiple Open',
        type: 'boolean',
        description: 'Allow multiple sections to be open at once',
        defaultValue: false,
      },
    ],
    defaultProperties: {
      sections: [
        { id: '1', label: 'Section 1', expanded: true },
        { id: '2', label: 'Section 2', expanded: false },
        { id: '3', label: 'Section 3', expanded: false },
      ],
      allowMultiple: false,
    },
  },

  tabs: {
    id: 'tabs',
    name: 'Tabs',
    description: 'Tabbed content container',
    category: 'standard',
    icon: 'utility:tabset',
    properties: [
      {
        key: 'tabs',
        label: 'Tabs',
        type: 'array',
        description: 'Tab definitions',
        itemSchema: [
          { key: 'label', label: 'Label', type: 'text', required: true },
        ],
      },
      {
        key: 'defaultTab',
        label: 'Default Tab',
        type: 'text',
        description: 'ID of initially selected tab',
      },
    ],
    defaultProperties: {
      tabs: [
        { id: 'tab1', label: 'Details' },
        { id: 'tab2', label: 'Related' },
      ],
      defaultTab: 'tab1',
    },
  },

  // ----------------------------------------
  // Content Components
  // ----------------------------------------
  'rich-text': {
    id: 'rich-text',
    name: 'Rich Text',
    description: 'Static text content block',
    category: 'standard',
    icon: 'utility:text',
    properties: [
      {
        key: 'content',
        label: 'Content',
        type: 'textarea',
        description: 'Text content to display',
        defaultValue: 'Enter your text here...',
      },
    ],
    defaultProperties: {
      content: 'Add your content here. This rich text component supports formatted text.',
    },
  },

  // ----------------------------------------
  // Data Components
  // ----------------------------------------
  'related-list': {
    id: 'related-list',
    name: 'Related List',
    description: 'List of related records',
    category: 'standard',
    icon: 'utility:table',
    properties: [
      {
        key: 'objectName',
        label: 'Object',
        type: 'select',
        description: 'Related object to display',
        options: [
          { value: 'Contact', label: 'Contacts' },
          { value: 'Opportunity', label: 'Opportunities' },
          { value: 'Case', label: 'Cases' },
          { value: 'Task', label: 'Tasks' },
          { value: 'Event', label: 'Events' },
          { value: 'Note', label: 'Notes' },
          { value: 'Attachment', label: 'Files' },
        ],
        required: true,
      },
      {
        key: 'columns',
        label: 'Columns',
        type: 'multiselect',
        description: 'Columns to display',
        options: [
          { value: 'Name', label: 'Name' },
          { value: 'Title', label: 'Title' },
          { value: 'Email', label: 'Email' },
          { value: 'Phone', label: 'Phone' },
          { value: 'Status', label: 'Status' },
          { value: 'Amount', label: 'Amount' },
          { value: 'CloseDate', label: 'Close Date' },
        ],
      },
      {
        key: 'rowCount',
        label: 'Rows to Display',
        type: 'number',
        min: 1,
        max: 20,
        defaultValue: 5,
      },
      {
        key: 'showHeader',
        label: 'Show Header',
        type: 'boolean',
        defaultValue: true,
      },
    ],
    defaultProperties: {
      objectName: 'Contact',
      columns: ['Name', 'Title', 'Email'],
      rowCount: 5,
      showHeader: true,
    },
  },

  'list-view': {
    id: 'list-view',
    name: 'List View',
    description: 'Object list view',
    category: 'standard',
    icon: 'utility:list',
    properties: [
      {
        key: 'objectName',
        label: 'Object',
        type: 'select',
        options: [
          { value: 'Account', label: 'Accounts' },
          { value: 'Contact', label: 'Contacts' },
          { value: 'Opportunity', label: 'Opportunities' },
          { value: 'Lead', label: 'Leads' },
          { value: 'Case', label: 'Cases' },
        ],
        required: true,
      },
      {
        key: 'viewName',
        label: 'View Name',
        type: 'text',
        defaultValue: 'All Open',
      },
      {
        key: 'rowCount',
        label: 'Rows',
        type: 'number',
        min: 5,
        max: 50,
        defaultValue: 10,
      },
    ],
    defaultProperties: {
      objectName: 'Account',
      viewName: 'Recently Viewed',
      rowCount: 10,
    },
  },

  'report-chart': {
    id: 'report-chart',
    name: 'Report Chart',
    description: 'Chart from a Salesforce report',
    category: 'standard',
    icon: 'utility:chart',
    properties: [
      {
        key: 'chartType',
        label: 'Chart Type',
        type: 'select',
        options: [
          { value: 'bar', label: 'Bar Chart' },
          { value: 'line', label: 'Line Chart' },
          { value: 'pie', label: 'Pie Chart' },
          { value: 'donut', label: 'Donut Chart' },
          { value: 'funnel', label: 'Funnel Chart' },
        ],
        defaultValue: 'bar',
      },
      {
        key: 'reportName',
        label: 'Report Name',
        type: 'text',
        defaultValue: 'Sample Report',
      },
      {
        key: 'showTitle',
        label: 'Show Title',
        type: 'boolean',
        defaultValue: true,
      },
    ],
    defaultProperties: {
      chartType: 'bar',
      reportName: 'Sales by Region',
      showTitle: true,
    },
  },

  // ----------------------------------------
  // Social Components
  // ----------------------------------------
  'chatter-feed': {
    id: 'chatter-feed',
    name: 'Chatter Feed',
    description: 'Activity feed with posts and comments',
    category: 'standard',
    icon: 'utility:chat',
    properties: [
      {
        key: 'showPublisher',
        label: 'Show Publisher',
        type: 'boolean',
        description: 'Show post input at top',
        defaultValue: true,
      },
      {
        key: 'feedType',
        label: 'Feed Type',
        type: 'select',
        options: [
          { value: 'record', label: 'Record Feed' },
          { value: 'user', label: 'User Feed' },
          { value: 'group', label: 'Group Feed' },
        ],
        defaultValue: 'record',
      },
      {
        key: 'postCount',
        label: 'Posts to Show',
        type: 'number',
        min: 1,
        max: 10,
        defaultValue: 3,
      },
    ],
    defaultProperties: {
      showPublisher: true,
      feedType: 'record',
      postCount: 3,
    },
  },

  // ----------------------------------------
  // AI Components
  // ----------------------------------------
  assistant: {
    id: 'assistant',
    name: 'Einstein Assistant',
    description: 'AI-powered assistant chat',
    category: 'standard',
    icon: 'utility:einstein',
    properties: [
      {
        key: 'welcomeMessage',
        label: 'Welcome Message',
        type: 'text',
        defaultValue: 'How can I help you today?',
      },
    ],
    defaultProperties: {
      welcomeMessage: 'How can I help you today?',
    },
  },

  'einstein-next-best-actions': {
    id: 'einstein-next-best-actions',
    name: 'Einstein Next Best Actions',
    description: 'AI recommendations for next steps',
    category: 'standard',
    icon: 'utility:einstein',
    properties: [
      {
        key: 'maxRecommendations',
        label: 'Max Recommendations',
        type: 'number',
        min: 1,
        max: 5,
        defaultValue: 3,
      },
    ],
    defaultProperties: {
      maxRecommendations: 3,
    },
  },

  // ----------------------------------------
  // Record Components
  // ----------------------------------------
  'highlights-panel': {
    id: 'highlights-panel',
    name: 'Highlights Panel',
    description: 'Key fields displayed at top of record',
    category: 'standard',
    icon: 'utility:info',
    properties: [
      {
        key: 'fields',
        label: 'Fields',
        type: 'multiselect',
        description: 'Fields to display in highlights',
        options: [
          { value: 'Name', label: 'Name' },
          { value: 'Title', label: 'Title' },
          { value: 'Email', label: 'Email' },
          { value: 'Phone', label: 'Phone' },
          { value: 'Industry', label: 'Industry' },
          { value: 'Website', label: 'Website' },
          { value: 'Status', label: 'Status' },
          { value: 'Amount', label: 'Amount' },
        ],
      },
    ],
    defaultProperties: {
      fields: ['Name', 'Phone', 'Email', 'Industry'],
    },
  },

  path: {
    id: 'path',
    name: 'Path',
    description: 'Visual process path with stages',
    category: 'standard',
    icon: 'utility:steps',
    properties: [
      {
        key: 'stages',
        label: 'Stages',
        type: 'array',
        itemSchema: [
          { key: 'label', label: 'Stage Name', type: 'text', required: true },
        ],
      },
      {
        key: 'currentStage',
        label: 'Current Stage',
        type: 'text',
      },
    ],
    defaultProperties: {
      stages: ['Stage 1', 'Stage 2', 'Stage 3', 'Stage 4'],
      currentStage: 'Stage 1',
    },
  },

  // ----------------------------------------
  // Activity Components
  // ----------------------------------------
  'todays-tasks': {
    id: 'todays-tasks',
    name: "Today's Tasks",
    description: 'Tasks due today',
    category: 'standard',
    icon: 'utility:task',
    properties: [
      {
        key: 'showCompleted',
        label: 'Show Completed',
        type: 'boolean',
        defaultValue: false,
      },
      {
        key: 'maxTasks',
        label: 'Max Tasks',
        type: 'number',
        min: 1,
        max: 10,
        defaultValue: 5,
      },
    ],
    defaultProperties: {
      showCompleted: false,
      maxTasks: 5,
    },
  },

  'todays-events': {
    id: 'todays-events',
    name: "Today's Events",
    description: 'Calendar events for today',
    category: 'standard',
    icon: 'utility:event',
    properties: [
      {
        key: 'maxEvents',
        label: 'Max Events',
        type: 'number',
        min: 1,
        max: 10,
        defaultValue: 5,
      },
    ],
    defaultProperties: {
      maxEvents: 5,
    },
  },

  'recent-items': {
    id: 'recent-items',
    name: 'Recent Items',
    description: 'Recently viewed records',
    category: 'standard',
    icon: 'utility:clock',
    properties: [
      {
        key: 'maxItems',
        label: 'Max Items',
        type: 'number',
        min: 5,
        max: 20,
        defaultValue: 10,
      },
    ],
    defaultProperties: {
      maxItems: 10,
    },
  },

  // ----------------------------------------
  // Automation Components
  // ----------------------------------------
  flow: {
    id: 'flow',
    name: 'Flow',
    description: 'Embedded Flow automation',
    category: 'standard',
    icon: 'utility:flow',
    properties: [
      {
        key: 'flowName',
        label: 'Flow Name',
        type: 'text',
        defaultValue: 'My Flow',
      },
      {
        key: 'showHeader',
        label: 'Show Header',
        type: 'boolean',
        defaultValue: true,
      },
    ],
    defaultProperties: {
      flowName: 'Sample Flow',
      showHeader: true,
    },
  },

  // ----------------------------------------
  // Base SLDS Components
  // ----------------------------------------
  button: {
    id: 'button',
    name: 'Button',
    description: 'Action button',
    category: 'base',
    icon: 'utility:touch_action',
    properties: [
      {
        key: 'label',
        label: 'Label',
        type: 'text',
        required: true,
        defaultValue: 'Button',
      },
      {
        key: 'variant',
        label: 'Variant',
        type: 'select',
        options: [
          { value: 'base', label: 'Base' },
          { value: 'neutral', label: 'Neutral' },
          { value: 'brand', label: 'Brand' },
          { value: 'destructive', label: 'Destructive' },
          { value: 'success', label: 'Success' },
        ],
        defaultValue: 'neutral',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'select',
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ],
        defaultValue: 'medium',
      },
      {
        key: 'disabled',
        label: 'Disabled',
        type: 'boolean',
        defaultValue: false,
      },
    ],
    defaultProperties: {
      label: 'Button',
      variant: 'neutral',
      size: 'medium',
      disabled: false,
    },
  },

  card: {
    id: 'card',
    name: 'Card',
    description: 'Content container card',
    category: 'base',
    icon: 'utility:layout',
    properties: [
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        defaultValue: 'Card Title',
      },
      {
        key: 'subtitle',
        label: 'Subtitle',
        type: 'text',
      },
      {
        key: 'iconName',
        label: 'Icon',
        type: 'icon',
      },
      {
        key: 'showFooter',
        label: 'Show Footer',
        type: 'boolean',
        defaultValue: false,
      },
    ],
    defaultProperties: {
      title: 'Card Title',
      showFooter: false,
    },
  },

  input: {
    id: 'input',
    name: 'Input',
    description: 'Text input field',
    category: 'base',
    icon: 'utility:edit',
    properties: [
      {
        key: 'label',
        label: 'Label',
        type: 'text',
        required: true,
        defaultValue: 'Field Label',
      },
      {
        key: 'placeholder',
        label: 'Placeholder',
        type: 'text',
      },
      {
        key: 'type',
        label: 'Input Type',
        type: 'select',
        options: [
          { value: 'text', label: 'Text' },
          { value: 'email', label: 'Email' },
          { value: 'number', label: 'Number' },
          { value: 'tel', label: 'Phone' },
          { value: 'url', label: 'URL' },
        ],
        defaultValue: 'text',
      },
      {
        key: 'required',
        label: 'Required',
        type: 'boolean',
        defaultValue: false,
      },
    ],
    defaultProperties: {
      label: 'Field Label',
      placeholder: 'Enter value...',
      type: 'text',
      required: false,
    },
  },

  'data-table': {
    id: 'data-table',
    name: 'Data Table',
    description: 'Tabular data display',
    category: 'base',
    icon: 'utility:table',
    properties: [
      {
        key: 'columns',
        label: 'Columns',
        type: 'array',
        itemSchema: [
          { key: 'label', label: 'Header', type: 'text', required: true },
          {
            key: 'type',
            label: 'Type',
            type: 'select',
            options: [
              { value: 'text', label: 'Text' },
              { value: 'number', label: 'Number' },
              { value: 'date', label: 'Date' },
              { value: 'currency', label: 'Currency' },
            ],
          },
        ],
      },
      {
        key: 'rowCount',
        label: 'Row Count',
        type: 'number',
        min: 1,
        max: 20,
        defaultValue: 5,
      },
      {
        key: 'showCheckboxes',
        label: 'Show Checkboxes',
        type: 'boolean',
        defaultValue: false,
      },
    ],
    defaultProperties: {
      columns: [
        { key: 'name', label: 'Name', type: 'text' },
        { key: 'value', label: 'Value', type: 'number' },
        { key: 'date', label: 'Date', type: 'date' },
      ],
      rowCount: 5,
      showCheckboxes: false,
    },
  },

  picklist: {
    id: 'picklist',
    name: 'Picklist',
    description: 'Dropdown selection',
    category: 'base',
    icon: 'utility:picklist_type',
    properties: [
      {
        key: 'label',
        label: 'Label',
        type: 'text',
        required: true,
        defaultValue: 'Select Option',
      },
      {
        key: 'options',
        label: 'Options',
        type: 'array',
        itemSchema: [
          { key: 'label', label: 'Label', type: 'text', required: true },
          { key: 'value', label: 'Value', type: 'text', required: true },
        ],
      },
      {
        key: 'required',
        label: 'Required',
        type: 'boolean',
        defaultValue: false,
      },
    ],
    defaultProperties: {
      label: 'Select Option',
      options: [
        { label: 'Option 1', value: 'opt1' },
        { label: 'Option 2', value: 'opt2' },
        { label: 'Option 3', value: 'opt3' },
      ],
      required: false,
    },
  },

  modal: {
    id: 'modal',
    name: 'Modal',
    description: 'Modal dialog representation',
    category: 'base',
    icon: 'utility:new_window',
    properties: [
      {
        key: 'title',
        label: 'Title',
        type: 'text',
        defaultValue: 'Modal Title',
      },
      {
        key: 'size',
        label: 'Size',
        type: 'select',
        options: [
          { value: 'small', label: 'Small' },
          { value: 'medium', label: 'Medium' },
          { value: 'large', label: 'Large' },
        ],
        defaultValue: 'medium',
      },
    ],
    defaultProperties: {
      title: 'Modal Title',
      size: 'medium',
    },
  },

  form: {
    id: 'form',
    name: 'Form',
    description: 'Form layout with fields',
    category: 'base',
    icon: 'utility:form',
    properties: [
      {
        key: 'columns',
        label: 'Columns',
        type: 'select',
        options: [
          { value: '1', label: '1 Column' },
          { value: '2', label: '2 Columns' },
        ],
        defaultValue: '2',
      },
      {
        key: 'fieldCount',
        label: 'Field Count',
        type: 'number',
        min: 1,
        max: 20,
        defaultValue: 6,
      },
    ],
    defaultProperties: {
      columns: '2',
      fieldCount: 6,
    },
  },

  'button-group': {
    id: 'button-group',
    name: 'Button Group',
    description: 'Group of related buttons',
    category: 'base',
    icon: 'utility:rows',
    properties: [
      {
        key: 'buttons',
        label: 'Buttons',
        type: 'array',
        itemSchema: [
          { key: 'label', label: 'Label', type: 'text', required: true },
          {
            key: 'variant',
            label: 'Variant',
            type: 'select',
            options: [
              { value: 'neutral', label: 'Neutral' },
              { value: 'brand', label: 'Brand' },
            ],
          },
        ],
      },
    ],
    defaultProperties: {
      buttons: [
        { label: 'Button 1', variant: 'neutral' },
        { label: 'Button 2', variant: 'neutral' },
        { label: 'Button 3', variant: 'brand' },
      ],
    },
  },
};

// ============================================
// Helper Functions
// ============================================

export function getComponentSchema(componentId: string): ComponentSchema | undefined {
  return COMPONENT_SCHEMAS[componentId];
}

export function getComponentsByCategory(
  category: 'standard' | 'base' | 'custom'
): ComponentSchema[] {
  return Object.values(COMPONENT_SCHEMAS).filter((c) => c.category === category);
}

export function getDefaultProperties(componentId: string): Record<string, unknown> {
  const schema = COMPONENT_SCHEMAS[componentId];
  return schema?.defaultProperties ?? {};
}

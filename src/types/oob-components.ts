// OOB Component definitions for Lightning App Builder style
export interface OOBComponent {
    id: string;
    type: string;
    name: string;
    icon: string;
    category: 'standard' | 'base' | 'custom';
    defaultWidth?: string;
    defaultHeight?: string;
}

// Standard OOB Components (like real Lightning App Builder)
export const standardComponents: OOBComponent[] = [
    { id: 'accordion', type: 'accordion', name: 'Accordion', icon: '📂', category: 'standard' },
    { id: 'app-launcher', type: 'app-launcher', name: 'App Launcher', icon: '⊞', category: 'standard' },
    { id: 'assistant', type: 'assistant', name: 'Assistant', icon: '🤖', category: 'standard' },
    { id: 'chatter-feed', type: 'chatter-feed', name: 'Chatter Feed', icon: '💬', category: 'standard' },
    { id: 'einstein-actions', type: 'einstein-actions', name: 'Einstein Next Best Actions', icon: '🧠', category: 'standard' },
    { id: 'flow', type: 'flow', name: 'Flow', icon: '⚡', category: 'standard' },
    { id: 'key-deals', type: 'key-deals', name: 'Key Deals', icon: '💰', category: 'standard' },
    { id: 'list-view', type: 'list-view', name: 'List View', icon: '📋', category: 'standard' },
    { id: 'performance-chart', type: 'performance-chart', name: 'Performance Chart', icon: '📊', category: 'standard' },
    { id: 'recent-items', type: 'recent-items', name: 'Recent Items', icon: '🕐', category: 'standard' },
    { id: 'related-list', type: 'related-list', name: 'Related List', icon: '📑', category: 'standard' },
    { id: 'report-chart', type: 'report-chart', name: 'Report Chart', icon: '📈', category: 'standard' },
    { id: 'rich-text', type: 'rich-text', name: 'Rich Text', icon: '📝', category: 'standard' },
    { id: 'tabs', type: 'tabs', name: 'Tabs', icon: '📁', category: 'standard' },
    { id: 'todays-events', type: 'todays-events', name: "Today's Events", icon: '📅', category: 'standard' },
    { id: 'todays-tasks', type: 'todays-tasks', name: "Today's Tasks", icon: '✅', category: 'standard' },
];

// Base SLDS Components
export const baseComponents: OOBComponent[] = [
    { id: 'button', type: 'button', name: 'Button', icon: '🔘', category: 'base' },
    { id: 'button-group', type: 'button-group', name: 'Button Group', icon: '⬜', category: 'base' },
    { id: 'card', type: 'card', name: 'Card', icon: '📋', category: 'base' },
    { id: 'data-table', type: 'data-table', name: 'Data Table', icon: '📊', category: 'base' },
    { id: 'form', type: 'form', name: 'Form', icon: '📝', category: 'base' },
    { id: 'input', type: 'input', name: 'Input', icon: '✏️', category: 'base' },
    { id: 'modal', type: 'modal', name: 'Modal', icon: '🪟', category: 'base' },
    { id: 'picklist', type: 'picklist', name: 'Picklist', icon: '📃', category: 'base' },
];

// Get components by category
export function getComponentsByCategory(category: 'standard' | 'base' | 'custom'): OOBComponent[] {
    switch (category) {
        case 'standard':
            return standardComponents;
        case 'base':
            return baseComponents;
        case 'custom':
            return []; // User-defined components
        default:
            return [];
    }
}

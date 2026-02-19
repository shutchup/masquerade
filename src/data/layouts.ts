import { LayoutDefinition } from '../types/design';

/**
 * Pre-defined page layouts for the wizard
 * Each layout uses a 12-column grid system
 */

// Layout 1: Header and One Region
const headerOneRegion: LayoutDefinition = {
  id: 'header-one-region',
  name: 'Header and One Region',
  description: 'A header area followed by a single content region',
  gridColumns: 12,
  regions: [
    {
      id: 'header',
      name: 'Header',
      type: 'header',
      gridColumn: '1 / 13',
      gridRow: '1',
      minHeight: 100,
      emptyPlaceholder: 'Drop components here for the header area',
    },
    {
      id: 'main',
      name: 'Main Content',
      type: 'main',
      gridColumn: '1 / 13',
      gridRow: '2',
      minHeight: 400,
      emptyPlaceholder: 'Drop components here for the main content',
    },
  ],
};

// Layout 2: Header and Right Sidebar (9:3 split)
const headerRightSidebar: LayoutDefinition = {
  id: 'header-right-sidebar',
  name: 'Header and Right Sidebar',
  description: 'Header with main content on left and sidebar on right',
  gridColumns: 12,
  regions: [
    {
      id: 'header',
      name: 'Header',
      type: 'header',
      gridColumn: '1 / 13',
      gridRow: '1',
      minHeight: 100,
      emptyPlaceholder: 'Drop components here for the header area',
    },
    {
      id: 'main',
      name: 'Main Content',
      type: 'main',
      gridColumn: '1 / 10',
      gridRow: '2',
      minHeight: 400,
      emptyPlaceholder: 'Drop components here for the main content',
    },
    {
      id: 'sidebar',
      name: 'Sidebar',
      type: 'sidebar',
      gridColumn: '10 / 13',
      gridRow: '2',
      minHeight: 400,
      emptyPlaceholder: 'Drop components here for the sidebar',
    },
  ],
};

// Layout 3: Header and Left Sidebar (3:9 split)
const headerLeftSidebar: LayoutDefinition = {
  id: 'header-left-sidebar',
  name: 'Header and Left Sidebar',
  description: 'Header with sidebar on left and main content on right',
  gridColumns: 12,
  regions: [
    {
      id: 'header',
      name: 'Header',
      type: 'header',
      gridColumn: '1 / 13',
      gridRow: '1',
      minHeight: 100,
      emptyPlaceholder: 'Drop components here for the header area',
    },
    {
      id: 'sidebar',
      name: 'Sidebar',
      type: 'sidebar',
      gridColumn: '1 / 4',
      gridRow: '2',
      minHeight: 400,
      emptyPlaceholder: 'Drop components here for the sidebar',
    },
    {
      id: 'main',
      name: 'Main Content',
      type: 'main',
      gridColumn: '4 / 13',
      gridRow: '2',
      minHeight: 400,
      emptyPlaceholder: 'Drop components here for the main content',
    },
  ],
};

// Layout 4: Header and Two Equal Regions (6:6 split)
const headerTwoEqual: LayoutDefinition = {
  id: 'header-two-equal',
  name: 'Header and Two Equal Regions',
  description: 'Header with two equal-width content regions below',
  gridColumns: 12,
  regions: [
    {
      id: 'header',
      name: 'Header',
      type: 'header',
      gridColumn: '1 / 13',
      gridRow: '1',
      minHeight: 100,
      emptyPlaceholder: 'Drop components here for the header area',
    },
    {
      id: 'main',
      name: 'Left Content',
      type: 'main',
      gridColumn: '1 / 7',
      gridRow: '2',
      minHeight: 400,
      emptyPlaceholder: 'Drop components here for the left content',
    },
    {
      id: 'sidebar',
      name: 'Right Content',
      type: 'sidebar',
      gridColumn: '7 / 13',
      gridRow: '2',
      minHeight: 400,
      emptyPlaceholder: 'Drop components here for the right content',
    },
  ],
};

// Layout 5: One Region (simple full-width)
const oneRegion: LayoutDefinition = {
  id: 'one-region',
  name: 'One Region',
  description: 'A single full-width content region',
  gridColumns: 12,
  regions: [
    {
      id: 'main',
      name: 'Main Content',
      type: 'main',
      gridColumn: '1 / 13',
      gridRow: '1',
      minHeight: 500,
      emptyPlaceholder: 'Drop components here',
    },
  ],
};

/**
 * All available layouts for the wizard
 */
export const AVAILABLE_LAYOUTS: LayoutDefinition[] = [
  headerOneRegion,
  headerRightSidebar,
  headerLeftSidebar,
  headerTwoEqual,
  oneRegion,
];

/**
 * Get a layout by ID
 */
export function getLayoutById(id: string): LayoutDefinition | undefined {
  return AVAILABLE_LAYOUTS.find(layout => layout.id === id);
}

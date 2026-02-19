import React, { createContext, useReducer, useEffect, ReactNode } from 'react';
import { PageDesign, SelectionState, PageType, LayoutDefinition, CanvasElement, RegionDefinition } from '../types/design';
import { OOBComponent } from '../types/oob-components';

// ============================================
// State Interfaces
// ============================================

export interface StandardObject {
  type: 'standard';
  name: string;
  apiName: string;
  icon: string;
  pluralLabel: string;
}

export interface CustomObject {
  type: 'custom';
  name: string; // Display name
  label: string; // Same as name for consistency
  pluralLabel: string;
  apiName: string;
  icon?: string;
  description?: string;
}

export type SalesforceObjectType = StandardObject | CustomObject;

export interface WizardState {
  isOpen: boolean;
  currentStep: 1 | 2 | 3;
  selectedPageType: PageType | null;
  selectedObject: SalesforceObjectType | null;
  selectedLayout: LayoutDefinition | null;
  customObjects: CustomObject[];
}

export interface DragState {
  isDragging: boolean;
  draggedComponent: OOBComponent | null;
}

export interface UIState {
  paletteTab: 'standard' | 'base' | 'custom';
  searchQuery: string;
  activeNavTab: string;
}

export interface DesignState {
  design: PageDesign | null;
  wizard: WizardState;
  selection: SelectionState;
  drag: DragState;
  ui: UIState;
}

// ============================================
// Actions
// ============================================

export type DesignContextAction =
  // Wizard actions
  | { type: 'WIZARD_OPEN' }
  | { type: 'WIZARD_CLOSE' }
  | { type: 'WIZARD_SET_STEP'; step: 1 | 2 | 3 }
  | { type: 'WIZARD_SELECT_PAGE_TYPE'; pageType: PageType }
  | { type: 'WIZARD_SELECT_OBJECT'; object: SalesforceObjectType }
  | { type: 'WIZARD_SELECT_LAYOUT'; layout: LayoutDefinition }
  | { type: 'WIZARD_ADD_CUSTOM_OBJECT'; customObject: CustomObject }
  | { type: 'WIZARD_COMPLETE' }

  // Design actions
  | { type: 'NEW_DESIGN' }
  | { type: 'LOAD_DESIGN'; design: PageDesign }
  | { type: 'ADD_ELEMENT'; regionId: string; element: CanvasElement; index?: number }
  | { type: 'REMOVE_ELEMENT'; elementId: string }
  | { type: 'UPDATE_ELEMENT'; elementId: string; properties: Record<string, unknown> }
  | { type: 'MOVE_ELEMENT'; elementId: string; toRegionId: string; toIndex: number }
  | { type: 'RENAME_DESIGN'; name: string }

  // Selection actions
  | { type: 'SELECT_ELEMENT'; elementId: string | null }
  | { type: 'SET_DRAG_OVER'; regionId: string | null; index: number | null }

  // Drag actions
  | { type: 'DRAG_START'; component: OOBComponent }
  | { type: 'DRAG_END' }

  // UI actions
  | { type: 'SET_PALETTE_TAB'; tab: 'standard' | 'base' | 'custom' }
  | { type: 'SET_SEARCH_QUERY'; query: string }
  | { type: 'SET_ACTIVE_NAV_TAB'; tab: string };

// ============================================
// Initial State
// ============================================

const initialState: DesignState = {
  design: null,
  wizard: {
    isOpen: false,
    currentStep: 1,
    selectedPageType: null,
    selectedObject: null,
    selectedLayout: null,
    customObjects: [],
  },
  selection: {
    selectedElementId: null,
    dragOverRegionId: null,
    dropIndex: null,
  },
  drag: {
    isDragging: false,
    draggedComponent: null,
  },
  ui: {
    paletteTab: 'standard',
    searchQuery: '',
    activeNavTab: 'Home',
  },
};

// ============================================
// Reducer
// ============================================

function designReducer(state: DesignState, action: DesignContextAction): DesignState {
  switch (action.type) {
    // Wizard actions
    case 'WIZARD_OPEN':
      return {
        ...state,
        wizard: {
          ...initialState.wizard,
          isOpen: true,
          customObjects: state.wizard.customObjects, // Preserve custom objects
        },
      };

    case 'WIZARD_CLOSE':
      return {
        ...state,
        wizard: {
          ...state.wizard,
          isOpen: false,
        },
      };

    case 'WIZARD_SET_STEP':
      return {
        ...state,
        wizard: {
          ...state.wizard,
          currentStep: action.step,
        },
      };

    case 'WIZARD_SELECT_PAGE_TYPE':
      return {
        ...state,
        wizard: {
          ...state.wizard,
          selectedPageType: action.pageType,
          currentStep: 2,
        },
      };

    case 'WIZARD_SELECT_OBJECT':
      return {
        ...state,
        wizard: {
          ...state.wizard,
          selectedObject: action.object,
          currentStep: 3,
        },
      };

    case 'WIZARD_SELECT_LAYOUT':
      return {
        ...state,
        wizard: {
          ...state.wizard,
          selectedLayout: action.layout,
        },
      };

    case 'WIZARD_ADD_CUSTOM_OBJECT':
      return {
        ...state,
        wizard: {
          ...state.wizard,
          customObjects: [...state.wizard.customObjects, action.customObject],
        },
      };

    case 'WIZARD_COMPLETE': {
      const { selectedPageType, selectedObject, selectedLayout } = state.wizard;

      if (!selectedPageType || !selectedObject || !selectedLayout) {
        console.error('Cannot complete wizard: missing required selections');
        return state;
      }

      // Create new PageDesign
      const newDesign: PageDesign = {
        id: `design-${Date.now()}`,
        name: `${selectedObject.name} Page`,
        pageType: selectedPageType,
        objectName: selectedObject.apiName,
        layout: selectedLayout,
        regions: selectedLayout.regions.reduce((acc: Record<string, CanvasElement[]>, region: RegionDefinition) => {
          acc[region.id] = [];
          return acc;
        }, {}),
        metadata: {
          createdAt: Date.now(),
          updatedAt: Date.now(),
          version: 1,
        },
      };

      return {
        ...state,
        design: newDesign,
        wizard: {
          ...state.wizard,
          isOpen: false,
        },
      };
    }

    // Design actions
    case 'NEW_DESIGN':
      return {
        ...state,
        wizard: {
          ...initialState.wizard,
          isOpen: true,
          customObjects: state.wizard.customObjects,
        },
      };

    case 'LOAD_DESIGN':
      return {
        ...state,
        design: action.design,
      };

    case 'ADD_ELEMENT': {
      if (!state.design) return state;

      const { regionId, element, index } = action;
      const regionElements = [...(state.design.regions[regionId] || [])];

      if (index !== undefined) {
        regionElements.splice(index, 0, element);
      } else {
        regionElements.push(element);
      }

      // Update order property
      regionElements.forEach((el, idx) => {
        el.order = idx;
      });

      return {
        ...state,
        design: {
          ...state.design,
          regions: {
            ...state.design.regions,
            [regionId]: regionElements,
          },
          metadata: {
            ...state.design.metadata,
            updatedAt: Date.now(),
          },
        },
      };
    }

    case 'REMOVE_ELEMENT': {
      if (!state.design) return state;

      const newRegions = { ...state.design.regions };

      // Find and remove element
      for (const regionId in newRegions) {
        newRegions[regionId] = newRegions[regionId].filter(
          el => el.id !== action.elementId
        );
        // Update order
        newRegions[regionId].forEach((el, idx) => {
          el.order = idx;
        });
      }

      return {
        ...state,
        design: {
          ...state.design,
          regions: newRegions,
          metadata: {
            ...state.design.metadata,
            updatedAt: Date.now(),
          },
        },
        selection: {
          ...state.selection,
          selectedElementId: null,
        },
      };
    }

    case 'UPDATE_ELEMENT': {
      if (!state.design) return state;

      const newRegions = { ...state.design.regions };

      for (const regionId in newRegions) {
        newRegions[regionId] = newRegions[regionId].map(el =>
          el.id === action.elementId
            ? { ...el, properties: { ...el.properties, ...action.properties } }
            : el
        );
      }

      return {
        ...state,
        design: {
          ...state.design,
          regions: newRegions,
          metadata: {
            ...state.design.metadata,
            updatedAt: Date.now(),
          },
        },
      };
    }

    case 'MOVE_ELEMENT': {
      if (!state.design) return state;

      const { elementId, toRegionId, toIndex } = action;
      const newRegions = { ...state.design.regions };

      // Find and remove element from source
      let movedElement: CanvasElement | null = null;
      for (const regionId in newRegions) {
        const index = newRegions[regionId].findIndex(el => el.id === elementId);
        if (index !== -1) {
          [movedElement] = newRegions[regionId].splice(index, 1);
          break;
        }
      }

      if (!movedElement) return state;

      // Insert into destination
      const destElements = [...(newRegions[toRegionId] || [])];
      destElements.splice(toIndex, 0, movedElement);
      newRegions[toRegionId] = destElements;

      // Update order for both regions
      for (const regionId in newRegions) {
        newRegions[regionId].forEach((el, idx) => {
          el.order = idx;
        });
      }

      return {
        ...state,
        design: {
          ...state.design,
          regions: newRegions,
          metadata: {
            ...state.design.metadata,
            updatedAt: Date.now(),
          },
        },
      };
    }

    case 'RENAME_DESIGN':
      if (!state.design) return state;
      return {
        ...state,
        design: {
          ...state.design,
          name: action.name,
          metadata: {
            ...state.design.metadata,
            updatedAt: Date.now(),
          },
        },
      };

    // Selection actions
    case 'SELECT_ELEMENT':
      return {
        ...state,
        selection: {
          ...state.selection,
          selectedElementId: action.elementId,
        },
      };

    case 'SET_DRAG_OVER':
      return {
        ...state,
        selection: {
          ...state.selection,
          dragOverRegionId: action.regionId,
          dropIndex: action.index,
        },
      };

    // Drag actions
    case 'DRAG_START':
      return {
        ...state,
        drag: {
          isDragging: true,
          draggedComponent: action.component,
        },
      };

    case 'DRAG_END':
      return {
        ...state,
        drag: {
          isDragging: false,
          draggedComponent: null,
        },
        selection: {
          ...state.selection,
          dragOverRegionId: null,
          dropIndex: null,
        },
      };

    // UI actions
    case 'SET_PALETTE_TAB':
      return {
        ...state,
        ui: {
          ...state.ui,
          paletteTab: action.tab,
        },
      };

    case 'SET_SEARCH_QUERY':
      return {
        ...state,
        ui: {
          ...state.ui,
          searchQuery: action.query,
        },
      };

    case 'SET_ACTIVE_NAV_TAB':
      return {
        ...state,
        ui: {
          ...state.ui,
          activeNavTab: action.tab,
        },
      };

    default:
      return state;
  }
}

// ============================================
// Context
// ============================================

interface DesignContextValue {
  state: DesignState;
  dispatch: React.Dispatch<DesignContextAction>;
}

export const DesignContext = createContext<DesignContextValue | undefined>(undefined);

// ============================================
// Provider
// ============================================

interface DesignProviderProps {
  children: ReactNode;
}

export function DesignProvider({ children }: DesignProviderProps) {
  const [state, dispatch] = useReducer(designReducer, initialState);

  // First-visit detection
  useEffect(() => {
    const hasVisited = localStorage.getItem('masquerade:hasVisited');

    if (!hasVisited) {
      // First time user - open wizard
      dispatch({ type: 'WIZARD_OPEN' });
      localStorage.setItem('masquerade:hasVisited', 'true');
    }
  }, []);

  const value: DesignContextValue = {
    state,
    dispatch,
  };

  return (
    <DesignContext.Provider value={value}>
      {children}
    </DesignContext.Provider>
  );
}

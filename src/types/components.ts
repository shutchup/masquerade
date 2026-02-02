// Component types for the canvas
export type ComponentType =
    | 'slds-button'
    | 'slds-input'
    | 'slds-card'
    | 'slds-badge'
    | 'slds-page-header'
    | 'slds-data-table'
    | 'slds-modal';

export type ComponentCategory =
    | 'buttons'
    | 'inputs'
    | 'containers'
    | 'data'
    | 'navigation'
    | 'feedback'
    | 'layouts';

// Canvas element interface
export interface CanvasElement {
    id: string;
    type: ComponentType;
    x: number;
    y: number;
    width: number;
    height: number;
    props: Record<string, unknown>;
    isSelected?: boolean;
}

// Button variants
export type ButtonVariant =
    | 'base'
    | 'neutral'
    | 'brand'
    | 'brand-outline'
    | 'destructive'
    | 'destructive-text'
    | 'success'
    | 'inverse';

// Button props
export interface SLDSButtonProps {
    label: string;
    variant: ButtonVariant;
    disabled: boolean;
    iconLeft?: string;
    iconRight?: string;
}

// Input props
export interface SLDSInputProps {
    label: string;
    placeholder: string;
    value: string;
    required: boolean;
    error: boolean;
    errorMessage: string;
    helpText: string;
}

// Card props
export interface SLDSCardProps {
    title: string;
    hasHeader: boolean;
    hasFooter: boolean;
    hasIcon: boolean;
    iconName: string;
}

// Badge props
export interface SLDSBadgeProps {
    label: string;
    variant: 'default' | 'inverse' | 'lightest' | 'success' | 'warning' | 'error';
}

// Page Header props
export interface SLDSPageHeaderProps {
    title: string;
    subtitle: string;
    objectName: string;
    iconName: string;
}

// Component registration for sidebar
export interface ComponentRegistration {
    type: ComponentType;
    name: string;
    category: ComponentCategory;
    icon: string;
    defaultWidth: number;
    defaultHeight: number;
    defaultProps: Record<string, unknown>;
}

// Component registry
export const componentRegistry: ComponentRegistration[] = [
    // Buttons
    {
        type: 'slds-button',
        name: 'Button',
        category: 'buttons',
        icon: 'utility:button_choice',
        defaultWidth: 100,
        defaultHeight: 32,
        defaultProps: {
            label: 'Button',
            variant: 'brand',
            disabled: false,
        } as SLDSButtonProps,
    },
    // Inputs
    {
        type: 'slds-input',
        name: 'Text Input',
        category: 'inputs',
        icon: 'utility:text',
        defaultWidth: 300,
        defaultHeight: 68,
        defaultProps: {
            label: 'Label',
            placeholder: 'Placeholder text',
            value: '',
            required: false,
            error: false,
            errorMessage: '',
            helpText: '',
        } as SLDSInputProps,
    },
    // Containers
    {
        type: 'slds-card',
        name: 'Card',
        category: 'containers',
        icon: 'utility:layout',
        defaultWidth: 400,
        defaultHeight: 200,
        defaultProps: {
            title: 'Card Title',
            hasHeader: true,
            hasFooter: false,
            hasIcon: true,
            iconName: 'standard:account',
        } as SLDSCardProps,
    },
    // Feedback
    {
        type: 'slds-badge',
        name: 'Badge',
        category: 'feedback',
        icon: 'utility:bookmark',
        defaultWidth: 80,
        defaultHeight: 24,
        defaultProps: {
            label: 'Badge',
            variant: 'default',
        } as SLDSBadgeProps,
    },
    // Navigation
    {
        type: 'slds-page-header',
        name: 'Page Header',
        category: 'navigation',
        icon: 'utility:header',
        defaultWidth: 600,
        defaultHeight: 80,
        defaultProps: {
            title: 'Record Title',
            subtitle: 'Record subtitle or metadata',
            objectName: 'Account',
            iconName: 'standard:account',
        } as SLDSPageHeaderProps,
    },
];

// Get components by category
export function getComponentsByCategory(category: ComponentCategory): ComponentRegistration[] {
    return componentRegistry.filter(c => c.category === category);
}

// Get all categories
export function getAllCategories(): ComponentCategory[] {
    const categories = new Set(componentRegistry.map(c => c.category));
    return Array.from(categories);
}

// Get component by type
export function getComponentByType(type: ComponentType): ComponentRegistration | undefined {
    return componentRegistry.find(c => c.type === type);
}

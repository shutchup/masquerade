import { TLBaseShape, ShapeUtil, RecordProps, T } from 'tldraw';

/**
 * Base props shared by all SLDS shapes
 */
export interface SLDSBaseProps {
    w: number;
    h: number;
    label: string;
}

/**
 * Base shape interface for all SLDS components
 */
export type SLDSShape<Props extends SLDSBaseProps = SLDSBaseProps> = TLBaseShape<string, Props>;

/**
 * Component category types for sidebar organization
 */
export type ComponentCategory =
    | 'buttons'
    | 'inputs'
    | 'data'
    | 'containers'
    | 'navigation'
    | 'feedback'
    | 'layouts';

/**
 * Shape registration metadata for the component sidebar
 */
export interface ShapeRegistration {
    type: string;
    name: string;
    category: ComponentCategory;
    icon: string;
    util: typeof ShapeUtil;
    defaultProps: Record<string, unknown>;
}

/**
 * Shape registry for managing all SLDS shapes
 */
class ShapeRegistry {
    private shapes: Map<string, ShapeRegistration> = new Map();
    private categories: Map<ComponentCategory, ShapeRegistration[]> = new Map();

    register(registration: ShapeRegistration): void {
        this.shapes.set(registration.type, registration);

        const categoryList = this.categories.get(registration.category) || [];
        categoryList.push(registration);
        this.categories.set(registration.category, categoryList);
    }

    getShape(type: string): ShapeRegistration | undefined {
        return this.shapes.get(type);
    }

    getByCategory(category: ComponentCategory): ShapeRegistration[] {
        return this.categories.get(category) || [];
    }

    getAllCategories(): ComponentCategory[] {
        return Array.from(this.categories.keys());
    }

    getAll(): ShapeRegistration[] {
        return Array.from(this.shapes.values());
    }

    getUtils(): typeof ShapeUtil[] {
        return this.getAll().map((reg) => reg.util);
    }
}

// Singleton instance
export const shapeRegistry = new ShapeRegistry();

/**
 * Common SLDS prop types for shape definitions
 */
export const sldsProps = {
    w: T.positiveNumber,
    h: T.positiveNumber,
    label: T.string,
    variant: T.string,
    size: T.string,
    disabled: T.boolean,
    iconName: T.string,
} satisfies Record<string, RecordProps<TLBaseShape<string, object>>['props'][string]>;

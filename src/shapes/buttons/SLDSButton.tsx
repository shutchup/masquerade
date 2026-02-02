import {
    ShapeUtil,
    TLBaseShape,
    HTMLContainer,
    Rectangle2d,
    TLOnResizeHandler,
    resizeBox,
    T,
} from 'tldraw';
import { ComponentCategory, shapeRegistry } from '../base/registry';

/**
 * Button variants following SLDS
 */
export type ButtonVariant =
    | 'brand'
    | 'neutral'
    | 'destructive'
    | 'outline-brand'
    | 'text-destructive'
    | 'success';

export type ButtonSize = 'small' | 'medium' | 'large';

export interface SLDSButtonProps {
    w: number;
    h: number;
    label: string;
    variant: ButtonVariant;
    size: ButtonSize;
    disabled: boolean;
    iconName: string;
}

export type SLDSButtonShape = TLBaseShape<'slds-button', SLDSButtonProps>;

/**
 * SLDS Button shape utility
 */
export class SLDSButtonUtil extends ShapeUtil<SLDSButtonShape> {
    static override type = 'slds-button' as const;

    static override props = {
        w: T.positiveNumber,
        h: T.positiveNumber,
        label: T.string,
        variant: T.string,
        size: T.string,
        disabled: T.boolean,
        iconName: T.string,
    };

    getDefaultProps(): SLDSButtonShape['props'] {
        return {
            w: 120,
            h: 32,
            label: 'Button',
            variant: 'brand',
            size: 'medium',
            disabled: false,
            iconName: '',
        };
    }

    getGeometry(shape: SLDSButtonShape) {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: true,
        });
    }

    override canResize() {
        return true;
    }

    override onResize: TLOnResizeHandler<SLDSButtonShape> = (shape, info) => {
        return resizeBox(shape, info);
    };

    component(shape: SLDSButtonShape) {
        const { w, h, label, variant, size, disabled } = shape.props;

        const getVariantStyles = (): React.CSSProperties => {
            const baseStyles: React.CSSProperties = {
                width: w,
                height: h,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                borderRadius: '4px',
                fontSize: size === 'small' ? '12px' : size === 'large' ? '14px' : '13px',
                fontWeight: 400,
                fontFamily: 'Salesforce Sans, -apple-system, BlinkMacSystemFont, sans-serif',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                border: 'none',
                transition: 'all 0.1s ease-in-out',
                boxSizing: 'border-box',
                padding: '0 16px',
            };

            switch (variant) {
                case 'brand':
                    return {
                        ...baseStyles,
                        background: 'linear-gradient(to bottom, #0176d3 0%, #014486 100%)',
                        color: '#ffffff',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                    };
                case 'neutral':
                    return {
                        ...baseStyles,
                        background: '#ffffff',
                        color: '#181818',
                        border: '1px solid #c9c9c9',
                    };
                case 'destructive':
                    return {
                        ...baseStyles,
                        background: 'linear-gradient(to bottom, #ba0517 0%, #8e030f 100%)',
                        color: '#ffffff',
                    };
                case 'outline-brand':
                    return {
                        ...baseStyles,
                        background: 'transparent',
                        color: '#0176d3',
                        border: '1px solid #0176d3',
                    };
                case 'text-destructive':
                    return {
                        ...baseStyles,
                        background: 'transparent',
                        color: '#ba0517',
                        border: 'none',
                    };
                case 'success':
                    return {
                        ...baseStyles,
                        background: 'linear-gradient(to bottom, #2e844a 0%, #22683a 100%)',
                        color: '#ffffff',
                    };
                default:
                    return baseStyles;
            }
        };

        return (
            <HTMLContainer>
                <div style={getVariantStyles()}>
                    {label}
                </div>
            </HTMLContainer>
        );
    }

    indicator(shape: SLDSButtonShape) {
        return (
            <rect
                width={shape.props.w}
                height={shape.props.h}
                rx={4}
                ry={4}
            />
        );
    }
}

// Register the shape
shapeRegistry.register({
    type: 'slds-button',
    name: 'Button',
    category: 'buttons' as ComponentCategory,
    icon: '🔘',
    util: SLDSButtonUtil,
    defaultProps: new SLDSButtonUtil(null as any).getDefaultProps(),
});

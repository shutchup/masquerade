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

export interface SLDSCardProps {
    w: number;
    h: number;
    title: string;
    showHeader: boolean;
    showFooter: boolean;
    bodyText: string;
}

export type SLDSCardShape = TLBaseShape<'slds-card', SLDSCardProps>;

/**
 * SLDS Card shape utility
 */
export class SLDSCardUtil extends ShapeUtil<SLDSCardShape> {
    static override type = 'slds-card' as const;

    static override props = {
        w: T.positiveNumber,
        h: T.positiveNumber,
        title: T.string,
        showHeader: T.boolean,
        showFooter: T.boolean,
        bodyText: T.string,
    };

    getDefaultProps(): SLDSCardShape['props'] {
        return {
            w: 320,
            h: 200,
            title: 'Card Title',
            showHeader: true,
            showFooter: false,
            bodyText: 'Card content goes here. Add components inside this card.',
        };
    }

    getGeometry(shape: SLDSCardShape) {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: true,
        });
    }

    override canResize() {
        return true;
    }

    override onResize: TLOnResizeHandler<SLDSCardShape> = (shape, info) => {
        return resizeBox(shape, info);
    };

    component(shape: SLDSCardShape) {
        const { w, h, title, showHeader, showFooter, bodyText } = shape.props;

        const containerStyles: React.CSSProperties = {
            width: w,
            height: h,
            background: '#ffffff',
            borderRadius: '8px',
            boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Salesforce Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            overflow: 'hidden',
        };

        const headerStyles: React.CSSProperties = {
            padding: '12px 16px',
            borderBottom: '1px solid #e5e5e5',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
        };

        const titleStyles: React.CSSProperties = {
            fontSize: '16px',
            fontWeight: 700,
            color: '#181818',
            margin: 0,
        };

        const bodyStyles: React.CSSProperties = {
            flex: 1,
            padding: '16px',
            fontSize: '13px',
            color: '#181818',
            overflow: 'auto',
        };

        const footerStyles: React.CSSProperties = {
            padding: '12px 16px',
            borderTop: '1px solid #e5e5e5',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
        };

        return (
            <HTMLContainer>
                <div style={containerStyles}>
                    {showHeader && (
                        <div style={headerStyles}>
                            <h3 style={titleStyles}>{title}</h3>
                            <span style={{ color: '#747474', cursor: 'pointer' }}>⋮</span>
                        </div>
                    )}
                    <div style={bodyStyles}>
                        {bodyText}
                    </div>
                    {showFooter && (
                        <div style={footerStyles}>
                            <button style={{
                                padding: '6px 16px',
                                background: '#ffffff',
                                border: '1px solid #c9c9c9',
                                borderRadius: '4px',
                                fontSize: '13px',
                                cursor: 'pointer',
                            }}>Cancel</button>
                            <button style={{
                                padding: '6px 16px',
                                background: 'linear-gradient(to bottom, #0176d3 0%, #014486 100%)',
                                border: 'none',
                                borderRadius: '4px',
                                fontSize: '13px',
                                color: '#ffffff',
                                cursor: 'pointer',
                            }}>Save</button>
                        </div>
                    )}
                </div>
            </HTMLContainer>
        );
    }

    indicator(shape: SLDSCardShape) {
        return (
            <rect
                width={shape.props.w}
                height={shape.props.h}
                rx={8}
                ry={8}
            />
        );
    }
}

// Register the shape
shapeRegistry.register({
    type: 'slds-card',
    name: 'Card',
    category: 'containers' as ComponentCategory,
    icon: '📋',
    util: SLDSCardUtil,
    defaultProps: new SLDSCardUtil(null as any).getDefaultProps(),
});

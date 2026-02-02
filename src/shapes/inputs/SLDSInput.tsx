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

export interface SLDSInputProps {
    w: number;
    h: number;
    label: string;
    placeholder: string;
    value: string;
    type: 'text' | 'email' | 'password' | 'search' | 'number';
    disabled: boolean;
    required: boolean;
    error: boolean;
    errorMessage: string;
}

export type SLDSInputShape = TLBaseShape<'slds-input', SLDSInputProps>;

/**
 * SLDS Input field shape utility
 */
export class SLDSInputUtil extends ShapeUtil<SLDSInputShape> {
    static override type = 'slds-input' as const;

    static override props = {
        w: T.positiveNumber,
        h: T.positiveNumber,
        label: T.string,
        placeholder: T.string,
        value: T.string,
        type: T.string,
        disabled: T.boolean,
        required: T.boolean,
        error: T.boolean,
        errorMessage: T.string,
    };

    getDefaultProps(): SLDSInputShape['props'] {
        return {
            w: 280,
            h: 62,
            label: 'Label',
            placeholder: 'Enter text...',
            value: '',
            type: 'text',
            disabled: false,
            required: false,
            error: false,
            errorMessage: '',
        };
    }

    getGeometry(shape: SLDSInputShape) {
        return new Rectangle2d({
            width: shape.props.w,
            height: shape.props.h,
            isFilled: true,
        });
    }

    override canResize() {
        return true;
    }

    override onResize: TLOnResizeHandler<SLDSInputShape> = (shape, info) => {
        return resizeBox(shape, info);
    };

    component(shape: SLDSInputShape) {
        const { w, h, label, placeholder, value, disabled, required, error, errorMessage } = shape.props;

        const containerStyles: React.CSSProperties = {
            width: w,
            height: h,
            display: 'flex',
            flexDirection: 'column',
            fontFamily: 'Salesforce Sans, -apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '13px',
        };

        const labelStyles: React.CSSProperties = {
            color: '#181818',
            fontWeight: 400,
            marginBottom: '4px',
            display: 'flex',
            gap: '4px',
        };

        const inputStyles: React.CSSProperties = {
            flex: 1,
            minHeight: '32px',
            padding: '0 12px',
            border: error ? '1px solid #ba0517' : '1px solid #c9c9c9',
            borderRadius: '4px',
            fontSize: '13px',
            fontFamily: 'inherit',
            color: disabled ? '#747474' : '#181818',
            background: disabled ? '#f3f3f3' : '#ffffff',
            boxShadow: error ? '0 0 0 1px #ba0517 inset' : 'none',
            outline: 'none',
        };

        const errorStyles: React.CSSProperties = {
            color: '#ba0517',
            fontSize: '12px',
            marginTop: '4px',
        };

        return (
            <HTMLContainer>
                <div style={containerStyles}>
                    <label style={labelStyles}>
                        {label}
                        {required && <span style={{ color: '#ba0517' }}>*</span>}
                    </label>
                    <div
                        style={inputStyles}
                    >
                        <span style={{ color: '#747474', lineHeight: '32px' }}>{value || placeholder}</span>
                    </div>
                    {error && errorMessage && (
                        <span style={errorStyles}>{errorMessage}</span>
                    )}
                </div>
            </HTMLContainer>
        );
    }

    indicator(shape: SLDSInputShape) {
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
    type: 'slds-input',
    name: 'Text Input',
    category: 'inputs' as ComponentCategory,
    icon: '📝',
    util: SLDSInputUtil,
    defaultProps: new SLDSInputUtil(null as any).getDefaultProps(),
});

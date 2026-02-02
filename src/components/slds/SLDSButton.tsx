import { SLDSButtonProps, ButtonVariant } from '../types/components';

interface Props extends SLDSButtonProps {
    width: number;
    height: number;
}

export function SLDSButton({ label, variant, disabled, width, height }: Props) {
    const getButtonClass = (v: ButtonVariant): string => {
        const baseClass = 'slds-button';
        const variantMap: Record<ButtonVariant, string> = {
            'base': '',
            'neutral': 'slds-button_neutral',
            'brand': 'slds-button_brand',
            'brand-outline': 'slds-button_outline-brand',
            'destructive': 'slds-button_destructive',
            'destructive-text': 'slds-button_text-destructive',
            'success': 'slds-button_success',
            'inverse': 'slds-button_inverse',
        };
        return `${baseClass} ${variantMap[v] || ''}`.trim();
    };

    return (
        <button
            className={getButtonClass(variant)}
            disabled={disabled}
            style={{
                width: width,
                height: height,
                cursor: 'default',
                pointerEvents: 'none',
            }}
        >
            {label}
        </button>
    );
}

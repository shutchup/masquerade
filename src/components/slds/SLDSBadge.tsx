import { SLDSBadgeProps } from '../types/components';

interface Props extends SLDSBadgeProps {
    width: number;
    height: number;
}

export function SLDSBadge({ label, variant }: Props) {
    const getVariantClass = (): string => {
        const variantMap: Record<string, string> = {
            'default': '',
            'inverse': 'slds-badge_inverse',
            'lightest': 'slds-badge_lightest',
            'success': 'slds-theme_success',
            'warning': 'slds-theme_warning',
            'error': 'slds-theme_error',
        };
        return variantMap[variant] || '';
    };

    return (
        <span className={`slds-badge ${getVariantClass()}`.trim()}>
            {label}
        </span>
    );
}

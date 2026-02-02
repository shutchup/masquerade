interface Props {
    iconName: string;  // format: "category:iconname" e.g., "utility:settings", "standard:account"
    size?: 'xx-small' | 'x-small' | 'small' | 'medium' | 'large';
    variant?: 'default' | 'warning' | 'error' | 'light' | 'inverse';
}

export function SLDSIcon({ iconName, size = 'small', variant = 'default' }: Props) {
    // Parse icon name: "category:iconname" -> { category: "utility", name: "settings" }
    const [category, name] = iconName.split(':');

    if (!category || !name) {
        return null;
    }

    // Build the sprite path
    const spritePath = `/slds/icons/${category}-sprite/svg/symbols.svg#${name}`;

    // Determine container and icon classes based on category
    const isStandardOrCustom = category === 'standard' || category === 'custom';

    const containerClass = isStandardOrCustom
        ? `slds-icon_container slds-icon-${category}-${name}`
        : `slds-icon_container slds-icon-${category}-${name}`;

    const iconSizeClass = `slds-icon_${size}`;
    const iconVariantClass = variant !== 'default' ? `slds-icon-text-${variant}` : '';

    return (
        <span className={containerClass} title={name}>
            <svg
                className={`slds-icon ${iconSizeClass} ${iconVariantClass}`.trim()}
                aria-hidden="true"
            >
                <use xlinkHref={spritePath}></use>
            </svg>
            <span className="slds-assistive-text">{name}</span>
        </span>
    );
}

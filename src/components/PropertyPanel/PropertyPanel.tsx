import { Editor } from 'tldraw';
import { shapeRegistry } from '../../shapes';

interface PropertyPanelProps {
    editor: Editor | null;
}

export function PropertyPanel({ editor }: PropertyPanelProps) {
    const selectedShapes = editor?.getSelectedShapes() ?? [];
    const selectedShape = selectedShapes.length === 1 ? selectedShapes[0] : null;

    if (!selectedShape) {
        return (
            <div className="property-panel">
                <div className="property-panel-header">
                    <h2>Properties</h2>
                </div>
                <div className="property-panel-content">
                    <div className="empty-state">
                        <div className="empty-state-icon">🎯</div>
                        <div className="empty-state-text">
                            Select a shape to view its properties
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const registration = shapeRegistry.getShape(selectedShape.type);
    const props = selectedShape.props as Record<string, unknown>;

    const handlePropChange = (key: string, value: unknown) => {
        if (!editor) return;
        editor.updateShape({
            id: selectedShape.id,
            type: selectedShape.type,
            props: { [key]: value },
        });
    };

    const renderPropertyInput = (key: string, value: unknown) => {
        if (typeof value === 'boolean') {
            return (
                <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => handlePropChange(key, e.target.checked)}
                    style={{ width: '18px', height: '18px' }}
                />
            );
        }

        if (typeof value === 'number') {
            return (
                <input
                    type="number"
                    className="property-input"
                    value={value}
                    onChange={(e) => handlePropChange(key, Number(e.target.value))}
                />
            );
        }

        if (key === 'variant') {
            const variants = selectedShape.type === 'slds-button'
                ? ['brand', 'neutral', 'destructive', 'outline-brand', 'text-destructive', 'success']
                : ['default'];

            return (
                <select
                    className="property-select"
                    value={value as string}
                    onChange={(e) => handlePropChange(key, e.target.value)}
                >
                    {variants.map((v) => (
                        <option key={v} value={v}>{v}</option>
                    ))}
                </select>
            );
        }

        if (key === 'size') {
            return (
                <select
                    className="property-select"
                    value={value as string}
                    onChange={(e) => handlePropChange(key, e.target.value)}
                >
                    <option value="small">Small</option>
                    <option value="medium">Medium</option>
                    <option value="large">Large</option>
                </select>
            );
        }

        return (
            <input
                type="text"
                className="property-input"
                value={value as string}
                onChange={(e) => handlePropChange(key, e.target.value)}
            />
        );
    };

    // Group properties by type
    const sizeProps = ['w', 'h'];
    const otherProps = Object.keys(props).filter((k) => !sizeProps.includes(k));

    return (
        <div className="property-panel">
            <div className="property-panel-header">
                <h2>{registration?.name || selectedShape.type}</h2>
            </div>
            <div className="property-panel-content">
                {/* Size Properties */}
                <div className="property-group">
                    <div className="property-group-label">Size</div>
                    {sizeProps.map((key) => (
                        <div key={key} className="property-row">
                            <label className="property-label">{key.toUpperCase()}</label>
                            {renderPropertyInput(key, props[key])}
                        </div>
                    ))}
                </div>

                {/* Other Properties */}
                <div className="property-group">
                    <div className="property-group-label">Properties</div>
                    {otherProps.map((key) => (
                        <div key={key} className="property-row">
                            <label className="property-label">{key}</label>
                            {renderPropertyInput(key, props[key])}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

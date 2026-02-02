import { useState } from 'react';
import { shapeRegistry, ComponentCategory } from '../../shapes';
import { Editor, createShapeId } from 'tldraw';

interface SidebarProps {
    editor: Editor | null;
}

const categoryLabels: Record<ComponentCategory, string> = {
    buttons: 'Buttons',
    inputs: 'Form Inputs',
    data: 'Data Display',
    containers: 'Containers',
    navigation: 'Navigation',
    feedback: 'Feedback',
    layouts: 'Page Layouts',
};

const categoryIcons: Record<ComponentCategory, string> = {
    buttons: '🔘',
    inputs: '📝',
    data: '📊',
    containers: '📦',
    navigation: '🧭',
    feedback: '💬',
    layouts: '📐',
};

export function Sidebar({ editor }: SidebarProps) {
    const [expandedCategories, setExpandedCategories] = useState<Set<ComponentCategory>>(
        new Set(['buttons', 'inputs', 'containers'])
    );

    const toggleCategory = (category: ComponentCategory) => {
        setExpandedCategories((prev) => {
            const next = new Set(prev);
            if (next.has(category)) {
                next.delete(category);
            } else {
                next.add(category);
            }
            return next;
        });
    };

    const handleDragStart = (e: React.DragEvent, type: string) => {
        e.dataTransfer.setData('shape-type', type);
        e.dataTransfer.effectAllowed = 'copy';
    };

    const handleAddShape = (type: string) => {
        if (!editor) return;

        const registration = shapeRegistry.getShape(type);
        if (!registration) return;

        const viewport = editor.getViewportScreenBounds();
        const center = editor.screenToPage({
            x: viewport.x + viewport.w / 2,
            y: viewport.y + viewport.h / 2,
        });

        const shapeId = createShapeId();
        editor.createShape({
            id: shapeId,
            type,
            x: center.x - (registration.defaultProps.w as number) / 2,
            y: center.y - (registration.defaultProps.h as number) / 2,
            props: registration.defaultProps,
        });

        editor.select(shapeId);
    };

    const categories = shapeRegistry.getAllCategories();

    return (
        <div className="sidebar">
            <div className="sidebar-header">
                <span style={{ fontSize: '24px' }}>⚡</span>
                <h1>Masquerade</h1>
            </div>

            <div className="sidebar-content">
                {categories.map((category) => {
                    const shapes = shapeRegistry.getByCategory(category);
                    if (shapes.length === 0) return null;

                    const isExpanded = expandedCategories.has(category);

                    return (
                        <div key={category} className="component-category">
                            <div
                                className="category-header"
                                onClick={() => toggleCategory(category)}
                            >
                                <span style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}>
                                    ▶
                                </span>
                                <span>{categoryIcons[category]}</span>
                                <span>{categoryLabels[category]}</span>
                            </div>

                            {isExpanded && (
                                <div className="category-items">
                                    {shapes.map((shape) => (
                                        <div
                                            key={shape.type}
                                            className="component-item"
                                            draggable
                                            onDragStart={(e) => handleDragStart(e, shape.type)}
                                            onClick={() => handleAddShape(shape.type)}
                                        >
                                            <span>{shape.icon}</span>
                                            <span>{shape.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div style={{
                padding: '12px 16px',
                borderTop: '1px solid var(--slds-c-border)',
                fontSize: '11px',
                color: 'var(--slds-c-text-weak)',
                textAlign: 'center'
            }}>
                SLDS 2.x Compatible
            </div>
        </div>
    );
}

import { LayoutDefinition, RegionDefinition } from '../../../types/design';

interface LayoutCardProps {
  layout: LayoutDefinition;
  isSelected: boolean;
  onSelect: (layout: LayoutDefinition) => void;
}

// Component to render a visual thumbnail of the layout
function LayoutThumbnail({ regions }: { regions: RegionDefinition[] }) {
  // Determine grid template based on regions
  const getGridStyle = (): React.CSSProperties => {
    const hasHeader = regions.some(r => r.type === 'header');

    if (regions.length === 1) {
      return {
        gridTemplateRows: '1fr',
        gridTemplateColumns: '1fr',
      };
    }

    if (hasHeader) {
      return {
        gridTemplateRows: '40px 1fr',
        gridTemplateColumns: 'repeat(12, 1fr)',
      };
    }

    return {
      gridTemplateRows: '1fr',
      gridTemplateColumns: 'repeat(12, 1fr)',
    };
  };

  const getRegionStyle = (region: RegionDefinition): React.CSSProperties => {
    return {
      gridColumn: region.gridColumn,
      gridRow: region.gridRow,
    };
  };

  const getRegionClassName = (region: RegionDefinition): string => {
    return `layout-thumbnail__region layout-thumbnail__region--${region.type}`;
  };

  return (
    <div className="layout-thumbnail" style={getGridStyle()}>
      {regions.map((region) => (
        <div
          key={region.id}
          className={getRegionClassName(region)}
          style={getRegionStyle(region)}
        />
      ))}
    </div>
  );
}

export function LayoutCard({ layout, isSelected, onSelect }: LayoutCardProps) {
  return (
    <div
      className={`layout-card ${isSelected ? 'layout-card--selected' : ''}`}
      onClick={() => onSelect(layout)}
    >
      <div className="layout-card__thumbnail">
        <LayoutThumbnail regions={layout.regions} />
      </div>
      <p className="layout-card__name">{layout.name}</p>
    </div>
  );
}

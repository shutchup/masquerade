import { PageType } from '../../../types/design';

interface PageTypeCardProps {
  type: PageType;
  title: string;
  description: string;
  icon: React.ReactNode;
  enabled: boolean;
  onSelect: (type: PageType) => void;
}

export function PageTypeCard({
  type,
  title,
  description,
  icon,
  enabled,
  onSelect,
}: PageTypeCardProps) {
  const handleClick = () => {
    if (enabled) {
      onSelect(type);
    }
  };

  return (
    <div
      className={`page-type-card ${!enabled ? 'page-type-card--disabled' : ''}`}
      onClick={handleClick}
    >
      {!enabled && <span className="page-type-card__badge">Coming Soon</span>}
      <div className="page-type-card__icon">{icon}</div>
      <h3 className="page-type-card__title">{title}</h3>
      <p className="page-type-card__description">{description}</p>
    </div>
  );
}

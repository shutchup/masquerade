import { SalesforceObjectType } from '../../../context/DesignContext';

interface ObjectListItemProps {
  object: SalesforceObjectType;
  onSelect: (object: SalesforceObjectType) => void;
}

// Simple icon placeholder - in production, you'd use actual Salesforce icons
const ObjectIcon = () => (
  <svg viewBox="0 0 52 52" fill="currentColor">
    <circle cx="26" cy="26" r="22" />
  </svg>
);

export function ObjectListItem({ object, onSelect }: ObjectListItemProps) {
  return (
    <div className="object-list-item" onClick={() => onSelect(object)}>
      <div className="object-list-item__icon">
        <ObjectIcon />
      </div>
      <div className="object-list-item__label">{object.name}</div>
      {object.type === 'custom' && (
        <span className="object-list-item__badge">Custom</span>
      )}
    </div>
  );
}

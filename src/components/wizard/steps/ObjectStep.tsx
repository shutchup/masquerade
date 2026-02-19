import { useState, useMemo } from 'react';
import { useDesign } from '../../../hooks/useDesign';
import { StandardObject, SalesforceObjectType, CustomObject } from '../../../context/DesignContext';
import { ObjectListItem } from '../cards/ObjectListItem';
import { NewObjectForm } from '../NewObjectForm';

// Standard Salesforce objects
const STANDARD_OBJECTS: StandardObject[] = [
  {
    type: 'standard',
    name: 'Account',
    apiName: 'Account',
    icon: 'standard:account',
    pluralLabel: 'Accounts',
  },
  {
    type: 'standard',
    name: 'Contact',
    apiName: 'Contact',
    icon: 'standard:contact',
    pluralLabel: 'Contacts',
  },
  {
    type: 'standard',
    name: 'Lead',
    apiName: 'Lead',
    icon: 'standard:lead',
    pluralLabel: 'Leads',
  },
  {
    type: 'standard',
    name: 'Opportunity',
    apiName: 'Opportunity',
    icon: 'standard:opportunity',
    pluralLabel: 'Opportunities',
  },
  {
    type: 'standard',
    name: 'Case',
    apiName: 'Case',
    icon: 'standard:case',
    pluralLabel: 'Cases',
  },
  {
    type: 'standard',
    name: 'Task',
    apiName: 'Task',
    icon: 'standard:task',
    pluralLabel: 'Tasks',
  },
  {
    type: 'standard',
    name: 'Event',
    apiName: 'Event',
    icon: 'standard:event',
    pluralLabel: 'Events',
  },
  {
    type: 'standard',
    name: 'Campaign',
    apiName: 'Campaign',
    icon: 'standard:campaign',
    pluralLabel: 'Campaigns',
  },
];

export function ObjectStep() {
  const { state, dispatch } = useDesign();
  const { wizard } = state;
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewObjectForm, setShowNewObjectForm] = useState(false);

  // Combine standard and custom objects
  const allObjects = useMemo(() => {
    return [...STANDARD_OBJECTS, ...wizard.customObjects];
  }, [wizard.customObjects]);

  // Filter objects by search
  const filteredObjects = useMemo(() => {
    if (!searchQuery.trim()) return allObjects;

    const query = searchQuery.toLowerCase();
    return allObjects.filter(obj =>
      obj.name.toLowerCase().includes(query) ||
      obj.pluralLabel.toLowerCase().includes(query)
    );
  }, [allObjects, searchQuery]);

  const handleSelectObject = (object: SalesforceObjectType) => {
    dispatch({ type: 'WIZARD_SELECT_OBJECT', object });
  };

  const handleSaveCustomObject = (customObject: CustomObject) => {
    dispatch({ type: 'WIZARD_ADD_CUSTOM_OBJECT', customObject });
    setShowNewObjectForm(false);
  };

  return (
    <div>
      <h3 className="wizard-step-title">Which object is this page for?</h3>
      <p className="wizard-step-description">
        Select an object or create a custom one for your record page.
      </p>

      <div className="object-list-search">
        <input
          type="text"
          placeholder="Search objects..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="object-list">
        {filteredObjects.map((obj) => (
          <ObjectListItem
            key={obj.apiName}
            object={obj}
            onSelect={handleSelectObject}
          />
        ))}

        {filteredObjects.length === 0 && (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#706e6b' }}>
            No objects found matching "{searchQuery}"
          </div>
        )}
      </div>

      <button
        className="new-object-button"
        onClick={() => setShowNewObjectForm(!showNewObjectForm)}
      >
        {showNewObjectForm ? '− Hide Form' : '+ New Custom Object'}
      </button>

      {showNewObjectForm && (
        <NewObjectForm
          onSave={handleSaveCustomObject}
          onCancel={() => setShowNewObjectForm(false)}
        />
      )}
    </div>
  );
}

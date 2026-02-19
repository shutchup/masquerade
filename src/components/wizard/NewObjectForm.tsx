import { useState } from 'react';
import { CustomObject } from '../../context/DesignContext';

interface NewObjectFormProps {
  onSave: (object: CustomObject) => void;
  onCancel: () => void;
}

export function NewObjectForm({ onSave, onCancel }: NewObjectFormProps) {
  const [label, setLabel] = useState('');
  const [pluralLabel, setPluralLabel] = useState('');
  const [apiName, setApiName] = useState('');
  const [description, setDescription] = useState('');

  const isValid = label.trim() !== '' && pluralLabel.trim() !== '' && apiName.trim() !== '';

  // Auto-generate API name from label
  const handleLabelChange = (value: string) => {
    setLabel(value);
    if (!apiName) {
      // Convert to API name format: "My Object" -> "My_Object__c"
      const generated = value
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '_') + '__c';
      setApiName(generated);
    }
  };

  // Auto-generate plural label
  const handleLabelBlur = () => {
    if (!pluralLabel && label) {
      // Simple pluralization
      setPluralLabel(label.endsWith('s') ? label : label + 's');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isValid) {
      const newObject: CustomObject = {
        type: 'custom',
        name: label.trim(), // Use label as name
        label: label.trim(),
        pluralLabel: pluralLabel.trim(),
        apiName: apiName.trim(),
        description: description.trim() || undefined,
      };

      onSave(newObject);

      // Reset form
      setLabel('');
      setPluralLabel('');
      setApiName('');
      setDescription('');
    }
  };

  return (
    <form className="new-object-form" onSubmit={handleSubmit}>
      <h4 className="new-object-form__title">Create Custom Object</h4>

      <div className="form-field">
        <label>
          Label <span className="required">*</span>
        </label>
        <input
          type="text"
          value={label}
          onChange={(e) => handleLabelChange(e.target.value)}
          onBlur={handleLabelBlur}
          placeholder="e.g., Project"
          required
        />
      </div>

      <div className="form-field">
        <label>
          Plural Label <span className="required">*</span>
        </label>
        <input
          type="text"
          value={pluralLabel}
          onChange={(e) => setPluralLabel(e.target.value)}
          placeholder="e.g., Projects"
          required
        />
      </div>

      <div className="form-field">
        <label>
          API Name <span className="required">*</span>
        </label>
        <input
          type="text"
          value={apiName}
          onChange={(e) => setApiName(e.target.value)}
          placeholder="e.g., Project__c"
          required
        />
      </div>

      <div className="form-field">
        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description of this object"
        />
      </div>

      <div className="form-actions">
        <button
          type="button"
          className="wizard-button wizard-button--secondary"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="wizard-button wizard-button--primary"
          disabled={!isValid}
        >
          Create Object
        </button>
      </div>
    </form>
  );
}

import { useDesign } from '../../../hooks/useDesign';
import { LayoutDefinition } from '../../../types/design';
import { AVAILABLE_LAYOUTS } from '../../../data/layouts';
import { LayoutCard } from '../cards/LayoutCard';

export function LayoutStep() {
  const { state, dispatch } = useDesign();
  const { wizard } = state;

  const handleSelectLayout = (layout: LayoutDefinition) => {
    dispatch({ type: 'WIZARD_SELECT_LAYOUT', layout });
  };

  const handleComplete = () => {
    if (wizard.selectedLayout) {
      dispatch({ type: 'WIZARD_COMPLETE' });
    }
  };

  return (
    <div>
      <h3 className="wizard-step-title">Choose your page layout</h3>
      <p className="wizard-step-description">
        Select a layout structure for your {wizard.selectedObject?.name} page.
      </p>

      <div className="layout-grid">
        {AVAILABLE_LAYOUTS.map((layout) => (
          <LayoutCard
            key={layout.id}
            layout={layout}
            isSelected={wizard.selectedLayout?.id === layout.id}
            onSelect={handleSelectLayout}
          />
        ))}
      </div>

      <div className="wizard-footer">
        <button
          className="wizard-button wizard-button--secondary"
          onClick={() => dispatch({ type: 'WIZARD_SET_STEP', step: 2 })}
        >
          Back
        </button>
        <button
          className="wizard-button wizard-button--primary"
          onClick={handleComplete}
          disabled={!wizard.selectedLayout}
        >
          Create Page
        </button>
      </div>
    </div>
  );
}

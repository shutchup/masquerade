import { useDesign } from '../../hooks/useDesign';

export function WizardBreadcrumb() {
  const { state } = useDesign();
  const { wizard } = state;

  const getStepName = (): string => {
    switch (wizard.currentStep) {
      case 1:
        return 'Select Page Type';
      case 2:
        return wizard.selectedPageType
          ? `Select ${wizard.selectedPageType === 'record' ? 'Object' : 'Type'}`
          : 'Select Object';
      case 3:
        return 'Choose Layout';
      default:
        return '';
    }
  };

  return (
    <div className="wizard-breadcrumb">
      <span>New Page</span>
      <span className="wizard-breadcrumb-separator">›</span>
      <span className="wizard-breadcrumb-current">{getStepName()}</span>
    </div>
  );
}

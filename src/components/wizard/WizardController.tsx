import { useDesign } from '../../hooks/useDesign';
import { WizardBreadcrumb } from './WizardBreadcrumb';
import { PageTypeStep } from './steps/PageTypeStep';
import { ObjectStep } from './steps/ObjectStep';
import { LayoutStep } from './steps/LayoutStep';

export function WizardController() {
  const { state } = useDesign();
  const { wizard } = state;

  const renderStep = () => {
    switch (wizard.currentStep) {
      case 1:
        return <PageTypeStep />;
      case 2:
        return <ObjectStep />;
      case 3:
        return <LayoutStep />;
      default:
        return null;
    }
  };

  return (
    <div>
      <WizardBreadcrumb />
      <div className="wizard-step-container">
        {renderStep()}
      </div>
    </div>
  );
}

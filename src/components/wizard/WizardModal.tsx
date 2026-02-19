import { useEffect, ReactNode } from 'react';
import '../../styles/wizard.css';

interface WizardModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function WizardModal({ isOpen, onClose, children }: WizardModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    // Close if clicking the overlay itself (not the modal)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="wizard-overlay" onClick={handleOverlayClick}>
      <div className="wizard-modal">
        <div className="wizard-header">
          <h2>New Page Design</h2>
          <button
            className="wizard-close-button"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="wizard-body">
          {children}
        </div>
      </div>
    </div>
  );
}

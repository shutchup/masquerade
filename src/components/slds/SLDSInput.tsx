import { SLDSInputProps } from '../types/components';

interface Props extends SLDSInputProps {
    width: number;
    height: number;
}

export function SLDSInput({ label, placeholder, value, required, error, errorMessage, helpText, width }: Props) {
    return (
        <div
            className={`slds-form-element ${error ? 'slds-has-error' : ''}`}
            style={{ width: width }}
        >
            <label className="slds-form-element__label">
                {required && <abbr className="slds-required" title="required">*</abbr>}
                {label}
            </label>
            <div className="slds-form-element__control">
                <input
                    type="text"
                    className="slds-input"
                    placeholder={placeholder}
                    value={value}
                    readOnly
                    style={{ cursor: 'default', pointerEvents: 'none' }}
                />
            </div>
            {helpText && !error && (
                <div className="slds-form-element__help">{helpText}</div>
            )}
            {error && errorMessage && (
                <div className="slds-form-element__help" id="error-message">{errorMessage}</div>
            )}
        </div>
    );
}

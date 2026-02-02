import { SLDSCardProps } from '../types/components';
import { SLDSIcon } from './SLDSIcon';

interface Props extends SLDSCardProps {
    width: number;
    height: number;
}

export function SLDSCard({ title, hasHeader, hasFooter, hasIcon, iconName, width, height }: Props) {
    return (
        <article
            className="slds-card"
            style={{ width: width, height: height }}
        >
            {hasHeader && (
                <div className="slds-card__header slds-grid">
                    <header className="slds-media slds-media_center slds-has-flexi-truncate">
                        {hasIcon && (
                            <div className="slds-media__figure">
                                <SLDSIcon iconName={iconName} size="small" />
                            </div>
                        )}
                        <div className="slds-media__body">
                            <h2 className="slds-card__header-title">
                                <span className="slds-text-heading_small slds-truncate">{title}</span>
                            </h2>
                        </div>
                    </header>
                    <div className="slds-no-flex">
                        <button className="slds-button slds-button_neutral">New</button>
                    </div>
                </div>
            )}
            <div className="slds-card__body slds-card__body_inner">
                Card content goes here
            </div>
            {hasFooter && (
                <footer className="slds-card__footer">
                    <a className="slds-card__footer-action" href="#">
                        View All
                        <span className="slds-assistive-text">items</span>
                    </a>
                </footer>
            )}
        </article>
    );
}

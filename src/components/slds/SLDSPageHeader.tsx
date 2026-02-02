import { SLDSPageHeaderProps } from '../types/components';
import { SLDSIcon } from './SLDSIcon';

interface Props extends SLDSPageHeaderProps {
    width: number;
    height: number;
}

export function SLDSPageHeader({ title, subtitle, objectName, iconName, width }: Props) {
    return (
        <div className="slds-page-header" style={{ width: width }}>
            <div className="slds-page-header__row">
                <div className="slds-page-header__col-title">
                    <div className="slds-media">
                        <div className="slds-media__figure">
                            <SLDSIcon iconName={iconName} size="large" />
                        </div>
                        <div className="slds-media__body">
                            <div className="slds-page-header__name">
                                <div className="slds-page-header__name-title">
                                    <h1>
                                        <span className="slds-page-header__title slds-truncate" title={title}>
                                            {title}
                                        </span>
                                    </h1>
                                </div>
                            </div>
                            <p className="slds-page-header__name-meta">{subtitle}</p>
                        </div>
                    </div>
                </div>
                <div className="slds-page-header__col-actions">
                    <div className="slds-page-header__controls">
                        <div className="slds-page-header__control">
                            <button className="slds-button slds-button_neutral">Edit</button>
                        </div>
                        <div className="slds-page-header__control">
                            <button className="slds-button slds-button_brand">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

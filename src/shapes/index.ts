// Export all SLDS shapes
// Import shapes to trigger registration

import './buttons/SLDSButton';
import './inputs/SLDSInput';
import './containers/SLDSCard';

// Export registry for use in app
export { shapeRegistry } from './base/registry';
export type { ComponentCategory, ShapeRegistration } from './base/registry';

// Export individual shape utils for direct use
export { SLDSButtonUtil } from './buttons/SLDSButton';
export { SLDSInputUtil } from './inputs/SLDSInput';
export { SLDSCardUtil } from './containers/SLDSCard';

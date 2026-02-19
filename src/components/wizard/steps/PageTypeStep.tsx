import { useDesign } from '../../../hooks/useDesign';
import { PageType } from '../../../types/design';
import { PageTypeCard } from '../cards/PageTypeCard';

// Simple SVG icons for page types
const RecordIcon = () => (
  <svg viewBox="0 0 52 52" fill="currentColor">
    <path d="M48.5 26h-11c-.8 0-1.5-.7-1.5-1.5v-11c0-.8.7-1.5 1.5-1.5h11c.8 0 1.5.7 1.5 1.5v11c0 .8-.7 1.5-1.5 1.5zm-27 0h-11c-.8 0-1.5-.7-1.5-1.5v-11c0-.8.7-1.5 1.5-1.5h11c.8 0 1.5.7 1.5 1.5v11c0 .8-.7 1.5-1.5 1.5zm27 14h-11c-.8 0-1.5-.7-1.5-1.5v-11c0-.8.7-1.5 1.5-1.5h11c.8 0 1.5.7 1.5 1.5v11c0 .8-.7 1.5-1.5 1.5zm-27 0h-11c-.8 0-1.5-.7-1.5-1.5v-11c0-.8.7-1.5 1.5-1.5h11c.8 0 1.5.7 1.5 1.5v11c0 .8-.7 1.5-1.5 1.5z" />
  </svg>
);

const AppIcon = () => (
  <svg viewBox="0 0 52 52" fill="currentColor">
    <path d="M48.5 6h-45C2.7 6 2 6.7 2 7.5v7c0 .8.7 1.5 1.5 1.5h45c.8 0 1.5-.7 1.5-1.5v-7c0-.8-.7-1.5-1.5-1.5zm0 16h-45c-.8 0-1.5.7-1.5 1.5v7c0 .8.7 1.5 1.5 1.5h45c.8 0 1.5-.7 1.5-1.5v-7c0-.8-.7-1.5-1.5-1.5zm0 16h-45c-.8 0-1.5.7-1.5 1.5v7c0 .8.7 1.5 1.5 1.5h45c.8 0 1.5-.7 1.5-1.5v-7c0-.8-.7-1.5-1.5-1.5z" />
  </svg>
);

const HomeIcon = () => (
  <svg viewBox="0 0 52 52" fill="currentColor">
    <path d="M49.6 21.6L27.1 2.6c-.7-.6-1.6-.6-2.2 0L2.4 21.6c-.5.4-.6 1.2-.2 1.7l2 2.4c.4.5 1.2.6 1.7.2l1.6-1.3V47c0 .8.7 1.5 1.5 1.5h34c.8 0 1.5-.7 1.5-1.5V24.6l1.6 1.3c.5.4 1.3.3 1.7-.2l2-2.4c.4-.5.3-1.3-.2-1.7z" />
  </svg>
);

const ExperienceIcon = () => (
  <svg viewBox="0 0 52 52" fill="currentColor">
    <path d="M26 2C12.7 2 2 12.7 2 26s10.7 24 24 24 24-10.7 24-24S39.3 2 26 2zm13.4 28.1l-4.5 4.5c-.4.4-1 .4-1.4 0L26 27.1l-7.5 7.5c-.4.4-1 .4-1.4 0l-4.5-4.5c-.4-.4-.4-1 0-1.4L20.1 21l-7.5-7.5c-.4-.4-.4-1 0-1.4l4.5-4.5c.4-.4 1-.4 1.4 0L26 14.9l7.5-7.5c.4-.4 1-.4 1.4 0l4.5 4.5c.4.4.4 1 0 1.4L31.9 21l7.5 7.5c.4.4.4 1.1 0 1.6z" />
  </svg>
);

export function PageTypeStep() {
  const { dispatch } = useDesign();

  const handleSelectPageType = (pageType: PageType) => {
    dispatch({ type: 'WIZARD_SELECT_PAGE_TYPE', pageType });
  };

  return (
    <div>
      <h3 className="wizard-step-title">What type of page do you want to create?</h3>
      <p className="wizard-step-description">
        Select a page type to get started. More types will be available soon.
      </p>

      <div className="page-type-grid">
        <PageTypeCard
          type="record"
          title="Record Page"
          description="Design a page for viewing and editing individual records"
          icon={<RecordIcon />}
          enabled={true}
          onSelect={handleSelectPageType}
        />

        <PageTypeCard
          type="app"
          title="App Page"
          description="Create a custom page for your Lightning application"
          icon={<AppIcon />}
          enabled={false}
          onSelect={handleSelectPageType}
        />

        <PageTypeCard
          type="home"
          title="Home Page"
          description="Build a customized home page for your users"
          icon={<HomeIcon />}
          enabled={false}
          onSelect={handleSelectPageType}
        />

        <PageTypeCard
          type="record"
          title="Experience Page"
          description="Design pages for Experience Cloud sites"
          icon={<ExperienceIcon />}
          enabled={false}
          onSelect={handleSelectPageType}
        />
      </div>
    </div>
  );
}

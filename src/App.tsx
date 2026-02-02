import { useState, useCallback } from 'react';
import {
  OOBComponent,
  standardComponents,
  baseComponents,
  getComponentsByCategory
} from './types/oob-components';
import './styles/builder.css';

// Canvas element state
interface CanvasElement {
  id: string;
  componentId: string;
  type: string;
  name: string;
  zone: 'main' | 'sidebar';
}

// App tabs
const appTabs = ['Home', 'Opportunities', 'Leads', 'Tasks', 'Accounts', 'Contacts', 'Campaigns'];

function App() {
  const [activeTab, setActiveTab] = useState<'standard' | 'base' | 'custom'>('standard');
  const [searchQuery, setSearchQuery] = useState('');
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [activeNavTab, setActiveNavTab] = useState('Home');
  const [draggedComponent, setDraggedComponent] = useState<OOBComponent | null>(null);
  const [dragOverZone, setDragOverZone] = useState<string | null>(null);

  // Get filtered components
  const components = getComponentsByCategory(activeTab).filter(
    comp => comp.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Drag handlers
  const handleDragStart = useCallback((e: React.DragEvent, component: OOBComponent) => {
    setDraggedComponent(component);
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', component.id);
  }, []);

  const handleDragEnd = useCallback(() => {
    setDraggedComponent(null);
    setDragOverZone(null);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, zone: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverZone(zone);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragOverZone(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, zone: 'main' | 'sidebar') => {
    e.preventDefault();
    if (draggedComponent) {
      const newElement: CanvasElement = {
        id: `${draggedComponent.id}-${Date.now()}`,
        componentId: draggedComponent.id,
        type: draggedComponent.type,
        name: draggedComponent.name,
        zone,
      };
      setCanvasElements(prev => [...prev, newElement]);
    }
    setDraggedComponent(null);
    setDragOverZone(null);
  }, [draggedComponent]);

  // Render OOB component preview
  const renderOOBComponent = (element: CanvasElement) => {
    switch (element.type) {
      case 'performance-chart':
        return (
          <div className="slds-card">
            <div className="slds-card__header slds-grid">
              <header className="slds-media slds-media_center slds-has-flexi-truncate">
                <div className="slds-media__body">
                  <h2 className="slds-card__header-title">
                    <span>Quarterly Performance</span>
                  </h2>
                </div>
              </header>
              <div className="slds-no-flex" style={{ fontSize: '12px', color: '#706e6b' }}>
                As of Today 8:11 AM
              </div>
            </div>
            <div className="slds-card__body slds-card__body_inner">
              <div style={{ display: 'flex', gap: '24px', marginBottom: '16px' }}>
                <div><strong>CLOSED</strong> $0</div>
                <div><strong>OPEN (+70%)</strong> $0</div>
                <div><strong>GOAL</strong> $34,000</div>
              </div>
              <div style={{ height: '120px', background: 'linear-gradient(to right, #e5e5e5, #0176d3 20%, #0176d3 80%, #e5e5e5)', borderRadius: '4px' }}></div>
            </div>
          </div>
        );
      case 'todays-events':
        return (
          <div className="slds-card">
            <div className="slds-card__header">
              <h2 className="slds-card__header-title">Today's Events</h2>
            </div>
            <div className="slds-card__body slds-card__body_inner">
              <div style={{ fontSize: '13px' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ color: '#706e6b' }}>8:15 AM</span>
                  <span style={{ color: '#0176d3' }}>Meeting</span>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ color: '#706e6b' }}>10:30 AM</span>
                  <span style={{ color: '#0176d3' }}>Email</span>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ color: '#706e6b' }}>2:25 PM</span>
                  <span style={{ color: '#0176d3' }}>Call</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'todays-tasks':
        return (
          <div className="slds-card">
            <div className="slds-card__header">
              <h2 className="slds-card__header-title">Today's Tasks</h2>
            </div>
            <div className="slds-card__body slds-card__body_inner">
              <div style={{ fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span>☐ Email</span>
                  <span style={{ color: '#706e6b' }}>Today</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>☑ Send Letter/Quote</span>
                  <span style={{ color: '#706e6b' }}>Today</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'assistant':
        return (
          <div className="slds-card">
            <div className="slds-card__header">
              <h2 className="slds-card__header-title">Assistant</h2>
            </div>
            <div className="slds-card__body slds-card__body_inner">
              <div style={{ fontSize: '13px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', padding: '8px', background: '#f3f3f3', borderRadius: '4px' }}>
                  <div style={{ width: '32px', height: '32px', background: '#0176d3', borderRadius: '50%' }}></div>
                  <div>
                    <div style={{ fontWeight: 500 }}>New lead assigned to you today</div>
                    <div style={{ color: '#0176d3', fontSize: '12px' }}>John Smith</div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px', background: '#f3f3f3', borderRadius: '4px' }}>
                  <div style={{ width: '32px', height: '32px', background: '#ff9a3c', borderRadius: '50%' }}></div>
                  <div>
                    <div style={{ fontWeight: 500 }}>30 days without any activity</div>
                    <div style={{ color: '#0176d3', fontSize: '12px' }}>Mike Pine</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'key-deals':
        return (
          <div className="slds-card">
            <div className="slds-card__header">
              <h2 className="slds-card__header-title">Key Deals - Recent Opportunities</h2>
            </div>
            <div className="slds-card__body slds-card__body_inner">
              <div style={{ fontSize: '13px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <a href="#" style={{ color: '#0176d3' }}>Crawl, Walk, Run: Best Practices for...</a>
                  <div style={{ color: '#706e6b', fontSize: '12px' }}>Active · $560,000 · Jan 12, 2019 - Jan 23, 2019</div>
                </div>
                <div>
                  <a href="#" style={{ color: '#0176d3' }}>3 Fool-proof Marketing Strategies...</a>
                  <div style={{ color: '#706e6b', fontSize: '12px' }}>Active · $250,000 · Jan 23, 2019 - May 19, 2019</div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="slds-card">
            <div className="slds-card__header">
              <h2 className="slds-card__header-title">{element.name}</h2>
            </div>
            <div className="slds-card__body slds-card__body_inner">
              <div style={{ color: '#706e6b', fontSize: '13px' }}>
                {element.name} component
              </div>
            </div>
          </div>
        );
    }
  };

  const mainElements = canvasElements.filter(el => el.zone === 'main');
  const sidebarElements = canvasElements.filter(el => el.zone === 'sidebar');

  return (
    <div className="builder-container">
      {/* Builder Toolbar (Blue Bar) */}
      <div className="builder-toolbar">
        <div className="builder-toolbar-left">
          <button className="builder-back-btn">
            <svg viewBox="0 0 52 52" width="16" height="16">
              <path fill="currentColor" d="M31.5 10.2c.8.8.8 2 0 2.8L19.6 26l11.9 13c.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0L15 26l13.7-15.8c.8-.8 2-.8 2.8 0z" />
            </svg>
            Home
          </button>
          <button className="builder-dropdown">
            <svg viewBox="0 0 52 52" width="16" height="16">
              <path fill="currentColor" d="M26 2C12.7 2 2 12.7 2 26s10.7 24 24 24 24-10.7 24-24S39.3 2 26 2zm0 43c-10.5 0-19-8.5-19-19S15.5 7 26 7s19 8.5 19 19-8.5 19-19 19z" />
              <circle fill="currentColor" cx="26" cy="26" r="4" />
            </svg>
            Default
            <svg viewBox="0 0 52 52" width="12" height="12">
              <path fill="currentColor" d="M8.3 14c-1.1-1.1-2.9-1.1-4 0s-1.1 2.9 0 4l19.8 19.8c1.1 1.1 2.9 1.1 4 0L48.3 18c1.1-1.1 1.1-2.9 0-4s-2.9-1.1-4 0L26 32.1 8.3 14z" />
            </svg>
          </button>
        </div>

        <div className="builder-toolbar-center">
          <div className="builder-app-name">
            <div className="app-icon">
              <svg viewBox="0 0 52 52" width="16" height="16">
                <path fill="#0176d3" d="M49 26c0-12.7-10.3-23-23-23S3 13.3 3 26s10.3 23 23 23 23-10.3 23-23zM26 7c10.5 0 19 8.5 19 19s-8.5 19-19 19S7 36.5 7 26 15.5 7 26 7z" />
              </svg>
            </div>
            JetSales
            <svg viewBox="0 0 52 52" width="12" height="12">
              <path fill="currentColor" d="M8.3 14c-1.1-1.1-2.9-1.1-4 0s-1.1 2.9 0 4l19.8 19.8c1.1 1.1 2.9 1.1 4 0L48.3 18c1.1-1.1 1.1-2.9 0-4s-2.9-1.1-4 0L26 32.1 8.3 14z" />
            </svg>
          </div>
        </div>

        <div className="builder-toolbar-right">
          <button className="builder-btn-primary builder-btn">Share</button>
          <button className="builder-btn" title="Settings">
            <svg viewBox="0 0 52 52" width="20" height="20">
              <path fill="currentColor" d="M48.5 23h-2.8c-.5-2-1.2-4-2.2-5.7l2-2c.6-.6.6-1.5 0-2.1l-2.8-2.8c-.6-.6-1.5-.6-2.1 0l-2 2c-1.8-1-3.7-1.8-5.7-2.2V7.5c0-.8-.7-1.5-1.5-1.5h-4c-.8 0-1.5.7-1.5 1.5v2.8c-2 .5-4 1.2-5.7 2.2l-2-2c-.6-.6-1.5-.6-2.1 0l-2.8 2.8c-.6.6-.6 1.5 0 2.1l2 2c-1 1.8-1.8 3.7-2.2 5.7H7.5c-.8 0-1.5.7-1.5 1.5v4c0 .8.7 1.5 1.5 1.5h2.8c.5 2 1.2 4 2.2 5.7l-2 2c-.6.6-.6 1.5 0 2.1l2.8 2.8c.6.6 1.5.6 2.1 0l2-2c1.8 1 3.7 1.8 5.7 2.2v2.8c0 .8.7 1.5 1.5 1.5h4c.8 0 1.5-.7 1.5-1.5v-2.8c2-.5 4-1.2 5.7-2.2l2 2c.6.6 1.5.6 2.1 0l2.8-2.8c.6-.6.6-1.5 0-2.1l-2-2c1-1.8 1.8-3.7 2.2-5.7h2.8c.8 0 1.5-.7 1.5-1.5v-4c0-.8-.7-1.5-1.5-1.5zM28 33c-3.9 0-7-3.1-7-7s3.1-7 7-7 7 3.1 7 7-3.1 7-7 7z" />
            </svg>
          </button>
          <button className="builder-btn" title="Help">
            <svg viewBox="0 0 52 52" width="20" height="20">
              <path fill="currentColor" d="M26 2C12.7 2 2 12.7 2 26s10.7 24 24 24 24-10.7 24-24S39.3 2 26 2zm0 43c-10.5 0-19-8.5-19-19S15.5 7 26 7s19 8.5 19 19-8.5 19-19 19zm1-9.5c0 .8-.7 1.5-1.5 1.5h-1c-.8 0-1.5-.7-1.5-1.5v-1c0-.8.7-1.5 1.5-1.5h1c.8 0 1.5.7 1.5 1.5v1zm3.5-15.7c-.3 1.8-1.2 3.2-2.8 4.3-1.7 1.2-2.6 2.3-2.6 4.3 0 .6-.4 1.1-1 1.1h-2c-.6 0-1-.5-1-1.1 0-3.2 1.7-5 3.8-6.5 1.7-1.2 2.6-2.1 2.6-3.6 0-1.8-1.5-3.3-3.5-3.3s-3.6 1.4-3.6 3.2c0 .6-.4 1.1-1 1.1h-2c-.6 0-1-.6-1-1.2 0-3.9 3.2-7.1 7.6-7.1 4.3 0 7.6 3 7.6 6.7-.1.8-.1 1.5-.1 2.1z" />
            </svg>
          </button>
          <button className="builder-dropdown">
            Preview
            <svg viewBox="0 0 52 52" width="12" height="12">
              <path fill="currentColor" d="M8.3 14c-1.1-1.1-2.9-1.1-4 0s-1.1 2.9 0 4l19.8 19.8c1.1 1.1 2.9 1.1 4 0L48.3 18c1.1-1.1 1.1-2.9 0-4s-2.9-1.1-4 0L26 32.1 8.3 14z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="builder-main">
        {/* Component Palette */}
        <div className="component-palette">
          <div className="palette-header">
            <span className="palette-header-title">
              <svg viewBox="0 0 52 52" width="16" height="16">
                <path fill="#706e6b" d="M14 8h4c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zm11 0h4c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zm11 0h4c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zM14 19h4c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zm11 0h4c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zm11 0h4c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1z" />
              </svg>
              Markup
            </span>
          </div>

          <div className="palette-header" style={{ borderBottom: '1px solid #e5e5e5' }}>
            <span style={{ fontWeight: 500 }}>Components</span>
          </div>

          <div className="palette-search">
            <input
              type="text"
              placeholder="Type to search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="palette-tabs">
            <button
              className={`palette-tab ${activeTab === 'standard' ? 'active' : ''}`}
              onClick={() => setActiveTab('standard')}
            >
              Standard
            </button>
            <button
              className={`palette-tab ${activeTab === 'base' ? 'active' : ''}`}
              onClick={() => setActiveTab('base')}
            >
              Base
            </button>
            <button
              className={`palette-tab ${activeTab === 'custom' ? 'active' : ''}`}
              onClick={() => setActiveTab('custom')}
            >
              Custom
            </button>
          </div>

          <div className="palette-components">
            {components.map(component => (
              <div
                key={component.id}
                className="palette-component-item"
                draggable
                onDragStart={(e) => handleDragStart(e, component)}
                onDragEnd={handleDragEnd}
              >
                <span className="palette-component-icon">{component.icon}</span>
                <span>{component.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Canvas */}
        <div className="canvas-container">
          <div className="canvas-toolbar">
            <span style={{ fontSize: '12px', color: '#706e6b' }}>Desktop</span>
          </div>

          <div className="canvas-wrapper">
            <div className="canvas-frame">
              {/* Simulated SF App Header */}
              <div className="sf-app-header">
                <div className="sf-app-launcher">
                  <svg viewBox="0 0 52 52" width="24" height="24">
                    <path fill="#706e6b" d="M14 8h4c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zm11 0h4c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zm11 0h4c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zM14 19h4c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zm11 0h4c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zm11 0h4c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zM14 30h4c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zm11 0h4c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1zm11 0h4c.6 0 1-.4 1-1v-4c0-.6-.4-1-1-1h-4c-.6 0-1 .4-1 1v4c0 .6.4 1 1 1z" />
                  </svg>
                </div>
                <span className="sf-app-name">JetSales</span>
                <div className="sf-nav-tabs">
                  {appTabs.map(tab => (
                    <button
                      key={tab}
                      className={`sf-nav-tab ${activeNavTab === tab ? 'active' : ''}`}
                      onClick={() => setActiveNavTab(tab)}
                    >
                      {tab}
                      <svg viewBox="0 0 52 52" width="10" height="10" style={{ marginLeft: '4px' }}>
                        <path fill="currentColor" d="M8.3 14c-1.1-1.1-2.9-1.1-4 0s-1.1 2.9 0 4l19.8 19.8c1.1 1.1 2.9 1.1 4 0L48.3 18c1.1-1.1 1.1-2.9 0-4s-2.9-1.1-4 0L26 32.1 8.3 14z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>

              {/* SF App Content - Drop Zones */}
              <div className="sf-app-content">
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '16px' }}>
                  {/* Main Zone */}
                  <div>
                    {mainElements.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {mainElements.map(element => (
                          <div key={element.id}>
                            {renderOOBComponent(element)}
                          </div>
                        ))}
                        <div
                          className={`drop-zone ${dragOverZone === 'main' ? 'drag-over' : ''}`}
                          onDragOver={(e) => handleDragOver(e, 'main')}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, 'main')}
                        >
                          + Drop component here
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`drop-zone ${dragOverZone === 'main' ? 'drag-over' : ''}`}
                        style={{ minHeight: '300px' }}
                        onDragOver={(e) => handleDragOver(e, 'main')}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, 'main')}
                      >
                        Drop components here
                      </div>
                    )}
                  </div>

                  {/* Sidebar Zone */}
                  <div>
                    {sidebarElements.length > 0 ? (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {sidebarElements.map(element => (
                          <div key={element.id}>
                            {renderOOBComponent(element)}
                          </div>
                        ))}
                        <div
                          className={`drop-zone ${dragOverZone === 'sidebar' ? 'drag-over' : ''}`}
                          onDragOver={(e) => handleDragOver(e, 'sidebar')}
                          onDragLeave={handleDragLeave}
                          onDrop={(e) => handleDrop(e, 'sidebar')}
                        >
                          + Drop component here
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`drop-zone ${dragOverZone === 'sidebar' ? 'drag-over' : ''}`}
                        style={{ minHeight: '200px' }}
                        onDragOver={(e) => handleDragOver(e, 'sidebar')}
                        onDragLeave={handleDragLeave}
                        onDrop={(e) => handleDrop(e, 'sidebar')}
                      >
                        Sidebar components
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="canvas-footer">
            <div className="canvas-zoom">Zoom to 100%</div>
            <button className="canvas-device-btn">📱</button>
            <button className="canvas-device-btn active">💻</button>
            <button className="canvas-device-btn">🖥</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

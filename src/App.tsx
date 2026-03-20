import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { UploadModal } from './components/ui/UploadModal';
import { Dashboard } from './pages/Dashboard';
import { Candidates } from './pages/Candidates';
import { Jobs } from './pages/Jobs';
import { FilterPresets } from './pages/FilterPresets';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { MatchInterface } from './pages/MatchInterface';

const pageTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  candidates: 'Candidates',
  matching: 'Job Matching',
  jobs: 'Jobs',
  filters: 'Filter Presets',
  analytics: 'Analytics',
  settings: 'Settings',
};

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'candidates':
        return <Candidates />;
      case 'matching':
        return <MatchInterface />;
      case 'jobs':
        return <Jobs />;
      case 'filters':
        return <FilterPresets />;
      case 'analytics':
        return <Analytics />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
      />
      
      <main className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <Header
          title={pageTitles[activeTab] || 'Dashboard'}
          onUpload={() => setShowUploadModal(true)}
        />
        
        <div className="p-8">
          {renderPage()}
        </div>
      </main>

      <UploadModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        onUploadComplete={(candidate) => {
          console.log('Uploaded candidate:', candidate);
        }}
      />
    </div>
  );
}

export default App;

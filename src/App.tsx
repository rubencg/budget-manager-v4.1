import './App.css';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { mockNavigation, mockSupportNav, mockUserProfile } from './data/mockData';

function App() {
  return (
    <div className="app">
      <Sidebar navigation={mockNavigation} supportNav={mockSupportNav} />
      <div className="app__main">
        <Header user={mockUserProfile} />
        <main className="app__content">
          <Dashboard />
        </main>
      </div>
    </div>
  );
}

export default App;

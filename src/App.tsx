import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { Transactions } from './pages/Transactions';
import { Budget } from './pages/Budget';
import { Settings } from './pages/Settings';
import { Accounts } from './pages/Accounts';
import { Categories } from './pages/Categories';
import { mockNavigation, mockSupportNav, mockUserProfile } from './data/mockData';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar navigation={mockNavigation} supportNav={mockSupportNav} />
        <div className="app__main">
          <Header user={mockUserProfile} />
          <main className="app__content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/budget" element={<Budget />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/accounts" element={<Accounts />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

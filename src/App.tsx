import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import './App.css';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { Transactions } from './pages/Transactions';
import { Budget } from './pages/Budget';
import { Settings } from './pages/Settings';
import { Accounts } from './pages/Accounts';
import { Categories } from './pages/Categories';
import { Login } from './pages/Login';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { mockNavigation, mockSupportNav, mockUserProfile } from './data/mockData';

function App() {
  const { user } = useAuth0();

  // Merge Auth0 user data with mock profile if available
  const userProfile = user ? {
    name: user.name || user.nickname || 'User',
    avatar: user.picture || mockUserProfile.avatar,
    greeting: `Hola, ${user.given_name || user.name || 'User'}!`
  } : mockUserProfile;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="app">
                <Sidebar navigation={mockNavigation} supportNav={mockSupportNav} />
                <div className="app__main">
                  <Header user={userProfile} />
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
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

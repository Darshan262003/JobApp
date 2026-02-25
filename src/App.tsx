import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { LandingPage } from './pages/LandingPage/LandingPage';
import { DashboardPage } from './pages/DashboardPage/DashboardPage';
import { SavedPage } from './pages/SavedPage/SavedPage';
import { DigestPage } from './pages/DigestPage/DigestPage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import { ProofPage } from './pages/ProofPage/ProofPage';
import { NotFound } from './pages/NotFound/NotFound';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/saved" element={<SavedPage />} />
          <Route path="/digest" element={<DigestPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/proof" element={<ProofPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

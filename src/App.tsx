import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { PlaceholderPage } from './components/PlaceholderPage/PlaceholderPage';
import { NotFound } from './pages/NotFound/NotFound';
import './styles/global.css';

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
          <Route path="/saved" element={<PlaceholderPage title="Saved" />} />
          <Route path="/digest" element={<PlaceholderPage title="Digest" />} />
          <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          <Route path="/proof" element={<PlaceholderPage title="Proof" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;

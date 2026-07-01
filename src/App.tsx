import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { PoseAnalysis } from './pages/PoseAnalysis';
import { Home } from './pages/Home';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { initGA } from './utils/analytics';
import { AnalyticsTracker } from './components/Analytics/AnalyticsTracker';
import './index.css';

function App() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <BrowserRouter>
      <AnalyticsTracker />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="analysis" element={<PoseAnalysis />} />
          <Route path="terms" element={<Terms />} />
          <Route path="privacy" element={<Privacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

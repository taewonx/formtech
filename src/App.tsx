import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { PoseAnalysis } from './pages/PoseAnalysis';
import { Feedback } from './pages/Feedback';
import './index.css';

import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="analysis" element={<PoseAnalysis />} />
          <Route path="feedback" element={<Feedback />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

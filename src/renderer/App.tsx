import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@primer/react-brand';
import { Banner } from './components/Banner';
import { Dashboard } from './views/Dashboard';
import { Toaster } from './components/ui/toaster';
import Results from './views/project/Results';
import { ProjectLayout } from './layout/projectLayout';
import Status from './views/project/status';
import Recon from './views/project/recon';
import { ReconResults } from './views/project/results/recon-results';
import JsLeaks from './views/project/JsLeaks';

function Home() {
  return (
    <div>
      <Banner />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Dashboard />} />
          <Route path="/:projectSlug" element={<ProjectLayout />}>
            <Route path="dashboard" element={<Status />} />
            <Route path="recon" element={<Recon />} />
            <Route path="result" element={<Results />} />
            <Route path="result-recon" element={<ReconResults />} />
            <Route path="attack" element={<Results />} />
            <Route path="jsleaks" element={<JsLeaks />} />
          </Route>
        </Routes>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

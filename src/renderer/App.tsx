import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { ThemeProvider } from '@primer/react-brand';
import { Banner } from './components/Banner';
import { Dashboard } from './views/Dashboard';
import { Recon } from './views/Recon';

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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="dashboard/:projectSlug" element={<Recon />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

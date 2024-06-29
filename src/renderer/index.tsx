import { createRoot } from 'react-dom/client';
import '@primer/react-brand/lib/css/main.css';
import '@primer/react-brand/fonts/fonts.css';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(<App />);

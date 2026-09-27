import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import AdminPage from './AdminPage.tsx';
import './index.css';

const path = window.location.pathname;

createRoot(document.getElementById('root')!).render(
  path.startsWith('/admin') ? <AdminPage /> : <App />,
);

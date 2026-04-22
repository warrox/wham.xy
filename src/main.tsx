import '@fontsource-variable/archivo-narrow';
import '@fontsource-variable/inter';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/press-start-2p';
import '@fontsource/caveat';

import './styles/reset.css';
import './styles/theme.css';
import './styles/concrete.css';
import './styles/app.css';
import './styles/perso.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';
import { Engineer } from './routes/Engineer';
import { Perso } from './routes/Perso';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Engineer /> },
      { path: 'perso', element: <Perso /> },
    ],
  },
]);

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('#root not found');

createRoot(rootEl).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import './index.css'
import App from './App.jsx'
import Login from './components/login.jsx'
import Contact from './components/contact.jsx';
import Test from './components/test.jsx';

const router = createBrowserRouter([
  { path: "/Login", element: <Login> </Login>},
  { path: "/contacts", element: <Contact /> },
  { path: "/test", element: <Test /> }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './context/AuthProvider';
import './index.css'
import Login from './components/Login.tsx';
import Contact from './components/Contact.tsx';
import NavigationBar from './components/NavigationBar.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <NavigationBar />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/contacts" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)

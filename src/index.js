import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import AuthProvider from './context/AuthContext';
import NavbarProvider from './context/NavbarContext';
import './index.css';
import CompanyProvider from './context/CompanyContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CompanyProvider>
        <NavbarProvider>
          <App />
        </NavbarProvider>
      </CompanyProvider>
    </AuthProvider>
  </React.StrictMode>,
);

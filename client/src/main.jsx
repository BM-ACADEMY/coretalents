import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'

// Import your Context
import { AuthProvider } from './Context/Authcontext.jsx'

// Import Components and Styles
import App from './App.jsx'
import './index.css'
import "./App.css"

// Get Client ID from .env
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
        <AuthProvider>
          <App />
        </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
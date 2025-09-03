import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Weather from './Components/Weather.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Weather></Weather>
  
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LoaderContextProvider from './context/LoaderContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LoaderContextProvider>
      <App />
    </LoaderContextProvider>
  </StrictMode>,
)

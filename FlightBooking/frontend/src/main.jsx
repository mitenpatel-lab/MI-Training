import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
      <ToastContainer position="top-right" autoClose={2000} />

      <App />
    </BrowserRouter>
  </StrictMode>
)

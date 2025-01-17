import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AgentProvider } from './context/AgentContext'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AgentProvider>
        <App />
      </AgentProvider>
    </BrowserRouter>
  </React.StrictMode>
)

import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import AgentBuilder from './pages/AgentBuilder'
import Templates from './pages/Templates'
import AgentPreview from './pages/AgentPreview'

function App() {
  return (
    <Routes>
      <Route path="/agent-preview/:id" element={<AgentPreview />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="builder" element={<AgentBuilder />} />
        <Route path="templates" element={<Templates />} />
      </Route>
      <Route path="*" element={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900">Page Not Found</h2>
            <p className="mt-2 text-gray-600">The page you're looking for doesn't exist.</p>
          </div>
        </div>
      } />
    </Routes>
  )
}

export default App

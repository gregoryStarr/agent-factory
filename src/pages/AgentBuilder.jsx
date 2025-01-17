import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAgents } from '../context/AgentContext'

export default function AgentBuilder() {
  const location = useLocation()
  const navigate = useNavigate()
  const { dispatch } = useAgents()
  const [agentConfig, setAgentConfig] = useState({
    name: '',
    description: '',
    type: '',
    capabilities: []
  })

  useEffect(() => {
    if (location.state?.template) {
      setAgentConfig(prev => ({
        ...prev,
        ...location.state.template
      }))
    }
  }, [location.state])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setAgentConfig(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleCreateAgent = () => {
    if (!agentConfig.name || !agentConfig.type) {
      alert('Please fill in all required fields')
      return
    }

    dispatch({ type: 'ADD_AGENT', payload: agentConfig })
    alert('Agent created successfully!')
    navigate('/')
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900">Create New Agent</h2>
      
      <div className="mt-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Agent Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={agentConfig.name}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={agentConfig.description}
              onChange={handleInputChange}
              rows={3}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Agent Type <span className="text-red-500">*</span>
            </label>
            <select
              name="type"
              value={agentConfig.type}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              required
            >
              <option value="">Select type...</option>
              <option value="chatbot">Chatbot</option>
              <option value="scheduler">Scheduler</option>
              <option value="analyzer">Data Analyzer</option>
            </select>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateAgent}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Create Agent
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

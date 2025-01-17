import React, { useState } from 'react'
import { useAgents } from '../context/AgentContext'
import AgentDeployment from './AgentDeployment'
import AgentInterface from './AgentInterface'

export default function AgentCard({ agent }) {
  const { dispatch } = useAgents()
  const [showInterface, setShowInterface] = useState(false)

  const statusColors = {
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800'
  }

  const handleToggleStatus = () => {
    dispatch({ type: 'TOGGLE_AGENT_STATUS', payload: agent.id })
  }

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this agent?')) {
      dispatch({ type: 'DELETE_AGENT', payload: agent.id })
    }
  }

  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
          <span className={`inline-block mt-1 px-2 py-1 text-xs font-medium rounded-full ${statusColors[agent.status]}`}>
            {agent.status}
          </span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setShowInterface(!showInterface)}
            className="p-1 text-gray-500 hover:text-gray-700"
            title="Test Agent"
          >
            💬
          </button>
          <button
            onClick={handleToggleStatus}
            className="p-1 text-gray-500 hover:text-gray-700"
            title={agent.status === 'active' ? 'Pause Agent' : 'Activate Agent'}
          >
            {agent.status === 'active' ? '⏸️' : '▶️'}
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-red-500 hover:text-red-700"
            title="Delete Agent"
          >
            🗑️
          </button>
        </div>
      </div>
      <p className="mt-2 text-sm text-gray-600">{agent.description}</p>
      <div className="mt-3 text-xs text-gray-500">
        Type: {agent.type}
      </div>

      {showInterface && (
        <div className="mt-4 border-t pt-4">
          <AgentInterface agent={agent} />
        </div>
      )}

      <AgentDeployment agent={agent} />
    </div>
  )
}

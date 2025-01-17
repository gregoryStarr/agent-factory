import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAgents } from '../context/AgentContext'
import AgentCard from '../components/AgentCard'

export default function Dashboard() {
  const navigate = useNavigate()
  const { state } = useAgents()

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Welcome to Agent Factory</h1>
            <p className="mt-2 text-gray-600">Start building your custom AI agents today.</p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={() => navigate('/templates')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Browse Templates
            </button>
            <button
              onClick={() => navigate('/builder')}
              className="bg-white text-blue-600 px-4 py-2 rounded border border-blue-600 hover:bg-blue-50"
            >
              Create Custom Agent
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900">Your Agents</h2>
        {state.agents.length === 0 ? (
          <div className="mt-4 text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500">You haven't created any agents yet.</p>
            <button
              onClick={() => navigate('/templates')}
              className="mt-4 text-blue-600 hover:text-blue-700"
            >
              Get started with a template →
            </button>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {state.agents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900">Quick Start Guide</h2>
        <ul className="mt-4 space-y-3">
          <li className="flex items-start">
            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">1</span>
            <span className="ml-3">Choose a template or start from scratch</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">2</span>
            <span className="ml-3">Customize your agent's capabilities</span>
          </li>
          <li className="flex items-start">
            <span className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">3</span>
            <span className="ml-3">Deploy and start using your AI assistant</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

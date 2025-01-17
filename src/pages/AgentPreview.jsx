import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useAgents } from '../context/AgentContext'
import AgentInterface from '../components/AgentInterface'

export default function AgentPreview() {
  const { id } = useParams()
  const { state } = useAgents()
  const agent = state.agents.find(a => a.id === Number(id))

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900">Agent Not Found</h2>
          <p className="mt-2 text-gray-600">The requested agent does not exist or has been removed.</p>
          <Link to="/" className="mt-4 text-blue-600 hover:text-blue-700 inline-block">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{agent.name}</h1>
              <p className="text-gray-600 mt-1">{agent.description}</p>
            </div>
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              ← Back to Dashboard
            </Link>
          </div>
          <AgentInterface agent={agent} />
        </div>
      </div>
    </div>
  )
}

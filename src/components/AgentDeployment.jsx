import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DeploymentWizard from './DeploymentWizard'

export default function AgentDeployment({ agent }) {
  const [isDeployed, setIsDeployed] = useState(false)
  const [showWizard, setShowWizard] = useState(false)
  const navigate = useNavigate()

  const handleDeploy = () => {
    setShowWizard(true)
  }

  const handlePreview = () => {
    navigate(`/agent-preview/${agent.id}`)
  }

  return (
    <div className="mt-4 border-t pt-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Deployment Status</span>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
          isDeployed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {isDeployed ? 'Deployed' : 'Not Deployed'}
        </span>
      </div>
      
      <div className="mt-3 space-y-2">
        <button
          onClick={handleDeploy}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          {isDeployed ? 'Redeploy Agent' : 'Deploy Agent'}
        </button>
        {isDeployed && (
          <button
            onClick={handlePreview}
            className="w-full bg-white text-blue-600 px-4 py-2 rounded border border-blue-600 hover:bg-blue-50 text-sm"
          >
            Test Agent
          </button>
        )}
      </div>

      {showWizard && (
        <DeploymentWizard
          agent={agent}
          onClose={() => {
            setShowWizard(false)
            setIsDeployed(true)
          }}
        />
      )}
    </div>
  )
}

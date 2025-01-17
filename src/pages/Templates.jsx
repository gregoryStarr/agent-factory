import React from 'react'
import { useNavigate } from 'react-router-dom'

const templates = [
  {
    id: 1,
    name: 'FAQ Chatbot',
    description: 'Automated customer service responses for common questions',
    category: 'Customer Support',
    defaultConfig: {
      name: 'FAQ Chatbot',
      type: 'chatbot',
      description: 'AI-powered FAQ assistant for customer support'
    }
  },
  {
    id: 2,
    name: 'Appointment Scheduler',
    description: 'AI-powered booking system for services',
    category: 'Scheduling',
    defaultConfig: {
      name: 'Appointment Scheduler',
      type: 'scheduler',
      description: 'Automated appointment booking and management'
    }
  },
  {
    id: 3,
    name: 'Inventory Assistant',
    description: 'Smart inventory tracking and management',
    category: 'Operations',
    defaultConfig: {
      name: 'Inventory Assistant',
      type: 'analyzer',
      description: 'AI-powered inventory management system'
    }
  }
]

export default function Templates() {
  const navigate = useNavigate()

  const handleUseTemplate = (template) => {
    navigate('/builder', { 
      state: { 
        template: template.defaultConfig 
      }
    })
  }

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-900">Agent Templates</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <div
            key={template.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold">{template.name}</h3>
            <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {template.category}
            </span>
            <p className="mt-2 text-sm text-gray-600">{template.description}</p>
            <button 
              onClick={() => handleUseTemplate(template)}
              className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Use Template
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

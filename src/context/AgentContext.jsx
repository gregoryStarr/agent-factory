import React, { createContext, useContext, useReducer } from 'react'

const AgentContext = createContext()

const initialState = {
  agents: []
}

function agentReducer(state, action) {
  switch (action.type) {
    case 'ADD_AGENT':
      return {
        ...state,
        agents: [...state.agents, { ...action.payload, id: Date.now(), status: 'active' }]
      }
    case 'DELETE_AGENT':
      return {
        ...state,
        agents: state.agents.filter(agent => agent.id !== action.payload)
      }
    case 'TOGGLE_AGENT_STATUS':
      return {
        ...state,
        agents: state.agents.map(agent =>
          agent.id === action.payload
            ? { ...agent, status: agent.status === 'active' ? 'paused' : 'active' }
            : agent
        )
      }
    default:
      return state
  }
}

export function AgentProvider({ children }) {
  const [state, dispatch] = useReducer(agentReducer, initialState)

  return (
    <AgentContext.Provider value={{ state, dispatch }}>
      {children}
    </AgentContext.Provider>
  )
}

export function useAgents() {
  const context = useContext(AgentContext)
  if (!context) {
    throw new Error('useAgents must be used within an AgentProvider')
  }
  return context
}

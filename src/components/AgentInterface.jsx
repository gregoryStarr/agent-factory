import React, { useState } from 'react'

export default function AgentInterface({ agent }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    if (!input.trim()) return

    setIsLoading(true)
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Simulate AI response based on agent type
    let response
    switch (agent.type) {
      case 'chatbot':
        response = await simulateChatbotResponse(input)
        break
      case 'scheduler':
        response = await simulateSchedulerResponse(input)
        break
      case 'analyzer':
        response = await simulateAnalyzerResponse(input)
        break
      default:
        response = "I'm not sure how to handle that request."
    }

    setMessages(prev => [...prev, { role: 'assistant', content: response }])
    setIsLoading(false)
  }

  return (
    <div className="border rounded-lg p-4">
      <div className="h-48 overflow-y-auto mb-4 space-y-2">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg ${
              message.role === 'user'
                ? 'bg-blue-100 ml-8'
                : 'bg-gray-100 mr-8'
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="bg-gray-100 rounded-lg p-2 mr-8">
            <span className="animate-pulse">...</span>
          </div>
        )}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
    </div>
  )
}

// Simulated response generators
async function simulateChatbotResponse(input) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  const responses = {
    greeting: ["Hello!", "Hi there!", "Greetings!"],
    farewell: ["Goodbye!", "See you later!", "Have a great day!"],
    default: ["I understand you're saying: " + input, "Let me help you with that.", "Could you please provide more details?"]
  }

  if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
    return responses.greeting[Math.floor(Math.random() * responses.greeting.length)]
  }
  if (input.toLowerCase().includes('bye')) {
    return responses.farewell[Math.floor(Math.random() * responses.farewell.length)]
  }
  return responses.default[Math.floor(Math.random() * responses.default.length)]
}

async function simulateSchedulerResponse(input) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  if (input.toLowerCase().includes('schedule') || input.toLowerCase().includes('appointment')) {
    return "I can help you schedule that. What date and time works best for you?"
  }
  if (input.toLowerCase().includes('tomorrow')) {
    return "I've checked the calendar. We have several slots available tomorrow. Would you prefer morning or afternoon?"
  }
  return "I can help you schedule appointments. Please let me know your preferred date and time."
}

async function simulateAnalyzerResponse(input) {
  await new Promise(resolve => setTimeout(resolve, 1000))
  if (input.toLowerCase().includes('analyze') || input.toLowerCase().includes('data')) {
    return "I'll analyze that data for you. Please provide the specific metrics you'd like to focus on."
  }
  if (input.toLowerCase().includes('report')) {
    return "I can generate a report based on your requirements. What type of information should I include?"
  }
  return "I can help analyze data and generate reports. What would you like to know?"
}

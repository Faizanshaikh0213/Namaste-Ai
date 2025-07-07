// Namaste AI - India's First Desi Chatbot (Web Version) // React + TailwindCSS + OpenRouter API

import { useState } from 'react';

export default function NamasteAI() { const [messages, setMessages] = useState([ { role: 'bot', text: 'Namaste! Me kaise madad kar sakta hoon?' } ]); const [input, setInput] = useState(''); const [loading, setLoading] = useState(false);

const handleSend = async () => { if (!input.trim()) return; const userMsg = { role: 'user', text: input }; setMessages([...messages, userMsg]); setInput(''); setLoading(true);

try {
  const res = await fetch('https://openrouter.ai/api/chat', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer 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,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'deepseek-chat',
      messages: [...messages, userMsg].map(m => ({ role: m.role, content: m.text }))
    })
  });

  const data = await res.json();
  const botReply = data.choices[0].message.content;
  setMessages([...messages, userMsg, { role: 'bot', text: botReply }]);
} catch (err) {
  setMessages([...messages, userMsg, { role: 'bot', text: 'Kshama kijiye, kuch galat ho gaya.' }]);
} finally {
  setLoading(false);
}

};

return ( <div className="min-h-screen bg-blue-50 flex flex-col items-center p-4"> <h1 className="text-3xl font-bold text-blue-700 mb-4">Namaste AI 🇮🇳</h1> <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-4 space-y-3"> <div className="h-96 overflow-y-auto space-y-2"> {messages.map((msg, idx) => ( <div key={idx} className={text-${msg.role === 'user' ? 'right' : 'left'} w-full}> <div className={inline-block px-4 py-2 rounded-2xl ${msg.role === 'user' ? 'bg-blue-200 text-right ml-auto' : 'bg-gray-100'}}> {msg.text} </div> </div> ))} </div>

<div className="flex space-x-2">
      <input
        type="text"
        className="flex-1 border border-blue-300 rounded-full px-4 py-2 focus:outline-none"
        placeholder="Aapka sawaal yahan likhiye..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-full disabled:opacity-50"
        onClick={handleSend}
        disabled={loading}
      >
        {loading ? '...' : 'Send'}
      </button>
    </div>
  </div>
</div>

); }


import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ChatPanel({ onComplete }) {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'system', text: 'How can I assist your mission?' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input) return;
    setMessages([...messages, { sender: 'user', text: input }]);
    setInput('');
    setLoading(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'system', text: 'What domain is the asset operating in?' },
        { sender: 'system', text: 'Any time constraints or threat profile?' }
      ]);
      setLoading(false);
      onComplete();
    }, 1000);
  };

  return (
    <div className="max-w-xl mx-auto bg-primary p-4 rounded-md shadow-md">
      <div className="space-y-2 h-64 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div key={idx} className={`text-sm ${msg.sender === 'user' ? 'text-right' : ''}`}>
            <span className="block px-2 py-1 rounded bg-gray-700 inline-block">
              {msg.text}
            </span>
          </div>
        ))}
        {loading && (
          <motion.div animate={{ opacity: [0,1,0] }} transition={{ repeat: Infinity, duration: 1 }} className="text-gray-400 text-sm">
            thinking...
          </motion.div>
        )}
      </div>
      <div className="flex space-x-2">
        <input
          className="flex-1 bg-gray-800 rounded px-2 py-1 focus:outline-none"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter mission details"/>
        <button className="bg-accent text-black px-3 py-1 rounded" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}

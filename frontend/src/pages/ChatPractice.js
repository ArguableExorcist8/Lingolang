import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ScrollToBottom from 'react-scroll-to-bottom';

function ChatPractice() {
  const [messages, setMessages] = useState([
    { role: 'system', content: 'You are a helpful language partner.' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef();

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    const newMsgs = [...messages, userMsg];
    setMessages(newMsgs);
    setInput('');
    try {
      const res = await axios.post('/api/chat', { messages: newMsgs });
      setMessages(prev => [...prev, res.data.message]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: '❗️Error sending message.' }]);
    }
  };

  // Optional: speech-to-text setup
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return alert('Speech Recognition not supported');
    const recog = new SpeechRecognition();
    recog.lang = 'en-US';
    recog.onresult = e => setInput(e.results[0][0].transcript);
    recog.start();
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollToBottom className="flex-1 p-4 overflow-auto">
        {messages.slice(1).map((m,i) => (
          <div key={i}
            className={`mb-2 p-2 rounded ${m.role==='user'?'bg-primary-light self-end':'bg-secondary-light self-start'}`}>
            {m.content}
          </div>
        ))}
      </ScrollToBottom>
      <div className="p-2 flex gap-2">
        <button onClick={startListening}>🎤</button>
        <input
          className="flex-1 p-2 border rounded"
          value={input}
          onChange={e=>setInput(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&sendMessage()}
          placeholder="Type or speak..."
        />
        <button className="px-4 bg-primary text-white rounded" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatPractice;

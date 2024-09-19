import React, { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark-reasonable.css';

const ChatWindow = ({ problem, editorContent, apiKey, onClose }: { problem: any, editorContent: string, apiKey: any, onClose: () => void }) => {
  const [messages, setMessages] = useState([{ text: "Let's see how you did! One moment...", sender: "ai" }]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 1 && messages[0].sender === 'ai') {
      sendMessage("Checking...");
    }
  }, []);

  useEffect(() => {
    hljs.highlightAll();
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (initialMessage = "") => {
    const userMessage = { text: initialMessage || input, sender: "user" };
    if (initialMessage === "") setMessages([...messages, userMessage]);
    setInput("");

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: problem.question,
          solution: problem.solution,
          userSolution: editorContent,
          userMessage: initialMessage || input,
          apiKey: apiKey, 
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMessage = { text: data.message, sender: "ai" };
        setMessages(prevMessages => [...prevMessages, userMessage, aiMessage]);
      } else {
        const errorMessage = { text: "Failed to get response from AI. Did you provide a valid API key?", sender: "ai" };
        setMessages(prevMessages => [...prevMessages, userMessage, errorMessage]);
      }
    } catch (error) {
      const errorMessage = { text: "Failed to get response from AI. Did you provide a valid API key?", sender: "ai" };
      setMessages(prevMessages => [...prevMessages, userMessage, errorMessage]);
    }
  };

  const renderMessage = (msg: { text: string, sender: string }, index: number) => {
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = msg.text.split(codeRegex);

    return (
      <div key={index} className={`my-2 p-2 rounded text-primary ${msg.sender === "ai" ? "bg-gray-200" : "bg-blue-200"}`}>
        {parts.map((part, i) => {
          if (i % 3 === 2) {
            const language = parts[i - 1] || 'plaintext';
            return (
              <pre key={i}>
                <code className={`language-${language}`}>{part}</code>
              </pre>
            );
          }
          return part;
        })}
      </div>
    );
  };

  return (
    <div className="fixed bottom-0 left-0 w-1/3 h-96 bg-tertiary shadow-lg rounded-t-lg p-4 flex flex-col z-10">
      <div className="flex-1 overflow-auto">
        {messages.map((msg, index) => renderMessage(msg, index))}
        <div ref={messagesEndRef} />
      </div>
      <button onClick={onClose} className="absolute top-2 left-2 text-error hover:text-gray-700">X</button>
    </div>
  );
};

export default ChatWindow;
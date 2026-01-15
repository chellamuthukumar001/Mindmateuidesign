import { motion } from 'motion/react';
import { Brain, Send, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm MindMate, your AI mental health companion. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const quickActions = [
    { id: '1', text: 'I feel stressed', emoji: '😰' },
    { id: '2', text: 'Exam pressure', emoji: '📚' },
    { id: '3', text: 'Feeling lonely', emoji: '😔' },
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1000);
  };

  const getBotResponse = (userText: string) => {
    const lower = userText.toLowerCase();
    if (lower.includes('stress')) {
      return "I understand stress can be overwhelming. Would you like to try a quick breathing exercise? It can help calm your mind in just 2 minutes.";
    }
    if (lower.includes('exam') || lower.includes('study')) {
      return "Exam pressure is tough! Remember, it's normal to feel anxious. Let's work on some study strategies and stress management techniques together.";
    }
    if (lower.includes('lonely') || lower.includes('alone')) {
      return "Feeling lonely is more common than you think, especially among students. I'm here for you. Would you like to talk about what's making you feel this way?";
    }
    return "Thank you for sharing that with me. Your feelings are valid. Would you like to explore some coping strategies, or would you prefer to talk more about how you're feeling?";
  };

  const handleQuickAction = (text: string) => {
    handleSendMessage(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#F8F9FE] to-[#FFF8FB] flex flex-col"
    >
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-[#6B9BD1]/10 p-4 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex items-center gap-3">
          <div className="relative">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6B9BD1] to-[#B4A7D6] flex items-center justify-center shadow-md">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#A8D5BA] rounded-full border-2 border-white"></div>
          </div>
          <div>
            <h3 className="font-semibold text-[#2D3748]">MindMate</h3>
            <p className="text-xs text-[#718096]">Always here to listen</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-4xl mx-auto w-full">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6B9BD1] to-[#B4A7D6] flex items-center justify-center mr-2 flex-shrink-0">
                <Brain className="w-4 h-4 text-white" />
              </div>
            )}
            <div
              className={`max-w-[75%] p-4 rounded-3xl shadow-sm ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-[#6B9BD1] to-[#B4A7D6] text-white rounded-br-md'
                  : 'bg-white text-[#2D3748] rounded-bl-md'
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="p-4 max-w-4xl mx-auto w-full">
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {quickActions.map((action) => (
            <motion.button
              key={action.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleQuickAction(action.text)}
              className="flex-shrink-0 px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2 border border-[#6B9BD1]/20"
            >
              <span>{action.emoji}</span>
              <span className="text-sm text-[#2D3748] whitespace-nowrap">
                {action.text}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-[#6B9BD1]/10 p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto flex gap-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
            placeholder="Type how you're feeling…"
            className="flex-1 px-5 py-4 bg-[#F0F4F8] rounded-full outline-none focus:ring-2 focus:ring-[#6B9BD1] transition-all text-[#2D3748] placeholder:text-[#718096]"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handleSendMessage(inputText)}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6B9BD1] to-[#B4A7D6] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Send className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

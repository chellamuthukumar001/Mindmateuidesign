import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Heart, 
  TrendingUp, 
  AlertCircle, 
  Globe, 
  Send, 
  Wind, 
  BookOpen, 
  Sparkles, 
  Music,
  Phone,
  MessageCircle,
  Users,
  Smile,
  Meh,
  Frown,
  CloudRain,
  BarChart3,
  Loader2
} from 'lucide-react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { BreathingExercise } from './components/BreathingExercise';
import { MoodVisualization } from './components/MoodVisualization';
import { projectId, publicAnonKey } from './utils/supabase/info';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  role?: 'user' | 'assistant';
}

interface MoodEntry {
  mood: string;
  note: string;
  timestamp: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm MindMate, powered by Claude AI. I'm here to support your mental wellbeing. How are you feeling today?",
      sender: 'bot',
      timestamp: new Date(),
      role: 'assistant',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showBreathing, setShowBreathing] = useState(false);
  const [showMoodViz, setShowMoodViz] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [isSavingMood, setIsSavingMood] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const userId = 'guest'; // In a real app, this would be from auth

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch mood history on load
  useEffect(() => {
    fetchMoodHistory();
  }, []);

  const quickActions = [
    { id: '1', text: "I'm stressed", emoji: '😰' },
    { id: '2', text: 'Exam pressure', emoji: '📚' },
    { id: '3', text: 'Feeling lonely', emoji: '😔' },
    { id: '4', text: 'Need motivation', emoji: '💪' },
  ];

  const moods = [
    { id: 'great', emoji: '😊', label: 'Great', color: '#A8D5BA' },
    { id: 'okay', emoji: '😐', label: 'Okay', color: '#6B9BD1' },
    { id: 'sad', emoji: '😔', label: 'Sad', color: '#FFD8B8' },
    { id: 'stressed', emoji: '😟', label: 'Stressed', color: '#F3D7E3' },
  ];

  const features = [
    {
      icon: <Heart className="w-6 h-6" />,
      title: 'Emotional Support',
      description: 'AI-powered empathetic conversations',
      color: '#6B9BD1',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Stress Management',
      description: 'Practical coping strategies',
      color: '#B4A7D6',
    },
    {
      icon: <Smile className="w-6 h-6" />,
      title: 'Mood Tracking',
      description: 'Monitor your emotional wellbeing',
      color: '#A8D5BA',
    },
    {
      icon: <AlertCircle className="w-6 h-6" />,
      title: 'Crisis Detection',
      description: 'Immediate support when needed',
      color: '#FFD8B8',
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Multilingual Support',
      description: 'Available in English & Tamil',
      color: '#F3D7E3',
    },
  ];

  const copingTools = [
    {
      icon: <Wind className="w-6 h-6" />,
      title: 'Breathing Exercise',
      description: 'Calm your mind in 2 minutes',
      color: '#6B9BD1',
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: 'Meditation',
      description: 'Guided mindfulness practice',
      color: '#B4A7D6',
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: 'Study Tips',
      description: 'Boost your productivity',
      color: '#A8D5BA',
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'Motivation Boost',
      description: 'Inspiring quotes & affirmations',
      color: '#FFD8B8',
    },
  ];

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
      role: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Build conversation history for Claude
      const conversationHistory = messages
        .filter((m) => m.role)
        .map((m) => ({
          role: m.role,
          content: m.text,
        }));

      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a16cdc7c/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            message: text,
            conversationHistory,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to get response from Claude AI');
      }

      const data = await response.json();
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message,
        sender: 'bot',
        timestamp: new Date(),
        role: 'assistant',
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Please try again in a moment. If you need immediate support, please reach out to a helpline.",
        sender: 'bot',
        timestamp: new Date(),
        role: 'assistant',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMoodHistory = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a16cdc7c/mood/history/${userId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        setMoodHistory(data.moods || []);
      }
    } catch (error) {
      console.error('Error fetching mood history:', error);
    }
  };

  const saveMood = async () => {
    if (!selectedMood) return;
    setIsSavingMood(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-a16cdc7c/mood`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            userId,
            mood: selectedMood,
            note: '',
          }),
        }
      );

      if (response.ok) {
        await fetchMoodHistory(); // Refresh mood history
        setSelectedMood(null);
      }
    } catch (error) {
      console.error('Error saving mood:', error);
    } finally {
      setIsSavingMood(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F8F9FE] to-[#FFF8FB]">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#B4A7D6]/10 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#A8D5BA]/10 blur-3xl"></div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#6B9BD1] to-[#B4A7D6] flex items-center justify-center shadow-xl">
                <Brain className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-[#2D3748]">MindMate</h1>
                <p className="text-sm text-[#718096]">Powered by Claude AI</p>
              </div>
            </div>

            {/* Tagline */}
            <div className="space-y-4">
              <h2 className="text-5xl font-bold text-[#2D3748] leading-tight">
                Because Your Mind Matters
              </h2>
              <p className="text-xl text-[#718096] leading-relaxed">
                Your AI mental health companion powered by Claude. Get emotional support, stress management, and wellness guidance tailored for students.
              </p>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToChat}
              className="px-8 py-4 bg-gradient-to-r from-[#6B9BD1] to-[#B4A7D6] text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 text-lg font-medium inline-flex items-center gap-3"
            >
              Start Chat
              <MessageCircle className="w-5 h-5" />
            </motion.button>

            {/* Trust Badge */}
            <div className="flex items-center gap-2 text-sm text-[#718096]">
              <div className="w-2 h-2 rounded-full bg-[#A8D5BA]"></div>
              <span>Safe, private, and confidential</span>
            </div>
          </motion.div>

          {/* Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1758797316117-8d133af25f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbWVkaXRhdGlvbiUyMGNhbG18ZW58MXx8fHwxNzY4Mzk5MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Student in peaceful meditation"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#A8D5BA]/20 flex items-center justify-center">
                  <Brain className="w-6 h-6 text-[#A8D5BA]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#2D3748]">Claude AI</p>
                  <p className="text-xs text-[#718096]">Intelligent Support</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl font-bold text-[#2D3748]">How MindMate Supports You</h2>
            <p className="text-lg text-[#718096] max-w-2xl mx-auto">
              Powered by Claude AI to provide intelligent, empathetic mental health support
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: feature.color + '20' }}
                >
                  <div style={{ color: feature.color }}>{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-[#2D3748] mb-2">
                  {feature.title}
                </h3>
                <p className="text-[#718096]">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Section - Main Focus */}
      <section ref={chatRef} className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl font-bold text-[#2D3748]">Chat with MindMate</h2>
            <p className="text-lg text-[#718096]">
              Your safe space to share feelings and get support
            </p>
          </motion.div>

          {/* Chat Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#6B9BD1] to-[#B4A7D6] p-6 text-white">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">MindMate</h3>
                  <p className="text-sm text-white/80">Powered by Claude AI • Always here to listen</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-[400px] overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
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
                        : 'bg-[#F0F4F8] text-[#2D3748] rounded-bl-md'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef}></div>
            </div>

            {/* Quick Actions */}
            <div className="px-6 pb-4">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickActions.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => handleSendMessage(action.text)}
                    className="flex-shrink-0 px-4 py-2 bg-[#F0F4F8] rounded-full hover:bg-[#E8ECF4] transition-all duration-300 flex items-center gap-2 text-sm text-[#2D3748]"
                  >
                    <span>{action.emoji}</span>
                    <span>{action.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-6 bg-[#F8F9FE] border-t border-[#E8ECF4]">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                  placeholder="Type how you're feeling…"
                  className="flex-1 px-5 py-4 bg-white rounded-full outline-none focus:ring-2 focus:ring-[#6B9BD1] transition-all text-[#2D3748]"
                />
                <button
                  onClick={() => handleSendMessage(inputText)}
                  className="w-14 h-14 rounded-full bg-gradient-to-br from-[#6B9BD1] to-[#B4A7D6] flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 text-white animate-spin" /> : <Send className="w-5 h-5 text-white" />}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mood Check-in Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl font-bold text-[#2D3748]">How Are You Feeling Today?</h2>
            <p className="text-lg text-[#718096]">
              Track your mood to help us support you better
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {moods.map((mood, index) => (
              <motion.button
                key={mood.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedMood(mood.id)}
                className={`bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 ${
                  selectedMood === mood.id ? 'ring-4 ring-offset-2 ring-[#6B9BD1]' : ''
                }`}
                style={{
                  backgroundColor: selectedMood === mood.id ? mood.color + '20' : 'white',
                }}
              >
                <div className="text-6xl mb-4">{mood.emoji}</div>
                <p className="font-semibold text-[#2D3748]">{mood.label}</p>
              </motion.button>
            ))}
          </div>

          {selectedMood && (
            <div className="flex gap-4 justify-center">
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={saveMood}
                disabled={isSavingMood}
                className="px-8 py-4 bg-gradient-to-r from-[#6B9BD1] to-[#B4A7D6] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium inline-flex items-center gap-2"
              >
                {isSavingMood ? (
                  <>
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Mood'
                )}
              </motion.button>
            </div>
          )}

          {moodHistory.length > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowMoodViz(true)}
              className="mx-auto block px-8 py-4 bg-white border-2 border-[#6B9BD1] text-[#6B9BD1] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium inline-flex items-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              View Mood Insights
            </motion.button>
          )}
        </div>
      </section>

      {/* Coping Tools Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <h2 className="text-4xl font-bold text-[#2D3748]">Coping Tools</h2>
            <p className="text-lg text-[#718096]">
              Resources to support your mental wellbeing
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {copingTools.map((tool, index) => (
              <motion.button
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-left"
                onClick={() => {
                  if (tool.title === 'Breathing Exercise') {
                    setShowBreathing(true);
                  }
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: tool.color + '20' }}
                >
                  <div style={{ color: tool.color }}>{tool.icon}</div>
                </div>
                <h3 className="font-semibold text-[#2D3748] mb-2">{tool.title}</h3>
                <p className="text-sm text-[#718096]">{tool.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Crisis Support Section */}
      <section className="py-20 px-6 bg-white/50">
        <div className="max-w-4xl mx-auto space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#A8D5BA] to-[#6B9BD1] shadow-lg">
              <Heart className="w-10 h-10 text-white" />
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-bold text-[#2D3748]">You Are Not Alone</h2>
              <p className="text-lg text-[#718096] max-w-2xl mx-auto">
                Help is available. We're here to support you through difficult times.
              </p>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#6B9BD1]/20 flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[#6B9BD1]" />
              </div>
              <h3 className="font-semibold text-[#2D3748] mb-2">Call Helpline</h3>
              <p className="text-sm text-[#718096]">24/7 crisis support</p>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#B4A7D6]/20 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-[#B4A7D6]" />
              </div>
              <h3 className="font-semibold text-[#2D3748] mb-2">Talk to Counselor</h3>
              <p className="text-sm text-[#718096]">Professional support</p>
            </motion.button>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#A8D5BA]/20 flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-[#A8D5BA]" />
              </div>
              <h3 className="font-semibold text-[#2D3748] mb-2">Contact Trusted Person</h3>
              <p className="text-sm text-[#718096]">Reach out to someone</p>
            </motion.button>
          </div>

          {/* Emergency Numbers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#6B9BD1]/10 border-2 border-[#6B9BD1]/30 rounded-2xl p-6 text-center"
          >
            <p className="text-[#2D3748] font-medium mb-2">Emergency Helpline Numbers</p>
            <div className="flex justify-center gap-6 flex-wrap text-sm">
              <span className="text-[#718096]">India: <strong className="text-[#6B9BD1]">91529 87821</strong></span>
              <span className="text-[#718096]">Crisis Line: <strong className="text-[#6B9BD1]">104</strong></span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-white border-t border-[#E8ECF4]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#6B9BD1] to-[#B4A7D6] flex items-center justify-center">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-[#2D3748]">MindMate</h3>
                  <p className="text-xs text-[#718096]">Powered by Claude AI</p>
                </div>
              </div>
              <p className="text-sm text-[#718096]">
                Built for student mental healthcare
              </p>
            </div>

            {/* Team */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[#2D3748]">Team Code Bangers</h4>
              <div className="space-y-2 text-sm text-[#718096]">
                <p>Chellamuthukumar</p>
                <p>Udhaya Prakash</p>
                <p>Shakthi Bharathi</p>
              </div>
            </div>

            {/* Privacy */}
            <div className="space-y-4">
              <h4 className="font-semibold text-[#2D3748]">Privacy & Safety</h4>
              <p className="text-sm text-[#718096] leading-relaxed">
                All conversations are confidential and encrypted. We never share your personal information.
              </p>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-[#E8ECF4] text-center space-y-2">
            <p className="text-sm text-[#718096]">
              © 2026 MindMate. Built with care for student mental health.
            </p>
            <p className="text-xs text-[#718096]">
              MindMate is not a replacement for professional mental health care.
            </p>
          </div>
        </div>
      </footer>

      {/* Breathing Exercise Modal */}
      <AnimatePresence>
        {showBreathing && (
          <BreathingExercise onClose={() => setShowBreathing(false)} />
        )}
      </AnimatePresence>

      {/* Mood Visualization Modal */}
      <AnimatePresence>
        {showMoodViz && (
          <MoodVisualization moods={moodHistory} onClose={() => setShowMoodViz(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
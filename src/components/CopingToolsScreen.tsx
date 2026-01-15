import { motion } from 'motion/react';
import { Wind, Brain, BookOpen, Sparkles, Heart, Music } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  duration?: string;
}

export function CopingToolsScreen() {
  const tools: Tool[] = [
    {
      id: 'breathing',
      title: 'Breathing Exercise',
      description: 'Calm your mind with guided breathing',
      icon: <Wind className="w-6 h-6" />,
      color: '#6B9BD1',
      duration: '2 min',
    },
    {
      id: 'meditation',
      title: 'Meditation',
      description: 'Mindfulness practice for inner peace',
      icon: <Brain className="w-6 h-6" />,
      color: '#B4A7D6',
      duration: '5 min',
    },
    {
      id: 'study-tips',
      title: 'Study Tips',
      description: 'Effective techniques to boost learning',
      icon: <BookOpen className="w-6 h-6" />,
      color: '#A8D5BA',
    },
    {
      id: 'motivation',
      title: 'Motivation',
      description: 'Inspiring quotes and affirmations',
      icon: <Sparkles className="w-6 h-6" />,
      color: '#FFD8B8',
    },
    {
      id: 'self-care',
      title: 'Self-Care Tips',
      description: 'Daily practices for wellbeing',
      icon: <Heart className="w-6 h-6" />,
      color: '#F3D7E3',
    },
    {
      id: 'music',
      title: 'Calming Music',
      description: 'Relaxing sounds and playlists',
      icon: <Music className="w-6 h-6" />,
      color: '#B4A7D6',
      duration: '∞',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#F8F9FE] to-[#FFF8FB] p-6"
    >
      <div className="max-w-6xl mx-auto space-y-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-3"
        >
          <h2 className="text-3xl font-bold text-[#2D3748]">Coping Tools</h2>
          <p className="text-[#718096]">
            Explore resources to support your mental wellbeing
          </p>
        </motion.div>

        {/* Featured Tool */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative bg-gradient-to-br from-[#6B9BD1] to-[#B4A7D6] rounded-3xl overflow-hidden shadow-xl"
        >
          <div className="relative z-10 p-8 text-white">
            <div className="flex items-start justify-between">
              <div className="space-y-3 max-w-md">
                <div className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-medium">
                  Featured
                </div>
                <h3 className="text-2xl font-bold">Daily Mindfulness</h3>
                <p className="text-white/90">
                  Start your day with a 5-minute guided meditation session
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white text-[#6B9BD1] rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Start Now
                </motion.button>
              </div>
              <div className="hidden md:block w-48 h-48 rounded-2xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1667260645784-6920763ce9e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFjZWZ1bCUyMG5hdHVyZSUyMHplbnxlbnwxfHx8fDE3NjgzNDQ3NjV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Peaceful nature"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool, index) => (
            <motion.button
              key={tool.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-left group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: tool.color + '20' }}
                  >
                    <div style={{ color: tool.color }}>{tool.icon}</div>
                  </div>
                  {tool.duration && (
                    <span
                      className="text-xs font-medium px-3 py-1 rounded-full"
                      style={{ backgroundColor: tool.color + '20', color: tool.color }}
                    >
                      {tool.duration}
                    </span>
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-[#2D3748]">{tool.title}</h3>
                  <p className="text-sm text-[#718096] leading-relaxed">
                    {tool.description}
                  </p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Daily Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white rounded-3xl p-8 shadow-lg border-l-4 border-[#A8D5BA]"
        >
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#A8D5BA]/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-[#A8D5BA]" />
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold text-[#2D3748]">Daily Wellness Tip</h3>
              <p className="text-sm text-[#718096] leading-relaxed">
                "Remember to take breaks while studying. Your brain needs rest to process information effectively. Try the Pomodoro technique: 25 minutes of focus, followed by a 5-minute break."
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

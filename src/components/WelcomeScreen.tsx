import { motion } from 'motion/react';
import { Brain, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#F8F9FE] to-[#FFF8FB] flex flex-col items-center justify-center p-6 relative overflow-hidden"
    >
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-[#B4A7D6]/10 blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-[#A8D5BA]/10 blur-3xl"></div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-8 max-w-md w-full"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="flex items-center justify-center gap-3 mb-4"
        >
          <div className="relative">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-[#6B9BD1] to-[#B4A7D6] flex items-center justify-center shadow-lg">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-1 -right-1"
            >
              <Sparkles className="w-5 h-5 text-[#FFD8B8]" />
            </motion.div>
          </div>
        </motion.div>

        <div className="space-y-3">
          <h1 className="text-4xl font-bold text-[#2D3748]">MindMate</h1>
          <p className="text-lg text-[#718096] font-medium">
            Because Your Mind Matters
          </p>
        </div>

        {/* Illustration */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="relative w-full max-w-sm mx-auto"
        >
          <div className="aspect-square rounded-3xl overflow-hidden shadow-xl">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1758797316117-8d133af25f8c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwbWVkaXRhdGlvbiUyMGNhbG18ZW58MXx8fHwxNzY4Mzk5MDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Student in peaceful meditation"
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-4"
        >
          <p className="text-[#718096] leading-relaxed">
            Your AI-powered mental health companion for emotional support, stress management, and wellness guidance.
          </p>

          {/* Get Started Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGetStarted}
            className="w-full py-4 px-6 bg-gradient-to-r from-[#6B9BD1] to-[#B4A7D6] text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium"
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

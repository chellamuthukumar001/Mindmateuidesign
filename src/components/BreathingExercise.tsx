import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause } from 'lucide-react';

interface BreathingExerciseProps {
  onClose: () => void;
}

export function BreathingExercise({ onClose }: BreathingExerciseProps) {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev > 1) return prev - 1;

        // Move to next phase
        if (phase === 'inhale') {
          setPhase('hold');
          return 4;
        } else if (phase === 'hold') {
          setPhase('exhale');
          return 4;
        } else {
          setPhase('inhale');
          return 4;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, phase]);

  const getPhaseInfo = () => {
    switch (phase) {
      case 'inhale':
        return {
          text: 'Breathe In',
          description: 'Slowly inhale through your nose',
          color: '#6B9BD1',
          scale: 1.5,
        };
      case 'hold':
        return {
          text: 'Hold',
          description: 'Hold your breath gently',
          color: '#B4A7D6',
          scale: 1.5,
        };
      case 'exhale':
        return {
          text: 'Breathe Out',
          description: 'Slowly exhale through your mouth',
          color: '#A8D5BA',
          scale: 0.8,
        };
    }
  };

  const phaseInfo = getPhaseInfo();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl relative"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#2D3748] mb-2">
            Breathing Exercise
          </h2>
          <p className="text-[#718096]">
            Follow the circle and breathe deeply
          </p>
        </div>

        {/* Breathing Circle */}
        <div className="relative flex items-center justify-center mb-8" style={{ height: '300px' }}>
          {/* Animated Circle */}
          <motion.div
            animate={{
              scale: isActive ? phaseInfo.scale : 1,
              backgroundColor: phaseInfo.color,
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
            }}
            className="absolute w-48 h-48 rounded-full shadow-2xl flex flex-col items-center justify-center"
          >
            <div className="text-white text-center">
              <div className="text-6xl font-bold mb-2">{countdown}</div>
              <div className="text-xl font-semibold">{phaseInfo.text}</div>
            </div>
          </motion.div>

          {/* Pulse Effect */}
          {isActive && (
            <motion.div
              animate={{
                scale: [1, phaseInfo.scale * 1.1],
                opacity: [0.3, 0],
              }}
              transition={{
                duration: 4,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
              className="absolute w-48 h-48 rounded-full"
              style={{ backgroundColor: phaseInfo.color }}
            />
          )}
        </div>

        {/* Phase Description */}
        <div className="text-center mb-6">
          <p className="text-lg text-[#2D3748] font-medium">
            {phaseInfo.description}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsActive(!isActive)}
            className="px-8 py-4 rounded-2xl font-medium text-white shadow-lg hover:shadow-xl transition-all flex items-center gap-3"
            style={{ backgroundColor: phaseInfo.color }}
          >
            {isActive ? (
              <>
                <Pause className="w-5 h-5" />
                Pause
              </>
            ) : (
              <>
                <Play className="w-5 h-5" />
                Start
              </>
            )}
          </motion.button>
        </div>

        {/* Tips */}
        <div className="mt-8 p-4 bg-[#F0F4F8] rounded-2xl">
          <p className="text-sm text-[#718096] text-center">
            💡 Tip: Find a quiet space and do this for 2-5 minutes to feel calmer and more focused
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

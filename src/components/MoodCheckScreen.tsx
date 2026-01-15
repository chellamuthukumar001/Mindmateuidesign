import { motion } from 'motion/react';
import { useState } from 'react';
import { Smile, Meh, Frown, CloudRain, Heart } from 'lucide-react';

interface Mood {
  id: string;
  emoji: string;
  label: string;
  color: string;
  icon: React.ReactNode;
}

export function MoodCheckScreen() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const moods: Mood[] = [
    {
      id: 'great',
      emoji: '😊',
      label: 'Great',
      color: '#A8D5BA',
      icon: <Smile className="w-6 h-6" />,
    },
    {
      id: 'good',
      emoji: '🙂',
      label: 'Good',
      color: '#6B9BD1',
      icon: <Heart className="w-6 h-6" />,
    },
    {
      id: 'okay',
      emoji: '😐',
      label: 'Okay',
      color: '#B4A7D6',
      icon: <Meh className="w-6 h-6" />,
    },
    {
      id: 'sad',
      emoji: '😔',
      label: 'Sad',
      color: '#FFD8B8',
      icon: <Frown className="w-6 h-6" />,
    },
    {
      id: 'stressed',
      emoji: '😟',
      label: 'Stressed',
      color: '#F3D7E3',
      icon: <CloudRain className="w-6 h-6" />,
    },
  ];

  const handleSaveMood = () => {
    if (!selectedMood) return;
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setSelectedMood(null);
      setNote('');
    }, 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#F8F9FE] to-[#FFF8FB] p-6"
    >
      <div className="max-w-2xl mx-auto space-y-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-3"
        >
          <h2 className="text-3xl font-bold text-[#2D3748]">
            How are you feeling today?
          </h2>
          <p className="text-[#718096]">
            Tracking your mood helps us support you better
          </p>
        </motion.div>

        {/* Mood Selector */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4"
        >
          {moods.map((mood, index) => (
            <motion.button
              key={mood.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedMood(mood.id)}
              className={`relative p-6 rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center gap-3 ${
                selectedMood === mood.id
                  ? 'ring-4 ring-offset-2 ring-[#6B9BD1]'
                  : ''
              }`}
              style={{
                backgroundColor: selectedMood === mood.id ? mood.color + '20' : 'white',
              }}
            >
              <div className="text-5xl">{mood.emoji}</div>
              <span className="text-sm font-medium text-[#2D3748]">{mood.label}</span>
              {selectedMood === mood.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[#6B9BD1] flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </svg>
                </motion.div>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Optional Note */}
        {selectedMood && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <label className="block text-sm font-medium text-[#2D3748]">
              Anything you'd like to share? (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind today..."
              className="w-full px-5 py-4 bg-white rounded-2xl outline-none focus:ring-2 focus:ring-[#6B9BD1] transition-all text-[#2D3748] placeholder:text-[#718096] min-h-[100px] resize-none shadow-md"
            />
          </motion.div>
        )}

        {/* Save Button */}
        {selectedMood && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSaveMood}
            disabled={saved}
            className={`w-full py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 font-medium ${
              saved
                ? 'bg-[#A8D5BA] text-white'
                : 'bg-gradient-to-r from-[#6B9BD1] to-[#B4A7D6] text-white'
            }`}
          >
            {saved ? '✓ Mood Saved!' : 'Save Mood'}
          </motion.button>
        )}

        {/* Mood History Preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg"
        >
          <h3 className="font-semibold text-[#2D3748] mb-4">This Week's Mood</h3>
          <div className="flex justify-between items-end gap-2">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="flex-1 flex flex-col items-center gap-2">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.random() * 60 + 40}%` }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="w-full rounded-lg bg-gradient-to-t from-[#6B9BD1] to-[#B4A7D6] min-h-[40px]"
                ></motion.div>
                <span className="text-xs text-[#718096]">{day}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

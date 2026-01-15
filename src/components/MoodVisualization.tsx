import { motion } from 'motion/react';
import { X, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface MoodEntry {
  mood: string;
  note: string;
  timestamp: string;
}

interface MoodVisualizationProps {
  moods: MoodEntry[];
  onClose: () => void;
}

export function MoodVisualization({ moods, onClose }: MoodVisualizationProps) {
  // Map moods to numeric values for visualization
  const moodToValue: { [key: string]: number } = {
    great: 4,
    okay: 3,
    sad: 2,
    stressed: 1,
  };

  const moodToEmoji: { [key: string]: string } = {
    great: '😊',
    okay: '😐',
    sad: '😔',
    stressed: '😟',
  };

  const moodToColor: { [key: string]: string } = {
    great: '#A8D5BA',
    okay: '#6B9BD1',
    sad: '#FFD8B8',
    stressed: '#F3D7E3',
  };

  // Prepare data for charts (last 7 days)
  const chartData = moods.slice(0, 7).reverse().map((entry) => ({
    date: new Date(entry.timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
    value: moodToValue[entry.mood] || 2,
    mood: entry.mood,
  }));

  // Calculate mood distribution
  const moodCounts = moods.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const distributionData = Object.entries(moodCounts).map(([mood, count]) => ({
    mood: mood.charAt(0).toUpperCase() + mood.slice(1),
    count,
    emoji: moodToEmoji[mood],
    color: moodToColor[mood],
  }));

  // Calculate average mood
  const avgMood =
    moods.reduce((sum, entry) => sum + (moodToValue[entry.mood] || 2), 0) /
    moods.length;

  const getTrend = () => {
    if (moods.length < 2) return 'neutral';
    const recent = moodToValue[moods[0].mood] || 2;
    const previous = moodToValue[moods[1].mood] || 2;
    if (recent > previous) return 'up';
    if (recent < previous) return 'down';
    return 'neutral';
  };

  const trend = getTrend();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#2D3748] mb-2">
            Your Mood Journey
          </h2>
          <p className="text-[#718096]">
            Track your emotional wellbeing over time
          </p>
        </div>

        {moods.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📊</div>
            <p className="text-xl text-[#718096]">
              Start tracking your mood to see insights here
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Entries */}
              <div className="bg-gradient-to-br from-[#6B9BD1] to-[#B4A7D6] rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">{moods.length}</div>
                <div className="text-sm opacity-90">Total Check-ins</div>
              </div>

              {/* Average Mood */}
              <div className="bg-gradient-to-br from-[#A8D5BA] to-[#6B9BD1] rounded-2xl p-6 text-white">
                <div className="text-4xl font-bold mb-2">
                  {avgMood.toFixed(1)}/4
                </div>
                <div className="text-sm opacity-90">Average Mood</div>
              </div>

              {/* Trend */}
              <div className="bg-gradient-to-br from-[#B4A7D6] to-[#F3D7E3] rounded-2xl p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  {trend === 'up' && <TrendingUp className="w-8 h-8" />}
                  {trend === 'down' && <TrendingDown className="w-8 h-8" />}
                  {trend === 'neutral' && <Minus className="w-8 h-8" />}
                  <span className="text-4xl font-bold">
                    {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'}
                  </span>
                </div>
                <div className="text-sm opacity-90">Recent Trend</div>
              </div>
            </div>

            {/* Line Chart - Mood Over Time */}
            {chartData.length > 1 && (
              <div className="bg-[#F8F9FE] rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-[#2D3748] mb-4">
                  Mood Timeline (Last 7 Days)
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF4" />
                    <XAxis
                      dataKey="date"
                      stroke="#718096"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis
                      domain={[0, 4]}
                      ticks={[1, 2, 3, 4]}
                      stroke="#718096"
                      style={{ fontSize: '12px' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6B9BD1"
                      strokeWidth={3}
                      dot={{ fill: '#6B9BD1', r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Bar Chart - Mood Distribution */}
            {distributionData.length > 0 && (
              <div className="bg-[#F8F9FE] rounded-2xl p-6">
                <h3 className="text-xl font-semibold text-[#2D3748] mb-4">
                  Mood Distribution
                </h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={distributionData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E8ECF4" />
                    <XAxis
                      dataKey="mood"
                      stroke="#718096"
                      style={{ fontSize: '12px' }}
                    />
                    <YAxis stroke="#718096" style={{ fontSize: '12px' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      }}
                    />
                    <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                      {distributionData.map((entry, index) => (
                        <motion.rect
                          key={`cell-${index}`}
                          fill={entry.color}
                          initial={{ scaleY: 0 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: index * 0.1 }}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Recent Entries */}
            <div className="bg-[#F8F9FE] rounded-2xl p-6">
              <h3 className="text-xl font-semibold text-[#2D3748] mb-4">
                Recent Check-ins
              </h3>
              <div className="space-y-3">
                {moods.slice(0, 5).map((entry, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl p-4 flex items-center gap-4"
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{
                        backgroundColor: moodToColor[entry.mood] + '30',
                      }}
                    >
                      {moodToEmoji[entry.mood]}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-[#2D3748] capitalize">
                        {entry.mood}
                      </div>
                      <div className="text-sm text-[#718096]">
                        {new Date(entry.timestamp).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                        })}
                      </div>
                      {entry.note && (
                        <div className="text-sm text-[#718096] mt-1">
                          {entry.note}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

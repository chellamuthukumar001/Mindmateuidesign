import { motion } from 'motion/react';
import { Phone, MessageCircle, Users, Heart, Shield, ExternalLink } from 'lucide-react';

interface CrisisResource {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  action: string;
  color: string;
  urgent?: boolean;
}

export function CrisisScreen() {
  const resources: CrisisResource[] = [
    {
      id: 'helpline',
      title: 'Call Helpline',
      description: '24/7 crisis support and counseling',
      icon: <Phone className="w-6 h-6" />,
      action: 'Call Now',
      color: '#6B9BD1',
      urgent: true,
    },
    {
      id: 'counselor',
      title: 'Talk to Counselor',
      description: 'Connect with a mental health professional',
      icon: <MessageCircle className="w-6 h-6" />,
      action: 'Book Session',
      color: '#B4A7D6',
    },
    {
      id: 'trusted-person',
      title: 'Message Trusted Person',
      description: 'Reach out to someone you trust',
      icon: <Users className="w-6 h-6" />,
      action: 'Send Message',
      color: '#A8D5BA',
    },
  ];

  const emergencyNumbers = [
    { country: 'India', number: '91529 87821', service: 'National Mental Health' },
    { country: 'India', number: '104', service: 'Helpline' },
    { country: 'International', number: '988', service: 'Suicide & Crisis Lifeline (US)' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#F8F9FE] to-[#FFF8FB] p-6"
    >
      <div className="max-w-3xl mx-auto space-y-8 py-8">
        {/* Calm Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#A8D5BA] to-[#6B9BD1] shadow-lg">
            <Heart className="w-10 h-10 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-[#2D3748]">
              You Are Not Alone
            </h2>
            <p className="text-[#718096] max-w-md mx-auto leading-relaxed">
              Help is available. We're here to support you through difficult times.
            </p>
          </div>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-[#6B9BD1]/10 border-2 border-[#6B9BD1]/30 rounded-2xl p-6"
        >
          <div className="flex gap-3">
            <Shield className="w-6 h-6 text-[#6B9BD1] flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-[#2D3748]">
                If you're in immediate danger
              </h3>
              <p className="text-sm text-[#718096] leading-relaxed">
                Please call emergency services (911 in US, 112 in Europe) or go to the nearest hospital emergency room.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Crisis Resources */}
        <div className="space-y-4">
          {resources.map((resource, index) => (
            <motion.button
              key={resource.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-left group ${
                resource.urgent ? 'ring-2 ring-[#6B9BD1] ring-offset-2' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: resource.color + '20' }}
                >
                  <div style={{ color: resource.color }}>{resource.icon}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-[#2D3748]">{resource.title}</h3>
                    {resource.urgent && (
                      <span className="text-xs px-2 py-0.5 bg-[#6B9BD1]/20 text-[#6B9BD1] rounded-full font-medium">
                        Urgent
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#718096]">{resource.description}</p>
                </div>
                <div
                  className="px-4 py-2 rounded-xl font-medium transition-all duration-300 group-hover:shadow-md"
                  style={{ backgroundColor: resource.color + '20', color: resource.color }}
                >
                  {resource.action}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Emergency Numbers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-2xl p-6 shadow-lg space-y-4"
        >
          <h3 className="font-semibold text-[#2D3748] flex items-center gap-2">
            <Phone className="w-5 h-5 text-[#6B9BD1]" />
            Emergency Helpline Numbers
          </h3>
          <div className="space-y-3">
            {emergencyNumbers.map((number, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-[#F0F4F8] rounded-xl"
              >
                <div>
                  <p className="font-medium text-[#2D3748]">{number.service}</p>
                  <p className="text-xs text-[#718096]">{number.country}</p>
                </div>
                <a
                  href={`tel:${number.number.replace(/\s/g, '')}`}
                  className="text-lg font-bold text-[#6B9BD1] hover:underline"
                >
                  {number.number}
                </a>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-[#B4A7D6]/10 to-[#A8D5BA]/10 rounded-2xl p-6 space-y-4"
        >
          <h3 className="font-semibold text-[#2D3748]">More Resources</h3>
          <div className="space-y-2">
            <a
              href="#"
              className="flex items-center justify-between p-3 hover:bg-white/50 rounded-xl transition-all duration-300 group"
            >
              <span className="text-sm text-[#2D3748]">Crisis Text Line</span>
              <ExternalLink className="w-4 h-4 text-[#718096] group-hover:text-[#6B9BD1]" />
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-3 hover:bg-white/50 rounded-xl transition-all duration-300 group"
            >
              <span className="text-sm text-[#2D3748]">Online Support Communities</span>
              <ExternalLink className="w-4 h-4 text-[#718096] group-hover:text-[#6B9BD1]" />
            </a>
            <a
              href="#"
              className="flex items-center justify-between p-3 hover:bg-white/50 rounded-xl transition-all duration-300 group"
            >
              <span className="text-sm text-[#2D3748]">Mental Health Resources</span>
              <ExternalLink className="w-4 h-4 text-[#718096] group-hover:text-[#6B9BD1]" />
            </a>
          </div>
        </motion.div>

        {/* Reassurance Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center p-6 space-y-2"
        >
          <p className="text-sm text-[#718096] leading-relaxed">
            Remember: Asking for help is a sign of strength, not weakness.
          </p>
          <p className="text-sm font-medium text-[#6B9BD1]">
            You deserve support and care. 💙
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

import { motion } from 'motion/react';
import { User, Globe, Shield, Moon, Sun, Bell, Lock, Info, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function ProfileScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('English');

  const settingsSections = [
    {
      title: 'Account',
      items: [
        { id: 'name', icon: <User className="w-5 h-5" />, label: 'Name', value: 'Guest User (Optional)', editable: true },
        { id: 'email', icon: <User className="w-5 h-5" />, label: 'Email', value: 'Not set', editable: true },
      ],
    },
    {
      title: 'Preferences',
      items: [
        { id: 'language', icon: <Globe className="w-5 h-5" />, label: 'Language', value: language, hasDropdown: true },
        { id: 'notifications', icon: <Bell className="w-5 h-5" />, label: 'Notifications', toggle: true },
        { id: 'darkMode', icon: darkMode ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />, label: 'Dark Mode', toggle: true },
      ],
    },
    {
      title: 'Privacy & Security',
      items: [
        { id: 'privacy', icon: <Shield className="w-5 h-5" />, label: 'Privacy Policy', hasArrow: true },
        { id: 'data', icon: <Lock className="w-5 h-5" />, label: 'Data & Security', hasArrow: true },
        { id: 'delete', icon: <Info className="w-5 h-5" />, label: 'Delete My Data', hasArrow: true },
      ],
    },
  ];

  const handleToggle = (id: string) => {
    if (id === 'darkMode') {
      setDarkMode(!darkMode);
      document.documentElement.classList.toggle('dark');
    } else if (id === 'notifications') {
      setNotifications(!notifications);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-[#F8F9FE] to-[#FFF8FB] p-6"
    >
      <div className="max-w-3xl mx-auto space-y-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="space-y-3"
        >
          <h2 className="text-3xl font-bold text-[#2D3748]">Profile & Settings</h2>
          <p className="text-[#718096]">Manage your account and preferences</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-[#6B9BD1] to-[#B4A7D6] rounded-3xl p-8 text-white shadow-xl relative overflow-hidden"
        >
          <div className="relative z-10 flex items-center gap-6">
            <div className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-xl">
              <User className="w-12 h-12 text-white" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Guest User</h3>
              <p className="text-white/80">Member since January 2026</p>
              <button className="text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg hover:bg-white/30 transition-all duration-300">
                Complete Profile
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg grid grid-cols-3 gap-6"
        >
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-[#6B9BD1]">12</p>
            <p className="text-xs text-[#718096]">Check-ins</p>
          </div>
          <div className="text-center space-y-1 border-x border-[#E8ECF4]">
            <p className="text-2xl font-bold text-[#B4A7D6]">8</p>
            <p className="text-xs text-[#718096]">Tools Used</p>
          </div>
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-[#A8D5BA]">5</p>
            <p className="text-xs text-[#718096]">Day Streak</p>
          </div>
        </motion.div>

        {/* Settings Sections */}
        <div className="space-y-6">
          {settingsSections.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + sectionIndex * 0.1 }}
              className="space-y-3"
            >
              <h3 className="text-sm font-semibold text-[#718096] uppercase tracking-wide px-2">
                {section.title}
              </h3>
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden divide-y divide-[#E8ECF4]">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => item.toggle && handleToggle(item.id)}
                    className="w-full p-5 flex items-center gap-4 hover:bg-[#F8F9FE] transition-all duration-300 text-left group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#6B9BD1]/10 flex items-center justify-center text-[#6B9BD1] group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-[#2D3748]">{item.label}</h4>
                      {item.value && (
                        <p className="text-sm text-[#718096]">{item.value}</p>
                      )}
                    </div>
                    {item.toggle && (
                      <div
                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                          (item.id === 'darkMode' && darkMode) || (item.id === 'notifications' && notifications)
                            ? 'bg-[#6B9BD1]'
                            : 'bg-[#CBD5E0]'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 mt-0.5 ${
                            (item.id === 'darkMode' && darkMode) || (item.id === 'notifications' && notifications)
                              ? 'translate-x-6'
                              : 'translate-x-0.5'
                          }`}
                        ></div>
                      </div>
                    )}
                    {item.hasArrow && (
                      <ChevronRight className="w-5 h-5 text-[#718096] group-hover:translate-x-1 transition-transform duration-300" />
                    )}
                    {item.hasDropdown && (
                      <div className="px-3 py-1 bg-[#F0F4F8] rounded-lg text-sm text-[#2D3748]">
                        {item.value}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Privacy Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-[#A8D5BA]/10 border border-[#A8D5BA]/30 rounded-2xl p-6"
        >
          <div className="flex gap-3">
            <Shield className="w-6 h-6 text-[#A8D5BA] flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-[#2D3748]">Your Data is Safe</h3>
              <p className="text-sm text-[#718096] leading-relaxed">
                All conversations are encrypted and stored securely. We never share your personal information with third parties. You can delete your data at any time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-center space-y-2 py-4"
        >
          <p className="text-xs text-[#718096]">
            MindMate is not meant for collecting PII or securing sensitive data
          </p>
          <p className="text-xs text-[#718096]">
            Version 1.0.0 • Made with 💙 for students
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

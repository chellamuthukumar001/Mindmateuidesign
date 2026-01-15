import { motion } from 'motion/react';
import { Mail, UserCircle, Shield } from 'lucide-react';

interface LoginScreenProps {
  onContinue: () => void;
}

export function LoginScreen({ onContinue }: LoginScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="min-h-screen bg-gradient-to-br from-[#F8F9FE] to-[#FFF8FB] flex flex-col items-center justify-center p-6"
    >
      <div className="w-full max-w-md space-y-8">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center space-y-3"
        >
          <h2 className="text-3xl font-bold text-[#2D3748]">Welcome Back</h2>
          <p className="text-[#718096]">
            Choose how you'd like to continue
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          {/* Continue as Guest */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            className="w-full p-5 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-4 border border-[#6B9BD1]/20"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#A8D5BA] to-[#6B9BD1] flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-[#2D3748]">Continue as Guest</h3>
              <p className="text-sm text-[#718096]">No sign-up required</p>
            </div>
          </motion.button>

          {/* Sign in with Email */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onContinue}
            className="w-full p-5 bg-gradient-to-r from-[#6B9BD1] to-[#B4A7D6] rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-4"
          >
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Mail className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-white">Sign in with Email</h3>
              <p className="text-sm text-white/80">Sync across devices</p>
            </div>
          </motion.button>
        </motion.div>

        {/* Privacy Note */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-5 border border-[#6B9BD1]/10"
        >
          <div className="flex gap-3">
            <Shield className="w-5 h-5 text-[#6B9BD1] flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="font-semibold text-[#2D3748] text-sm">
                Your conversations are safe & private
              </h4>
              <p className="text-xs text-[#718096] leading-relaxed">
                All conversations are encrypted and confidential. We never share your personal information.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-[#718096]"
        >
          By continuing, you agree to our{' '}
          <span className="text-[#6B9BD1] underline cursor-pointer">Terms of Service</span>
          {' '}and{' '}
          <span className="text-[#6B9BD1] underline cursor-pointer">Privacy Policy</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

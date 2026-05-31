import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setTab: (tab: string) => void;
  onLoginClick: () => void;
  darkMode: boolean;
  setDarkMode: (dark: boolean) => void;
}

export default function Navbar({ currentTab, setTab, onLoginClick, darkMode, setDarkMode }: NavbarProps) {
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Explore Jobs', id: 'jobs' },
    { label: 'Job Details', id: 'details' },
    { label: 'About', id: 'about' }
  ];

  return (
    <nav className="w-full max-w-7xl mx-auto px-8 py-6 flex items-center justify-between z-50 relative bg-transparent font-sans">
      {/* Left Logo Item with clean circular design */}
      <div 
        className="flex items-center gap-2.5 cursor-pointer group"
        onClick={() => setTab('home')}
      >
        <div className={`w-9 h-9 rounded-full border-2 ${darkMode ? 'border-amber-400 bg-neutral-900' : 'border-black bg-white'} flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]`}>
          <span className={`font-sans font-black text-base tracking-tight flex items-center justify-center ${darkMode ? 'text-amber-400' : 'text-black'}`}>
            AI
          </span>
        </div>

        <span className={`font-sans font-black text-base md:text-lg tracking-[0.03em] select-none transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>
          AICRYPTO PAY
        </span>
      </div>

      {/* Center Dynamic Navigation matching exactly */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`relative text-sm font-semibold transition-all duration-300 focus:outline-none ${
                isActive 
                  ? (darkMode ? 'text-amber-400 font-bold' : 'text-black font-bold') 
                  : (darkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black')
              }`}
            >
              {item.label}
              {isActive && (
                <motion.span 
                  layoutId="activeNavIndicator"
                  className={`absolute -bottom-1.5 left-0 right-0 h-[2px] rounded-full ${darkMode ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'bg-black'}`} 
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Right Login/Register Button + Premium Dark Mode Toggle */}
      <div className="flex items-center gap-4">
        {/* Cinematic Theme Switcher */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`h-8 w-14 rounded-full p-1 cursor-pointer transition-all duration-500 relative flex items-center ${
            darkMode ? 'bg-neutral-800 border border-amber-400/30' : 'bg-stone-200 border border-black/10'
          }`}
          aria-label="Toggle visual layout theme"
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`w-6 h-6 rounded-full flex items-center justify-center shadow-md ${
              darkMode ? 'bg-amber-400 text-neutral-900 ml-auto' : 'bg-white text-black'
            }`}
          >
            {darkMode ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
          </motion.div>
        </button>

        <button
          onClick={onLoginClick}
          className={`relative px-5 py-2 border-[1.5px] rounded-md font-bold text-sm tracking-wide transition-all duration-300 focus:outline-none ${
            darkMode 
              ? 'border-amber-400 text-amber-400 bg-neutral-900 hover:bg-neutral-800/80 active:translate-y-0.5' 
              : 'border-black text-black bg-white hover:bg-neutral-50 active:translate-y-0.5'
          }`}
        >
          Login/Register
        </button>
      </div>
    </nav>
  );
}

import React, { useState, useEffect } from 'react';
import { 
  ArrowUp, 
  ArrowDown, 
  ShieldCheck, 
  Clock, 
  Check, 
  Cpu, 
  Layers, 
  Coins, 
  FileCheck, 
  Lock, 
  Key, 
  CheckCircle,
  HelpCircle,
  TrendingUp,
  Workflow,
  Zap,
  DollarSign
} from 'lucide-react';
import CryptoCoinsGrid from './CryptoCoinsGrid';
import { motion, AnimatePresence } from 'motion/react';

interface HomeViewProps {
  setTab: (tab: string) => void;
  darkMode?: boolean;
  liveBalance?: number;
  liveTransactionList?: { id: string; coin: string; amount: string; status: string; val: string; address: string }[];
}

export default function HomeView({ 
  setTab, 
  darkMode = true,
  liveBalance: propLiveBalance,
  liveTransactionList: propLiveTransactionList
}: HomeViewProps) {
  // Live balance counter ticking up organically representing processing fee distributions
  const [liveBalance, setLiveBalance] = useState(39084.57);
  
  // Real-time active transaction simulation feed
  const [liveTransactionList, setLiveTransactionList] = useState([
    { id: 'tx-1', coin: 'BTC', amount: '0.45', status: 'Success', val: '$28,800', address: '0x3Fd9...1aF' },
    { id: 'tx-2', coin: 'ETH', amount: '1.24', status: 'Success', val: '$3,968', address: '0x7E1A...0Ff' },
    { id: 'tx-3', coin: 'SOL', amount: '15.00', status: 'Processing', val: '$2,250', address: '0x8CA2...9c3b' }
  ]);

  const [chartPoints, setChartPoints] = useState<{ label: string; value: number }[]>([]);

  useEffect(() => {
    if (propLiveBalance !== undefined) {
      setLiveBalance(propLiveBalance);
    }
  }, [propLiveBalance]);

  useEffect(() => {
    if (propLiveTransactionList !== undefined) {
      setLiveTransactionList(propLiveTransactionList);
    }
  }, [propLiveTransactionList]);

  // Generate beautiful initial historical trend values matching total solvency
  useEffect(() => {
    const now = new Date();
    const mockPoints = [];
    for (let i = 7; i >= 0; i--) {
      const timeStr = new Date(now.getTime() - i * 3600 * 1000).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
      mockPoints.push({
        label: timeStr,
        value: Math.floor(liveBalance - (i * 120) + (Math.random() * 80 - 40))
      });
    }
    mockPoints[mockPoints.length - 1].value = liveBalance;
    setChartPoints(mockPoints);
  }, []);

  // Gracefully synchronizes the latest tick point on the chart
  useEffect(() => {
    setChartPoints(prev => {
      if (prev.length === 0) return prev;
      const updated = [...prev];
      updated[updated.length - 1].value = Math.round(liveBalance);
      return updated;
    });
  }, [liveBalance]);

  // Interactive Escrow Simulator Steps
  const [activeStage, setActiveStage] = useState<'lock' | 'consensus' | 'release'>('lock');
  const [simulatedLog, setSimulatedLog] = useState<string[]>([
    "System awaiting action. Select a contract pipeline stage..."
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  // Micro-ticker for the balance
  useEffect(() => {
    const balanceInterval = setInterval(() => {
      setLiveBalance(prev => prev + 0.03);
    }, 4500);

    return () => clearInterval(balanceInterval);
  }, []);

  // Update simulator workflow text dynamically with spring timings
  useEffect(() => {
    let timers: any[] = [];
    if (activeStage === 'lock') {
      setSimulatedLog([
        "[INITIAL] Secured lock contract draft compiled with standard 256-bit AES signature.",
        "[ESCROW] 100% of client principal assets locked securely. Awaiting validator validation."
      ]);
    } else if (activeStage === 'consensus') {
      setIsSimulating(true);
      setSimulatedLog(["[ORACLE] Launching autonomous static analysis checks..."]);
      
      timers.push(setTimeout(() => {
        setSimulatedLog(prev => [...prev, "[CONSENSUS] Slither scanner verifies zero re-entrancy vectors."]);
      }, 1000));
      
      timers.push(setTimeout(() => {
        setSimulatedLog(prev => [...prev, "[SUCCESS] Multi-sig threshold met (2/2 keys successfully verified). Checksum: 0x9a8C"]);
        setIsSimulating(false);
      }, 2400));
    } else {
      setSimulatedLog([
        "[RELEASE] Consensus verified. Smart contract state changed dynamically to Unlocked.",
        "[PAYOUT] Assets transferred onto developer wallet. Blockchain confirmation: SOLANA L1."
      ]);
    }

    return () => timers.forEach(t => clearTimeout(t));
  }, [activeStage]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-6 pt-1 pb-16 select-none overflow-x-hidden">
      
      {/* Decorative High-End Ambient Studio Lighting (Cinematic Glows) */}
      <div className="absolute inset-x-0 top-0 h-96 pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-0 left-1/3 w-[500px] h-[550px] rounded-full blur-[140px] opacity-10 transition-colors duration-1000 ${
          darkMode ? 'bg-amber-400' : 'bg-amber-100'
        }`} />
        <div className={`absolute top-20 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] opacity-15 transition-colors duration-1000 ${
          darkMode ? 'bg-amber-500' : 'bg-stone-200'
        }`} />
      </div>

      {/* Main Grid: Left Typographic Hero and Right Visual Interactive Group */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center lg:items-start pt-4">
        
        {/* LEFT COLUMN - Premium Clear Typography with Balanced negative spacing */}
        <div className="lg:col-span-5 flex flex-col pt-4 lg:pt-16 text-left relative z-10">
          
          {/* Animated Category status bar */}
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`flex items-center gap-2 mb-4 w-fit px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase border ${
              darkMode 
                ? 'bg-amber-400/10 text-amber-300 border-amber-400/20 shadow-[0_0_12px_rgba(251,191,36,0.1)]' 
                : 'bg-neutral-900/5 text-neutral-800 border-neutral-950/10'
            }`}
          >
            <div className={`w-1.5 h-1.5 rounded-full animate-pulse mr-0.5 ${darkMode ? 'bg-amber-400' : 'bg-black'}`} />
            <span>FINTECH SECURITY ARCHITECTURE LEVEL 1</span>
          </motion.div>

          {/* Main Hero Title - Big bold luxury typography */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className={`font-sans font-extrabold leading-[1.08] tracking-tight mb-5 text-4xl sm:text-5xl lg:text-[48px] transition-colors duration-500 ${
              darkMode ? 'text-white' : 'text-[#111111]'
            }`}
          >
            Secure Crypto<br />
            Escrow For<br />
            <span className={`bg-gradient-to-r ${darkMode ? 'from-amber-400 via-amber-300 to-white' : 'from-black to-neutral-700'} bg-clip-text text-transparent`}>
              Freelancers & Clients
            </span>
          </motion.h1>

          {/* Compact subtitle paragraph */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`font-sans leading-relaxed mb-8 max-w-[420px] text-xs sm:text-[14px] transition-colors duration-500 ${
              darkMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}
          >
            Post jobs, fund secure escrow vaults, release payout milestones, and settle disputes effortlessly—all backed by multi-signature safety oracles.
          </motion.p>

          {/* Interactive CTA Buttons with the exact blueprint double outline and dots details */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex items-center gap-6"
          >
            <div className="relative group">
              {/* Outer soft dynamic glow on hover */}
              <div className="absolute inset-0 bg-amber-400 rounded-lg blur opacity-15 group-hover:opacity-35 transition-opacity" />
              
              {/* Offset raw blueprint framework wire box */}
              <div className={`absolute inset-0 translate-x-[3px] translate-y-[5px] border rounded pointer-events-none transition-colors duration-500 ${
                darkMode ? 'border-amber-400/40' : 'border-black/40'
              }`}>
                <div className={`absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-amber-400' : 'bg-black'}`} />
                <div className={`absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full ${darkMode ? 'bg-amber-400' : 'bg-black'}`} />
              </div>

              <button
                onClick={() => setTab('jobs')}
                className={`relative px-6 py-2.5 font-bold text-xs rounded transition-all focus:outline-none cursor-pointer ${
                  darkMode 
                    ? 'bg-amber-400 text-neutral-950 font-black hover:bg-amber-300 border border-amber-400' 
                    : 'bg-white text-black border border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)] active:translate-x-[0.5px]'
                }`}
              >
                Get started
              </button>
            </div>

            {/* Learn More link next to it */}
            <button
              onClick={() => setTab('about')}
              className={`flex items-center gap-1.5 font-bold text-xs transition-colors duration-300 focus:outline-none cursor-pointer group py-2 ${
                darkMode ? 'text-neutral-300 hover:text-white' : 'text-neutral-800 hover:text-black'
              }`}
            >
              <span>Learn more</span>
              <span className="transform group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-150 font-mono text-xs">
                ↗
              </span>
            </button>
          </motion.div>

          {/* Minimal Trust Indicator Line */}
          <div className="mt-12 select-none">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#737373]">SOLVENCY GUARANTEE</span>
            <div className="flex items-center gap-6 mt-2">
              <div className="flex flex-col">
                <span className={`text-sm font-bold font-mono tracking-tight transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`}>100% Reserve</span>
                <span className="text-[9px] font-mono text-neutral-500">Non-Rehypothecated</span>
              </div>
              <div className="w-[1px] h-6 bg-neutral-800" />
              <div className="flex flex-col">
                <span className={`text-sm font-bold font-mono tracking-tight transition-colors duration-500 ${darkMode ? 'text-white' : 'text-black'}`}>7+ Networks</span>
                <span className="text-[9px] font-mono text-neutral-500">Multichain Safe Escrow</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT VISUAL COLUMN - Compact Interactive Cards & Floating Coins */}
        <div className="lg:col-span-7 flex flex-col relative pt-4 z-10">
          
          {/* COMPACT SAAS DASHBOARD BROWSER WINDOW - Luxurious glass layer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className={`w-full border rounded-lg overflow-hidden flex select-none pb-3 relative transition-all duration-500 ${
              darkMode 
                ? 'bg-neutral-900/80 border-neutral-800/80 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md' 
                : 'bg-[#fdfdfd] border-black shadow-lg'
            }`}
          >
            
            {/* Sidebar Columns (Left thin divider mockup layout) */}
            <div className={`w-12 shrink-0 border-r flex flex-col items-center pt-3.5 gap-5 transition-colors duration-500 ${
              darkMode ? 'border-neutral-800 bg-neutral-950/40' : 'border-black/10 bg-neutral-50/50'
            }`}>
              
              {/* Three action dots */}
              <div className="flex flex-col gap-1 items-center justify-center mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-400 border border-black/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 border border-black/10" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 border border-black/10" />
              </div>

              {/* Sidebar Active items and beautiful triggers */}
              <div className={`w-8 h-8 rounded flex items-center justify-center border transition-colors ${
                darkMode ? 'border-amber-400/20 bg-amber-400/5 text-amber-400' : 'border-black/5 bg-amber-500/10 text-amber-950'
              }`}>
                <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>

              <div className="w-7 h-7 rounded flex items-center justify-center text-neutral-500 hover:text-white transition-colors cursor-pointer">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
              </div>

              <div className="w-7 h-7 rounded flex items-center justify-center text-neutral-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3m0 14v3M2 12h3m14 0h3" />
                </svg>
              </div>
              
            </div>

            {/* Main Content Area in Browser mockup */}
            <div className="flex-1 p-4 flex flex-col gap-4">
              
              {/* Browser Header details containing URL */}
              <div className={`flex items-center justify-between border-b pb-2 transition-colors duration-500 ${
                darkMode ? 'border-neutral-800' : 'border-black/5'
              }`}>
                {/* Simulated high-fidelity address bar */}
                <div className={`px-2.5 py-0.5 rounded text-[10px] font-mono leading-none tracking-tight flex items-center gap-1.5 border ${
                  darkMode ? 'bg-neutral-950/60 border-neutral-800 text-neutral-400' : 'bg-neutral-50 border-black/5 text-neutral-500'
                }`}>
                  <span className="text-emerald-500 font-extrabold">● SECURE</span>
                  <span>app.aicryptopay.com/vault-0x1b</span>
                </div>

                <div className="relative">
                  <div className={`w-7 h-7 rounded flex items-center justify-center border transition-colors ${
                    darkMode ? 'bg-neutral-950/40 border-neutral-800' : 'bg-[#fffefb] border-black/10'
                  }`}>
                    <svg viewBox="0 0 24 24" className={`w-3.5 h-3.5 ${darkMode ? 'text-amber-400' : 'text-neutral-700'}`} fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                      <path d="M14 2v6h6" />
                    </svg>
                  </div>
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full animate-ping" />
                </div>
              </div>

              {/* Balance Header with live countup ticker and beautiful layout */}
              <div className="flex items-center gap-4 py-1.5">
                {/* NFT Styled Profile Avatar with luxury color */}
                <div className={`w-11 h-11 rounded border overflow-hidden flex items-center justify-center shadow-lg shrink-0 transition-colors ${
                  darkMode ? 'border-amber-400/40 bg-neutral-950' : 'border-black bg-[#EED884]'
                }`}>
                  <svg viewBox="0 0 100 100" className="w-9 h-9 text-neutral-800">
                    <path d="M 25,65 C 20,40 40,20 60,20 C 80,20 85,45 80,65 C 75,80 65,85 55,85 C 45,85 30,80 25,65 Z" fill="#b45309" stroke="black" strokeWidth="3" />
                    <path d="M 33,40 Q 42,35 50,42 Q 58,35 67,40" stroke="black" strokeWidth="6" fill="none" strokeLinecap="round" />
                    <rect x="32" y="42" width="12" height="10" rx="2" fill="black" />
                    <rect x="53" y="42" width="12" height="10" rx="2" fill="black" />
                    <path d="M 40,68 C 45,71 55,71 60,68" stroke="black" strokeWidth="3" fill="none" strokeLinecap="round" />
                    <circle cx="21" cy="50" r="6" fill="#b45309" stroke="black" strokeWidth="2" />
                    <circle cx="81" cy="50" r="6" fill="#b45309" stroke="black" strokeWidth="2" />
                    <circle cx="21" cy="50" r="2" fill="#EED884" />
                    <circle cx="81" cy="50" r="2" fill="#EED884" />
                    <path d="M 32,23 C 35,16 65,16 68,23 Z" fill="#fbbf24" stroke="black" strokeWidth="2" />
                  </svg>
                </div>
                
                {/* Balance texts aligning */}
                <div className="flex flex-col">
                  {/* High Quality Live Ticking Balance */}
                  <h2 className={`font-sans font-black text-2xl sm:text-3xl tracking-tight leading-none mb-0.5 transition-colors ${
                    darkMode ? 'text-white' : 'text-black'
                  }`}>
                    ${liveBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </h2>
                  <div className="text-[10px] text-neutral-400 font-mono flex items-center gap-1.5">
                    <span>= 1.16684 btc</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span className="text-emerald-500 font-bold tracking-tight">Active Escrow Flows (fees)</span>
                  </div>
                </div>
              </div>

              {/* Action buttons deposit and send horizontally + See all */}
              <div className={`flex items-center justify-between border-t pt-2 transition-colors duration-500 ${
                darkMode ? 'border-neutral-800' : 'border-black/5'
              }`}>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setTab('jobs')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#105c42] hover:bg-[#072d20] text-white font-mono font-bold text-[10px] rounded border border-[#0d3f2d] focus:outline-none transition-transform active:translate-y-0.5 shadow-md cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5 text-emerald-300" />
                    <span>Send Assets</span>
                  </button>
                  <button
                    onClick={() => setTab('jobs')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 font-mono font-bold text-[10px] rounded focus:outline-none transition-all active:translate-y-0.5 cursor-pointer ${
                      darkMode 
                        ? 'bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 text-white' 
                        : 'bg-white hover:bg-neutral-50 border border-black text-black shadow-sm'
                    }`}
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                    <span>Deposit Token</span>
                  </button>
                </div>

                <button 
                  onClick={() => setTab('jobs')} 
                  className={`text-xs font-mono font-bold hover:underline flex items-center gap-1 cursor-pointer ${
                    darkMode ? 'text-amber-400' : 'text-neutral-800'
                  }`}
                >
                  <span>See all vaults</span>
                  <span>➔</span>
                </button>
              </div>

              {/* Transactions List organized dynamically */}
              <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 border-t pt-3.5 transition-colors duration-500 w-full ${
                darkMode ? 'border-neutral-800' : 'border-black/5'
              }`}>
                
                {/* Bitcoin Col */}
                <div className="flex flex-col">
                  <div className="text-[10px] font-mono uppercase text-neutral-500 mb-1.5 tracking-wider font-bold text-left">
                    24 Jun 2026
                  </div>
                  <div className={`flex items-center justify-between p-2.5 border rounded shadow-md transition-all ${
                    darkMode ? 'border-neutral-800 bg-neutral-950/55' : 'border-black bg-white shadow-[1px_1px_0px_rgba(0,0,0,1)]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className="w-7.5 h-7.5 rounded bg-[#F7931A]/10 border border-[#F7931A]/30 flex items-center justify-center font-bold text-[#F7931A] text-sm shrink-0 select-none">
                        ₿
                      </div>
                      <div className="text-left">
                        <div className={`font-bold text-[11px] leading-none mb-0.5 ${darkMode ? 'text-white' : 'text-neutral-800'}`}>Bitcoin</div>
                        <div className="text-[9px] font-mono text-emerald-600 font-semibold flex items-center gap-0.5">
                          <Check className="w-2.5 h-2.5 text-emerald-500" />
                          <span>Successful</span>
                        </div>
                      </div>
                    </div>
                    <div className={`text-right font-mono text-xs font-bold shrink-0 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                      1.2 ETH
                    </div>
                  </div>
                </div>

                {/* Ethereum Col */}
                <div className="flex flex-col">
                  <div className="text-[10px] font-mono uppercase text-neutral-500 mb-1.5 tracking-wider font-bold text-left">
                    23 Jun 2026
                  </div>
                  <div className={`flex items-center justify-between p-2.5 border rounded shadow-md transition-all ${
                    darkMode ? 'border-neutral-800 bg-neutral-950/55' : 'border-black bg-white shadow-[1px_1px_0px_rgba(0,0,0,1)]'
                  }`}>
                    <div className="flex items-center gap-2">
                      <div className="w-7.5 h-7.5 rounded bg-indigo-50/10 border border-indigo-400/30 flex items-center justify-center shrink-0 select-none">
                        <svg viewBox="0 0 100 100" className="w-2.5 h-3.5 text-[#627EEA]" fill="currentColor">
                          <path d="M50 0 L15 50 L50 72 L85 50 Z" />
                          <path d="M50 100 L15 61 L50 72 L85 61 Z" opacity="0.6" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className={`font-bold text-[11px] leading-none mb-0.5 ${darkMode ? 'text-white' : 'text-neutral-800'}`}>Ethereum</div>
                        <div className="text-[9px] font-mono flex items-center gap-0.5 font-semibold text-amber-500">
                          <Clock className="w-2.5 h-2.5 text-amber-500 animate-spin" />
                          <span>Processing</span>
                        </div>
                      </div>
                    </div>
                    <div className={`text-right font-mono text-xs font-bold shrink-0 ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                      0.8 BTC
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </motion.div>

          {/* LOWER SECTION: ROW WITH COINS FEED & YELLOW QR CARD */}
          <div className="grid grid-cols-12 gap-4 items-center mt-4 z-10 w-full">
            
            {/* Left Col: Bitcoin/Ethereum/Multi-chain Cloud grid */}
            <div className="col-span-12 sm:col-span-7 flex flex-col justify-center items-center">
              <CryptoCoinsGrid />
            </div>

            {/* Right Col: Highly Realistic QR Payment Card */}
            <div className="col-span-12 sm:col-span-5 flex justify-center sm:justify-end">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className={`w-full max-w-[180px] p-3 rounded border flex flex-col gap-2 relative overflow-hidden select-none shadow-xl transition-all duration-500 ${
                  darkMode 
                    ? 'bg-neutral-900 border-neutral-850 text-white' 
                    : 'bg-[#EED884] border-black text-black shadow-md'
                }`}
              >
                <div className="text-center">
                  <span className={`font-mono font-bold text-[9px] uppercase tracking-wider ${darkMode ? 'text-amber-400' : 'text-neutral-900'}`}>
                    Scan wallet address
                  </span>
                </div>

                {/* SVG QR Code */}
                <div className={`w-full aspect-square border rounded p-1.5 flex items-center justify-center relative shadow-sm transition-colors ${
                  darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-[#fffefb] border-black'
                }`}>
                  <svg viewBox="0 0 100 100" className={`w-full h-full ${darkMode ? 'text-amber-400' : 'text-black'}`} fill="currentColor">
                    <rect x="5" y="5" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="5.5" />
                    <rect x="11" y="11" width="10" height="10" />
                    
                    <rect x="73" y="5" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="5.5" />
                    <rect x="79" y="11" width="10" height="10" />
                    
                    <rect x="5" y="73" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="5.5" />
                    <rect x="11" y="79" width="10" height="10" />

                    <rect x="34" y="8" width="5" height="10" />
                    <rect x="44" y="5" width="10" height="5" />
                    <rect x="42" y="16" width="16" height="5" />
                    <rect x="34" y="25" width="25" height="4" />
                    
                    <rect x="8" y="34" width="20" height="4" />
                    <rect x="14" y="42" width="7" height="10" />
                    <rect x="5" y="58" width="10" height="5" />

                    <rect x="34" y="34" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4.5" />
                    <circle cx="46.5" cy="46.5" r="3.5" />
                    
                    <rect x="73" y="34" width="15" height="15" />
                    <rect x="80" y="53" width="8" height="8" />
                    <rect x="68" y="58" width="10" height="5" />
                    
                    <rect x="34" y="68" width="15" height="5" />
                    <rect x="38" y="78" width="10" height="10" />
                    <rect x="53" y="73" width="12" height="18" />
                    <rect x="72" y="72" width="18" height="14" />
                    
                    <rect x="61" y="5" width="3" height="3" />
                    <rect x="64" y="14" width="3" height="3" />
                    <rect x="22" y="56" width="4" height="4" />
                  </svg>
                </div>
              </motion.div>
            </div>

          </div>

          {/* LOWER ALIGNED CTA AND COMPONENT FRAMEWORK LINES */}
          <div className="flex items-center justify-between mt-5 w-full relative z-20">
            {/* Build your dream project simple rect button */}
            <motion.button
              onClick={() => setTab('jobs')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`px-5 py-2.5 font-extrabold text-xs rounded border transition-all text-center cursor-pointer ${
                darkMode
                  ? 'bg-amber-400 text-neutral-950 border-amber-400 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]'
                  : 'bg-[#EED884] text-black border-black shadow-[1.5px_1.5px_0px_rgba(0,0,0,1)]'
              }`}
            >
              Build your dream project
            </motion.button>

            {/* Blueprint Schema lines under the QR code on the right with black dots */}
            <div className="flex-1 flex justify-end relative h-10">
              <div className="absolute top-[40%] right-6 w-1/2 h-[1.5px] bg-neutral-700/40 flex items-center justify-start max-w-[120px]">
                <div className="w-[85%] h-[1.5px] bg-neutral-700/40 relative">
                  <div className={`absolute left-[35%] -top-[3.5px] w-2.5 h-[9px] border-l border-r ${darkMode ? 'bg-amber-400 border-amber-400' : 'bg-black border-black'}`} />
                  <div className={`absolute right-[15%] -top-[3.5px] w-2.5 h-[9px] border-l border-r ${darkMode ? 'bg-amber-400 border-amber-400' : 'bg-black border-black'}`} />
                </div>
                <div className="w-[1.5px] h-6 bg-neutral-700/40 absolute right-0 top-0" />
                <div className={`w-1.5 h-1.5 rounded-full absolute right-[-2.5px] top-6 ${darkMode ? 'bg-amber-400' : 'bg-black'}`} />
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* UNFORGETTABLE CINEMATIC SECTION: THE SMART CODES ESCROW CONSENSUS PIPELINE */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`mt-24 p-6 sm:p-8 rounded-xl border relative overflow-hidden transition-all duration-500 ${
          darkMode 
            ? 'bg-neutral-900/60 border-neutral-800' 
            : 'bg-white border-black shadow-xl'
        }`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/5 blur-[50px] rounded-full pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800/60">
          <div>
            <span className={`text-[10px] font-mono tracking-widest uppercase font-bold block mb-1.5 ${darkMode ? 'text-amber-400' : 'text-neutral-500'}`}>
              INTERACTIVE CONSTRUCT STATIONS
            </span>
            <h3 className={`font-display font-extrabold text-2xl tracking-tight transition-colors ${darkMode ? 'text-white' : 'text-black'}`}>
              The Escrow Consensus Pipeline
            </h3>
            <p className={`text-xs mt-1 max-w-xl leading-relaxed ${darkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Click on each structural milestone to simulate active deposits undergoing security validation scanner checks before unlocking securely on-chain.
            </p>
          </div>

          {/* Controls to toggle steps */}
          <div className="flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveStage('lock')}
              className={`px-4 py-2 rounded font-mono text-xs font-bold border transition-all cursor-pointer ${
                activeStage === 'lock'
                  ? (darkMode ? 'bg-amber-400 text-neutral-900 border-amber-400 font-extrabold shadow-[0_0_15px_rgba(251,191,36,0.25)]' : 'bg-black text-white border-black')
                  : (darkMode ? 'bg-neutral-800/50 border-neutral-700/60 text-neutral-400 hover:text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-600')
              }`}
            >
              01/ Principal Secured Lock
            </button>
            <button
              onClick={() => setActiveStage('consensus')}
              className={`px-4 py-2 rounded font-mono text-xs font-bold border transition-all cursor-pointer ${
                activeStage === 'consensus'
                  ? (darkMode ? 'bg-amber-400 text-neutral-900 border-amber-400 font-extrabold shadow-[0_0_15px_rgba(251,191,36,0.25)]' : 'bg-black text-white border-black')
                  : (darkMode ? 'bg-neutral-800/50 border-neutral-700/60 text-neutral-400 hover:text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-600')
              }`}
            >
              02/ Validator Consensus
            </button>
            <button
              onClick={() => setActiveStage('release')}
              className={`px-4 py-2 rounded font-mono text-xs font-bold border transition-all cursor-pointer ${
                activeStage === 'release'
                  ? (darkMode ? 'bg-amber-400 text-neutral-900 border-amber-400 font-extrabold shadow-[0_0_15px_rgba(251,191,36,0.25)]' : 'bg-black text-white border-black')
                  : (darkMode ? 'bg-neutral-800/50 border-neutral-700/60 text-neutral-400 hover:text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-600')
              }`}
            >
              03/ Peer-to-Peer Payout
            </button>
          </div>
        </div>

        {/* Visual pipeline dynamic workflow representation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
          
          {/* Diagnostic Console Box */}
          <div className="lg:col-span-7">
            <div className={`p-4 rounded-lg font-mono text-xs border text-left flex flex-col gap-2 min-h-[170px] select-all relative overflow-hidden ${
              darkMode ? 'bg-neutral-950 border-neutral-800/80' : 'bg-neutral-50 border-black/10'
            }`}>
              {/* Terminal Title Bar */}
              <div className="flex items-center justify-between opacity-50 border-b border-neutral-800/30 pb-2 mb-1">
                <span className="text-[10px] tracking-tight text-neutral-400 font-bold uppercase flex items-center gap-1">
                  <span>ORACLE_CONSOLE_DIAGNOSTIC</span>
                </span>
                <span>UTC // STABLE_READY</span>
              </div>

              {/* Dynamic Console Logs */}
              <div className="flex-1 space-y-2">
                {simulatedLog.map((logLine, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`leading-relaxed tracking-tight ${
                      logLine.includes('[SUCCESS]') || logLine.includes('[PAYOUT]') 
                        ? 'text-emerald-400 font-bold' 
                        : logLine.includes('[INITIAL]') || logLine.includes('[ORACLE]') 
                        ? 'text-amber-400 font-bold' 
                        : 'text-neutral-300'
                    }`}
                  >
                    {logLine}
                  </motion.div>
                ))}
                
                {isSimulating && (
                  <div className="flex items-center gap-2 text-neutral-400 mt-2 italic animate-pulse">
                    <span>* Evaluating contract integrity... awaiting block signatures</span>
                  </div>
                )}
              </div>

              <div className="absolute bottom-2 right-3 font-bold opacity-35 text-[9px] tracking-wide">
                100% SECURE BLUEPRINT
              </div>
            </div>
          </div>

          {/* High Fidelity Visual Mapping Node Layout */}
          <div className="lg:col-span-5 flex flex-col justify-center items-center">
            
            <div className={`w-full max-w-sm rounded-xl p-5 border shadow-inner flex flex-col gap-6 relative ${
              darkMode ? 'bg-[#000000]/40 border-neutral-800/60' : 'bg-[#fffefb] border-black/10'
            }`}>
              
              <div className="flex items-center justify-between border-b border-neutral-800/15 pb-3">
                <span className="text-[11px] font-mono text-neutral-400 uppercase font-black tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-amber-500" />
                  <span>CONSENSUS GRAPH LEVEL</span>
                </span>
                <span className="text-[10px] font-mono bg-[#10b981]/15 text-[#10b981] px-2 py-0.5 rounded border border-[#10b981]/20 font-bold">
                  SOLVENT
                </span>
              </div>

              {/* Steps graphic track */}
              <div className="flex justify-between items-center relative py-4 px-4">
                {/* Horizontal flow line indicator */}
                <div className="absolute left-[15%] right-[15%] top-1/2 -translate-y-1/2 h-[2px] bg-neutral-850 z-0">
                  <motion.div
                    className="h-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,1)]"
                    animate={{
                      width: activeStage === 'lock' ? '33%' : activeStage === 'consensus' ? '66%' : '100%'
                    }}
                    transition={{ duration: 0.6 }}
                  />
                </div>

                {/* Step 1 Node */}
                <div className="z-10 flex flex-col items-center">
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border-2 transition-all ${
                    activeStage === 'lock' 
                      ? 'bg-amber-400 border-amber-400 text-neutral-900 shadow-[0_0_12px_rgba(251,191,36,0.5)]' 
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                  }`}>
                    <Lock className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold mt-2 text-neutral-400">Lock Asset</span>
                </div>

                {/* Step 2 Node */}
                <div className="z-10 flex flex-col items-center">
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border-2 transition-all ${
                    activeStage === 'consensus' 
                      ? 'bg-amber-400 border-amber-400 text-neutral-900 shadow-[0_0_12px_rgba(251,191,36,0.5)]' 
                      : (activeStage === 'release' ? 'bg-emerald-500 border-emerald-500 text-black' : 'bg-neutral-900 border-neutral-800 text-neutral-400')
                  }`}>
                    <Cpu className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold mt-2 text-neutral-400">Validator</span>
                </div>

                {/* Step 3 Node */}
                <div className="z-10 flex flex-col items-center">
                  <div className={`w-8.5 h-8.5 rounded-full flex items-center justify-center border-2 transition-all ${
                    activeStage === 'release' 
                      ? 'bg-amber-400 border-amber-400 text-neutral-900 shadow-[0_0_12px_rgba(251,191,36,0.5)]' 
                      : 'bg-neutral-900 border-neutral-800 text-neutral-400'
                  }`}>
                    <CheckCircle className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-[9px] font-mono font-bold mt-2 text-neutral-400">Unlock P2P</span>
                </div>

              </div>

            </div>

          </div>

        </div>

      </motion.div>

    </div>
  );
}

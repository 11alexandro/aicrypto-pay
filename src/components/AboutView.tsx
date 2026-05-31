import { motion } from 'motion/react';
import { 
  ShieldCheck, 
  ArrowRight, 
  Wallet, 
  Hammer, 
  FileCheck, 
  Coins, 
  Lock 
} from 'lucide-react';

interface AboutViewProps {
  darkMode?: boolean;
}

export default function AboutView({ darkMode = true }: AboutViewProps) {
  
  const steps = [
    {
      num: '01',
      title: 'Deploy Contract Agreement',
      desc: 'The client and freelancer settle on contract specifications, budget, and milestone payment schedules, drafting the contract blueprint.',
      icon: Hammer,
    },
    {
      num: '02',
      title: 'Lock Asset In Smart Custody',
      desc: 'The client initiates safety checks and signs the transaction, locking 100% of the funds in the secure smart escrow contract custody.',
      icon: Lock,
    },
    {
      num: '03',
      title: 'Complete Work Milestones',
      desc: 'The developer securely runs, logs test outcomes, and drops final commits onto code repositories. Clients inspect active outcomes live.',
      icon: FileCheck,
    },
    {
      num: '04',
      title: 'Multisig Payout Release',
      desc: 'Both Client and Developer verify the milestone. The smart contract triggers and transfers raw tokens into the developer’s wallet directly.',
      icon: Coins,
    }
  ];

  const highlights = [
    {
      title: 'Solvency Verification Oracles',
      value: '100% Solvent',
      desc: 'Deposits are isolated inside unique cold contracts. No re-keying, borrowing, or yield farming, ensuring absolute insolvency-proof security.',
    },
    {
      title: 'Arbitration Resolution SLA',
      value: 'Instant SLA',
      desc: 'If discrepancies arise, our AI Dispute Oracle analyzes repository submissions, chat logs, and signed blueprints to offer consensus payouts.',
    },
    {
      title: 'Multi-Chain Multi-Sig Protocol',
      value: '7+ Networks',
      desc: 'Deploy native escrows in Bitcoin, Ethereum, Solana, Binance, XRP, and stablecoins. Settle with minimal network latency and gas.',
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 font-sans">
      
      {/* Page Heading banner */}
      <div className="text-center max-w-3xl mx-auto mb-16 select-none">
        <span className={`text-[10px] font-mono font-bold px-3 py-1 rounded-full uppercase tracking-widest inline-block mb-4 border ${
          darkMode ? 'bg-amber-400/10 text-amber-300 border-amber-400/20' : 'bg-neutral-900/5 text-neutral-800 border-neutral-950/10'
        }`}>
           THE PROTOCOL STANDARD
        </span>
        <h1 className={`font-sans font-black text-3xl md:text-5xl tracking-tight leading-tight mb-4 transition-colors ${
          darkMode ? 'text-white' : 'text-black'
        }`}>
          How AICRYPTO PAY Solves Web3 Solvency
        </h1>
        <p className={`text-xs sm:text-sm leading-relaxed max-w-2xl mx-auto ${
          darkMode ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          Traditional freelancing leaves payments at risk. Developers write code hoping for signature validation; clients risk deposit chargebacks. We resolve double-ended trust issues through automated lock contracts.
        </p>
      </div>

      {/* Visual Timeline Diagram */}
      <div className="mb-20">
        <div className="px-1 mb-8">
          <span className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest block">CONSENSUAL TRANSACTION WORKFLOW</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className={`p-6 rounded-lg border flex flex-col justify-between h-64 hover:translate-y-[-2px] transition-all relative group shadow-sm ${
                  darkMode 
                    ? 'bg-neutral-900/60 border-neutral-804/80 text-white' 
                    : 'bg-white border-black/10 text-black shadow-md'
                }`}
              >
                <div>
                  {/* Step Code Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`font-mono text-3xl font-extrabold transition-colors ${
                      darkMode ? 'text-neutral-800 group-hover:text-amber-400' : 'text-neutral-100 group-hover:text-black'
                    }`}>
                      {step.num}
                    </span>
                    <div className={`w-9 h-9 rounded-full border flex items-center justify-center transition-all ${
                      darkMode ? 'border-neutral-800 bg-neutral-950 text-amber-400' : 'border-black bg-stone-50 text-black'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className={`font-sans font-bold text-sm md:text-base mb-2 leading-snug ${
                    darkMode ? 'text-white' : 'text-[#111]'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`text-[11px] leading-relaxed font-sans ${
                    darkMode ? 'text-neutral-400' : 'text-neutral-500'
                  }`}>
                    {step.desc}
                  </p>
                </div>

                {/* Arrow connector divider for md displays */}
                {idx < 3 && (
                  <div className={`absolute top-1/2 -right-3.5 -translate-y-1/2 z-20 hidden md:flex items-center justify-center p-1 rounded-full select-none shadow border transition-colors ${
                    darkMode ? 'bg-neutral-900 border-neutral-800 text-amber-400' : 'bg-white border-black/10 text-neutral-800'
                  }`}>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </motion.div>
            );
          })}

        </div>
      </div>

      {/* Bento Grid layout with structural benefits details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 select-none mb-12">
        
        {/* Left tall card highlighting safety */}
        <div className={`lg:col-span-4 p-7 border rounded-lg flex flex-col justify-between gap-12 relative overflow-hidden transition-colors duration-500 ${
          darkMode ? 'bg-neutral-900/40 border-neutral-800 text-white' : 'bg-black text-white border-black'
        }`}>
          {/* Subtle flare decor */}
          <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-amber-400/10 blur-[35px] rounded-full pointer-events-none" />
          
          <div className="flex flex-col gap-4">
            <span className="font-mono text-[10px] uppercase font-bold text-amber-400 tracking-wider">SOLVENCY ASSURANCE LEVEL</span>
            <div className={`w-11 h-11 rounded-lg border flex items-center justify-center ${
              darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-neutral-900 border-neutral-800'
            }`}>
              <ShieldCheck className="w-5.5 h-5.5 text-amber-400" />
            </div>

            <h3 className="font-sans font-extrabold text-lg sm:text-xl tracking-tight leading-snug">
              Multisignature Cold Custody Wallets
            </h3>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Every single dollar deposited is bound entirely by cryptography in cold multichain escrow contracts. Contracts cannot be edited or keys mutated post-creation. No central company possesses single custody control indicators, ensuring complete regulatory separation of capital.
            </p>
          </div>

          <div className="border-t border-neutral-800/80 pt-5">
            <div className="text-[10px] font-mono text-neutral-500">SECURED CODE INTEGRITIES:</div>
            <div className="font-mono text-[11px] font-bold text-emerald-400 mt-1 flex items-center gap-1">
              <span>Verified Audited Smart Escrows</span>
            </div>
          </div>
        </div>

        {/* Right column grouping three highlight categories */}
        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {highlights.map((item, idx) => (
            <div 
              key={idx}
              className={`p-6 border rounded-lg flex flex-col justify-between gap-6 hover:translate-y-[-2px] transition-all shadow-sm ${
                darkMode 
                  ? 'bg-neutral-900/60 border-neutral-840/80 text-white' 
                  : 'bg-white border-black/10 text-black shadow-md'
              } ${idx === 2 ? 'md:col-span-2' : ''}`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-mono font-bold ${darkMode ? 'text-amber-400' : 'text-neutral-500'}`}>{item.title}</span>
                  <span className={`font-mono text-[10px] font-bold px-2.5 py-0.5 rounded border ${
                    darkMode ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-neutral-900 text-white border-black'
                  }`}>
                    {item.value}
                  </span>
                </div>
                <p className={`text-xs leading-relaxed font-sans ${
                  darkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  {item.desc}
                </p>
              </div>

              <div className="text-[10px] font-mono text-neutral-500 font-bold tracking-tight">
                SLA RATIO: 100% STANDARDS VERIFIED
              </div>
            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

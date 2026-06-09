import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import HomeView from './components/HomeView';
import ExploreJobsView from './components/ExploreJobsView';
import JobDetailsView from './components/JobDetailsView';
import AboutView from './components/AboutView';
import { Job, Milestone } from './types';
import { ShieldCheck, Lock, CheckCircle2, X } from 'lucide-react';
import { socketService } from './services/socket';

export default function App() {
  const [currentTab, setTab] = useState<string>('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const hours = new Date().getHours();
    return hours < 6 || hours >= 18;
  });

  const [liveBalance, setLiveBalance] = useState<number>(39084.57);
  const [liveTransactionList, setLiveTransactionList] = useState([
    { id: 'tx-1', coin: 'BTC', amount: '0.45', status: 'Success', val: '$28,800', address: '0x3Fd9...1aF' },
    { id: 'tx-2', coin: 'ETH', amount: '1.24', status: 'Success', val: '$3,968', address: '0x7E1A...0Ff' },
    { id: 'tx-3', coin: 'SOL', amount: '15.00', status: 'Processing', val: '$2,250', address: '0x8CA2...9c3b' }
  ]);

  // Automatically adapt theme when active daytime hours shift
  React.useEffect(() => {
    const autoThemeChanger = () => {
      const hours = new Date().getHours();
      const isNight = hours < 6 || hours >= 18;
      setDarkMode(isNight);
    };

    autoThemeChanger();

    // Monitor local hour transitions every minute
    const intervalId = setInterval(autoThemeChanger, 60000);
    return () => clearInterval(intervalId);
  }, []);

  // High-fidelity dynamic network alerts queue
  const [notifications, setNotifications] = useState<{ id: string; text: string; hashHash?: string }[]>([]);

  // Hook up Socket.io connection and dynamic event sync mapping
  useEffect(() => {
    const socket = socketService.getSocket();

    socket.on("sync_state", (data: { solvencyTotal: number }) => {
      setLiveBalance(data.solvencyTotal);
    });

    socket.on("live_blockchain_activity", (data: { event: any; currentSolvencyTotal: number }) => {
      setLiveBalance(data.currentSolvencyTotal);
      
      // Keep transaction history limited to 6 elements
      setLiveTransactionList(prev => [
        {
          id: data.event.id,
          coin: data.event.coin,
          amount: data.event.amount,
          status: data.event.status,
          val: data.event.val,
          address: data.event.address
        },
        ...prev.slice(0, 5)
      ]);

      // Trigger high-fidelity user toast sync
      const newId = `alert-${Date.now()}`;
      setNotifications(prev => [
        ...prev,
        { id: newId, text: data.event.text, hashHash: data.event.address }
      ]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== newId));
      }, 5000);
    });

    // Handle standard multi-tab job addition broadcasts
    socket.on("job_added_broadcast", (newJob: Job) => {
      setJobs(prevJobs => {
        if (prevJobs.some(j => j.id === newJob.id)) return prevJobs;
        return [newJob, ...prevJobs];
      });
    });

    // Handle standard multi-tab milestone progress sync
    socket.on("milestone_update_broadcast", (data: { jobId: string; milestoneId: string; status: Milestone['status'] }) => {
      setJobs(prevJobs =>
        prevJobs.map((job) => {
          if (job.id !== data.jobId) return job;
          const updatedMilestones = job.milestones.map((m) =>
            m.id === data.milestoneId ? { ...m, status: data.status } : m
          );
          return { ...job, milestones: updatedMilestones };
        })
      );
    });

    return () => {
      socket.off("sync_state");
      socket.off("live_blockchain_activity");
      socket.off("job_added_broadcast");
      socket.off("milestone_update_broadcast");
    };
  }, []);

  // Fetch active web3 escrow jobs from backend
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setJobs(data);
          if (data.length > 0) setSelectedJobId(data[0].id);
        }
      })
      .catch(err => console.error("Failed to fetch jobs:", err));
  }, []);

  const [selectedJobId, setSelectedJobId] = useState<string>('job-1');

  // Add job handler
  const handleAddJob = (job: Job) => {
    setJobs([job, ...jobs]);
    setSelectedJobId(job.id);
  };

  // Modify job status
  const handleUpdateJobStatus = (id: string, status: Job['status']) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => (job.id === id ? { ...job, status } : job))
    );
  };

  // Modify specific milestone status
  const handleUpdateMilestoneStatus = (
    jobId: string,
    milestoneId: string,
    status: Milestone['status']
  ) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) => {
        if (job.id !== jobId) return job;
        const updatedMilestones = job.milestones.map((m) =>
          m.id === milestoneId ? { ...m, status } : m
        );
        return { ...job, milestones: updatedMilestones };
      })
    );
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail) return;
    setLoginSuccess(true);
    setTimeout(() => {
      setShowLoginModal(false);
      setLoginSuccess(false);
      setLoginEmail('');
    }, 1200);
  };

  return (
    <div className={`min-h-screen relative flex flex-col justify-between overflow-x-hidden font-sans antialiased transition-colors duration-500 ease-in-out ${
      darkMode ? 'bg-[#0b0c0a] text-neutral-200 selection:bg-amber-400 selection:text-black' : 'bg-[#f7f7f5] text-neutral-800'
    }`}>
      
      {/* Top Navbar */}
      <Navbar 
        currentTab={currentTab} 
        setTab={setTab} 
        onLoginClick={() => setShowLoginModal(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      {/* Main View Area with Framer Motion Layout animations */}
      <main className="flex-1 relative w-full z-10 flex flex-col px-1 sm:px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 flex flex-col justify-start"
          >
            {currentTab === 'home' && (
              <HomeView 
                setTab={setTab} 
                darkMode={darkMode} 
                liveBalance={liveBalance}
                liveTransactionList={liveTransactionList}
              />
            )}
            
            {currentTab === 'jobs' && (
              <ExploreJobsView
                jobs={jobs}
                onAddJob={handleAddJob}
                onUpdateJobStatus={handleUpdateJobStatus}
                setSelectedJobId={setSelectedJobId}
                setTab={setTab}
                darkMode={darkMode}
              />
            )}
            
            {currentTab === 'details' && (
              <JobDetailsView
                jobs={jobs}
                selectedJobId={selectedJobId}
                onUpdateJobStatus={handleUpdateJobStatus}
                onUpdateMilestoneStatus={handleUpdateMilestoneStatus}
                setSelectedJobId={setSelectedJobId}
                setTab={setTab}
                darkMode={darkMode}
              />
            )}

            {currentTab === 'about' && (
              <AboutView darkMode={darkMode} />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Global Minimal Footer */}
      <footer className={`border-t py-12 mt-16 transition-colors duration-500 font-sans relative z-10 select-none ${
        darkMode ? 'border-neutral-800 bg-neutral-950/40 text-neutral-500' : 'border-black/10 bg-stone-50 text-neutral-500'
      }`}>
        <div className="max-w-7xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className={`font-display font-medium tracking-normal transition-colors duration-300 ${darkMode ? 'text-white' : 'text-black'}`}>AICRYPTO PAY</span>
            <span className="text-neutral-500/40">|</span>
            <span>Multisig Escrow Protocol Standard</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#github" className={`transition-colors duration-150 ${darkMode ? 'hover:text-amber-400' : 'hover:text-black'}`}>Smartcontracts Audits</a>
            <a href="#policy" className={`transition-colors duration-150 ${darkMode ? 'hover:text-amber-400' : 'hover:text-black'}`}>L1 Dispute SLAs</a>
            <a href="#sec" className={`transition-colors duration-150 ${darkMode ? 'hover:text-amber-400' : 'hover:text-black'}`}>Cold Assets Vault</a>
          </div>

          <div className="text-center sm:text-right font-medium text-[10px] text-neutral-500/80">
            Powered by Decentralized Multi-sig Smart Escrows
          </div>
        </div>
      </footer>

      {/* Real-Time Live Broadcast Feed (Bottom-right screen area) */}
      <div className="fixed bottom-6 right-6 z-40 max-w-sm w-full pointer-events-none flex flex-col gap-3">
        <AnimatePresence>
          {notifications.map((notif) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 35, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className={`p-4 rounded-lg border shadow-xl flex items-start gap-3 pointer-events-auto select-none transition-colors duration-500 ${
                darkMode ? 'bg-neutral-900/95 border-amber-400/20 text-white' : 'bg-white text-black border-neutral-900/10'
              }`}
            >
              <div className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${darkMode ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-emerald-500'}`} />
              <div className="flex-1">
                <p className="text-[11px] leading-relaxed font-sans font-medium">{notif.text}</p>
                {notif.hashHash && (
                  <div className="mt-1 flex items-center gap-1">
                    <span className="font-mono text-[9px] text-[#fbbf24]/90 opacity-80">TX: {notif.hashHash}</span>
                    <span className="font-mono text-[8px] px-1 bg-neutral-800 text-neutral-400 rounded">SOLANA L1</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* LOGIN/REGISTER MODAL ELEMENT */}
      <AnimatePresence>
        {showLoginModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`border rounded-lg max-w-sm w-full overflow-hidden text-center select-none shadow-2xl transition-all ${
                darkMode ? 'bg-neutral-905 border-neutral-800 text-white' : 'bg-white border-black text-black'
              }`}
            >
              <div className={`p-5 border-b flex items-center justify-between ${
                darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-[#fcd34d] border-black text-black'
              }`}>
                <div className="flex items-center gap-2 font-display font-extrabold text-base">
                  <ShieldCheck className={`w-5 h-5 ${darkMode ? 'text-amber-400' : 'text-black'}`} />
                  <span>SIGN IN SECURE CONSOLE</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className={`p-1 rounded-md transition-colors ${darkMode ? 'hover:bg-white/10 text-neutral-400 hover:text-white' : 'hover:bg-black/10 text-black'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {loginSuccess ? (
                <div className="p-8 flex flex-col items-center justify-center gap-3">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center border ${
                    darkMode ? 'bg-amber-400/10 text-amber-400 border-amber-400/30' : 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  }`}>
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-extrabold text-lg">Signature Verified!</h3>
                  <p className="text-xs text-neutral-500 leading-relaxed font-mono">Consensual secure state loaded safely.</p>
                </div>
              ) : (
                <form onSubmit={handleLoginSubmit} className="p-6 flex flex-col gap-4 text-left">
                  <p className="text-xs leading-relaxed text-neutral-400">
                    Connect into the SaaS escrow workspace dynamically. Sign with your secure email identity or web3 credential wallet.
                  </p>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-neutral-500 tracking-wider uppercase mb-1.5">
                      EMAIL ADDRESS OR WEB3 DOMAIN
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. genesis-freelancer@ens.eth"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className={`w-full px-3 py-2 border text-sm rounded focus:outline-none transition-colors ${
                        darkMode ? 'bg-neutral-900 border-neutral-800 text-white focus:border-amber-400' : 'bg-white border-black text-black focus:border-neutral-500'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full mt-2 py-3 font-mono font-bold text-xs rounded border transition-all text-center ${
                      darkMode 
                        ? 'bg-amber-400 hover:bg-amber-500 text-neutral-950 border-amber-400 hover:shadow-[0_0_15px_rgba(251,191,36,0.35)]' 
                        : 'bg-black hover:bg-stone-850 text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)] active:scale-95'
                    }`}
                  >
                    Authenticate Terminal Identity
                  </button>

                  <div className="text-center mt-1">
                    <span className="text-[10px] font-mono text-neutral-500">
                      Or connect hardware wallet via Ledger® / Trezor®
                    </span>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

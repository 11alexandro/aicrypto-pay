import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Coins, PlusCircle, Search, BadgeCheck, FileCode, CheckCircle2, AlertCircle, X, ShieldAlert, Check } from 'lucide-react';
import { Job, Milestone } from '../types';
import { socketService } from '../services/socket';

interface ExploreJobsViewProps {
  jobs: Job[];
  onAddJob: (job: Job) => void;
  onUpdateJobStatus: (id: string, status: Job['status']) => void;
  setSelectedJobId: (id: string) => void;
  setTab: (tab: string) => void;
  darkMode?: boolean;
}

export default function ExploreJobsView({
  jobs,
  onAddJob,
  onUpdateJobStatus,
  setSelectedJobId,
  setTab,
  darkMode = true
}: ExploreJobsViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [fundingJob, setFundingJob] = useState<Job | null>(null);
  const [isFundingProcessing, setIsFundingProcessing] = useState(false);

  // New job form state
  const [newTitle, setNewTitle] = useState('');
  const [newClient, setNewClient] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newBudget, setNewBudget] = useState(2500);
  const [newToken, setNewToken] = useState<'BTC' | 'ETH' | 'USDT' | 'SOL'>('USDT');

  const categories = ['All', 'Solana', 'Ethereum', 'Bitcoin', 'Design', 'Auditing'];

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          job.client.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedCategory === 'All') return matchesSearch;
    if (selectedCategory === 'Solana' && job.escrowToken === 'SOL') return matchesSearch;
    if (selectedCategory === 'Ethereum' && job.escrowToken === 'ETH') return matchesSearch;
    if (selectedCategory === 'Bitcoin' && job.escrowToken === 'BTC') return matchesSearch;
    if (selectedCategory === 'Design' && job.title.toLowerCase().includes('wireframe')) return matchesSearch;
    if (selectedCategory === 'Auditing' && job.description.toLowerCase().includes('audit')) return matchesSearch;
    return matchesSearch;
  });

  const handleCreateJobSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newClient || !newDesc) return;

    // Standard rate conversion ratio
    let tokenAmount = 0;
    if (newToken === 'BTC') tokenAmount = parseFloat((newBudget / 64000).toFixed(4));
    else if (newToken === 'ETH') tokenAmount = parseFloat((newBudget / 3200).toFixed(3));
    else if (newToken === 'SOL') tokenAmount = parseFloat((newBudget / 150).toFixed(2));
    else tokenAmount = newBudget;

    const generatedJob: Job = {
      id: `job-${Date.now()}`,
      title: newTitle,
      client: newClient,
      freelancer: 'Pending Assignment',
      description: newDesc,
      escrowAmount: newBudget,
      escrowToken: newToken,
      tokenAmount: tokenAmount,
      status: 'Draft',
      createdAt: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      milestones: [
        {
          id: `m1-${Date.now()}`,
          title: 'Design approval & Contract Signature',
          amountPercent: 30,
          status: 'Pending',
          description: 'Initial structural design layout & specifications signed by both parties.'
        },
        {
          id: `m2-${Date.now()}`,
          title: 'Functional Alpha Build',
          amountPercent: 40,
          status: 'Pending',
          description: 'Deploy the application onto test subnet and implement critical modules.'
        },
        {
          id: `m3-${Date.now()}`,
          title: 'Post Audit Deliverable & Final Handover',
          amountPercent: 30,
          status: 'Pending',
          description: 'Deliver standard production build following security audit.'
        }
      ]
    };

    onAddJob(generatedJob);
    socketService.broadcastNewJob(generatedJob);
    setShowCreateModal(false);
    // Reset inputs
    setNewTitle('');
    setNewClient('');
    setNewDesc('');
    setNewBudget(2500);
  };

  const executeMockFunding = () => {
    if (!fundingJob) return;
    setIsFundingProcessing(true);
    setTimeout(() => {
      onUpdateJobStatus(fundingJob.id, 'Funded');
      setIsFundingProcessing(false);
      setFundingJob(null);
    }, 1800);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 font-sans">
      
      {/* Top section heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <span className={`text-[10px] font-mono font-bold tracking-widest uppercase block mb-1 ${
            darkMode ? 'text-amber-400' : 'text-[#d97706]'
          }`}>
             Freelance Workspace
          </span>
          <h1 className={`font-sans font-black text-3xl sm:text-4xl tracking-tight transition-colors ${
            darkMode ? 'text-white' : 'text-black'
          }`}>
            Escrow-backed Jobs
          </h1>
          <p className={`text-xs sm:text-sm mt-1 max-w-lg leading-relaxed ${
            darkMode ? 'text-neutral-400' : 'text-neutral-500'
          }`}>
            Clients deposit real assets into multi-signature smart contract escrows before you write a single line of code. Work with 100% solvency guarantee.
          </p>
        </div>

        {/* Post Job Button with custom outline/shadow properties */}
        <button
          onClick={() => setShowCreateModal(true)}
          className={`flex items-center gap-2 px-6 py-3 font-semibold text-xs transition-all tracking-wide focus:outline-none cursor-pointer rounded ${
            darkMode 
              ? 'bg-amber-400 hover:bg-amber-500 text-neutral-950 border border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]' 
              : 'bg-[#fcd34d] hover:bg-[#fbbf24] text-black border border-black shadow-[3px_3px_0px_rgba(0,0,0,1)]'
          }`}
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post New Job (Client)</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        
        {/* Search Input Box */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search by keyword, client or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full pl-10 pr-4 py-2.5 rounded border text-xs focus:outline-none transition-colors ${
              darkMode 
                ? 'bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-500 focus:border-amber-400' 
                : 'bg-white border-black text-black placeholder:text-neutral-400'
            }`}
          />
        </div>

        {/* Categories / Badges list */}
        <div className="flex flex-wrap gap-2 items-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? (darkMode ? 'bg-amber-400 text-neutral-950 border-amber-400 font-extrabold' : 'bg-black text-white border-black')
                  : (darkMode ? 'bg-neutral-850 text-neutral-400 border-neutral-800 hover:text-white' : 'bg-white text-neutral-600 border-neutral-200 hover:border-black')
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Jobs Listing grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => {
              const tokenColors = {
                BTC: darkMode ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-amber-50 text-amber-700 border-amber-300',
                ETH: darkMode ? 'bg-indigo-400/10 text-indigo-400 border-indigo-400/20' : 'bg-indigo-50 text-indigo-700 border-indigo-300',
                USDT: darkMode ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' : 'bg-emerald-50 text-emerald-700 border-emerald-300',
                SOL: darkMode ? 'bg-purple-400/10 text-purple-400 border-purple-400/20' : 'bg-purple-50 text-purple-700 border-purple-300',
              };

              return (
                <motion.div
                  layout
                  key={job.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 border rounded-lg flex flex-col justify-between hover:translate-y-[-2px] transition-all duration-300 shadow-sm ${
                    darkMode 
                      ? 'bg-neutral-900/60 border-neutral-840/80 text-white' 
                      : 'bg-white border-black text-black shadow-md'
                  }`}
                >
                  <div className="flex-1 flex flex-col">
                    {/* Header: Status and Token Badge */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold border ${
                        job.status === 'Released' 
                          ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' 
                          : job.status === 'Funded' || job.status === 'In Progress' 
                          ? 'bg-sky-400/10 text-sky-400 border-sky-400/20' 
                          : 'bg-amber-400/10 text-amber-300 border-amber-400/20'
                      }`}>
                        {job.status.toUpperCase()}
                      </span>
                      
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${tokenColors[job.escrowToken]}`}>
                        {job.tokenAmount} {job.escrowToken}
                      </span>
                    </div>

                    {/* Job Title */}
                    <h3 className={`font-sans font-extrabold text-base mb-2 leading-tight transition-colors ${
                      darkMode ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {job.title}
                    </h3>

                    {/* Client Info */}
                    <div className="text-[10px] font-mono text-neutral-500 mb-3 flex items-center gap-1">
                      <span>Posted by:</span>
                      <span className={`font-semibold ${darkMode ? 'text-white' : 'text-neutral-800'}`}>{job.client}</span>
                    </div>

                    {/* Job Description */}
                    <p className={`text-xs leading-relaxed mb-6 line-clamp-3 ${
                      darkMode ? 'text-neutral-400' : 'text-neutral-650'
                    }`}>
                      {job.description}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className={`border-t pt-4 mt-auto transition-colors ${
                    darkMode ? 'border-neutral-800' : 'border-black/5'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="text-[9px] font-mono text-neutral-500 font-bold">ESCROW LOCK BUDGET</div>
                        <div className={`font-sans font-bold text-lg ${darkMode ? 'text-white' : 'text-black'}`}>
                          ${job.escrowAmount.toLocaleString()}
                        </div>
                      </div>
                      
                      {job.status === 'Draft' ? (
                        <div className="text-right">
                          <div className="text-[9px] font-mono text-neutral-500 font-bold">SIGNING PROGRESS</div>
                          <span className={`text-[9px] font-semibold px-2 py-0.5 border rounded ${
                            darkMode ? 'bg-neutral-950 border-neutral-800 text-neutral-400' : 'bg-stone-100 border-stone-200 text-neutral-700'
                          }`}>
                            0/2 Verified
                          </span>
                        </div>
                      ) : (
                        <div className="text-right">
                          <div className="text-[9px] font-mono text-neutral-500 font-bold">SECURITY REPORT</div>
                          <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 border border-emerald-500/20 rounded">
                            Multi-sig locked
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {job.status === 'Draft' ? (
                        <button
                          onClick={() => setFundingJob(job)}
                          className={`col-span-1 px-3 py-1.5 font-mono font-bold text-[10px] rounded text-center transition-colors focus:outline-none cursor-pointer border ${
                            darkMode 
                              ? 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/35 text-emerald-300' 
                              : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-500/60 text-emerald-800'
                          }`}
                        >
                          Deploy Block
                        </button>
                      ) : (
                        <button
                          disabled
                          className={`col-span-1 px-3 py-1.5 font-mono font-bold text-[10px] rounded text-center cursor-not-allowed select-none focus:outline-none border ${
                            darkMode 
                              ? 'bg-neutral-950/40 border-neutral-850 text-neutral-600' 
                              : 'bg-stone-100 text-stone-450 border-neutral-200'
                          }`}
                        >
                          Asset Funded
                        </button>
                      )}

                      <button
                        onClick={() => {
                          setSelectedJobId(job.id);
                          setTab('details');
                        }}
                        className={`col-span-1 px-3 py-1.5 font-mono font-bold text-[10px] rounded text-center transition-all focus:outline-none cursor-pointer border ${
                          darkMode 
                            ? 'bg-amber-400 hover:bg-amber-500 text-neutral-950 border-amber-400' 
                            : 'bg-black hover:bg-stone-900 border border-black text-white'
                        }`}
                      >
                        Milestones →
                      </button>
                    </div>

                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center">
              <AlertCircle className="w-12 h-12 text-neutral-500 mx-auto mb-3" />
              <div className="text-lg font-sans font-bold text-neutral-400">No active contracts found matching query</div>
              <p className="text-neutral-500 text-xs mt-1">Try resetting the selection criteria or typing different letters.</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* CREATE JOB MODAL CONTAINER */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`border rounded-lg max-w-lg w-full overflow-hidden flex flex-col transition-all shadow-2xl ${
                darkMode ? 'bg-neutral-905 border-neutral-800 text-white' : 'bg-white border-black text-black'
              }`}
            >
              {/* Header inside modal */}
              <div className={`p-5 border-b flex items-center justify-between ${
                darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-[#fcd34d] border-black text-black'
              }`}>
                <div className="flex items-center gap-2">
                  <Coins className={`w-5 h-5 ${darkMode ? 'text-amber-400' : 'text-neutral-900'}`} />
                  <span className="font-sans font-black text-base uppercase">POST NEW ESCROW LOCK CONTRACT</span>
                </div>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className={`p-1 rounded-md transition-colors ${darkMode ? 'hover:bg-white/10 text-neutral-400 hover:text-white' : 'hover:bg-black/10 text-black'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form body */}
              <form onSubmit={handleCreateJobSubmit} className="p-6 flex flex-col gap-4 text-left">
                <div>
                  <label className="block text-[10px] font-mono font-bold tracking-widest text-neutral-500 mb-1.5 uppercase">
                    JOB CONTRACT TITLE
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Smart Contract Auditor inside Solana Project"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className={`w-full px-3.5 py-2 border rounded text-xs focus:outline-none transition-colors ${
                      darkMode ? 'bg-neutral-950 border-neutral-850 text-white focus:border-amber-400' : 'bg-white border-black text-black'
                    }`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold tracking-widest text-neutral-500 mb-1.5 uppercase">
                      CLIENT NAME
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jupiter Labs Found"
                      value={newClient}
                      onChange={(e) => setNewClient(e.target.value)}
                      className={`w-full px-3.5 py-2 border rounded text-xs focus:outline-none transition-colors ${
                        darkMode ? 'bg-neutral-950 border-neutral-850 text-white focus:border-amber-400' : 'bg-white border-black text-black'
                      }`}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold tracking-widest text-neutral-500 mb-1.5 uppercase">
                      ESCROW TOKENS
                    </label>
                    <select
                      value={newToken}
                      onChange={(e) => setNewToken(e.target.value as any)}
                      className={`w-full px-3.5 py-2 border rounded text-xs focus:outline-none font-mono font-bold transition-all ${
                        darkMode ? 'bg-neutral-950 border-neutral-850 text-white focus:border-amber-400' : 'bg-white border-black text-black'
                      }`}
                    >
                      <option value="USDT">USDT (Stablecoin)</option>
                      <option value="BTC">BTC (Bitcoin)</option>
                      <option value="ETH">ETH (Ethereum)</option>
                      <option value="SOL">SOL (Solana)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold tracking-widest text-[#737373] mb-1.5 uppercase">
                    BUDGET LOCK ($ USD equivalent)
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    max={1000000}
                    value={newBudget}
                    onChange={(e) => setNewBudget(parseInt(e.target.value))}
                    className={`w-full px-3.5 py-2 border rounded text-xs font-mono focus:outline-none transition-colors ${
                      darkMode ? 'bg-neutral-950 border-neutral-850 text-white focus:border-amber-400' : 'bg-white border-black text-black'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-mono font-bold tracking-widest text-[#737373] mb-1.5 uppercase">
                    CONTRACT DESCRIPTION SPECIFICATION
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Provide details about milestone payouts, expected outcomes, and developer guidelines..."
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className={`w-full px-3.5 py-2 border rounded text-xs focus:outline-none resize-none transition-colors ${
                      darkMode ? 'bg-neutral-950 border-neutral-850 text-white focus:border-amber-400' : 'bg-white border-black text-black'
                    }`}
                  />
                  <div className="text-[9px] font-mono text-neutral-500 mt-1.5">
                    *Upon submitting, 3 standardized milestones (30% / 40% / 30%) are automatically configured.
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  className={`w-full mt-4 py-3 font-mono font-bold text-xs rounded transition-all text-center cursor-pointer border ${
                    darkMode 
                      ? 'bg-amber-400 hover:bg-amber-500 text-neutral-950 border-amber-400' 
                      : 'bg-black hover:bg-stone-850 text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  Create Contract & Deploy Draft
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FUNDING DISPATCH INTERACTIVE ACTION DIALOG */}
      <AnimatePresence>
        {fundingJob && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`border rounded-lg max-w-sm w-full overflow-hidden transition-all shadow-2xl ${
                darkMode ? 'bg-neutral-905 border-neutral-800 text-white' : 'bg-white border-black text-black'
              }`}
            >
              <div className={`p-5 border-b flex items-center justify-between ${
                darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-emerald-600 border-black text-white'
              }`}>
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-5 h-5 text-emerald-300" />
                  <span className="font-sans font-black text-sm uppercase">DEPLOY ESCROW VAULT</span>
                </div>
                <button
                  onClick={() => setFundingJob(null)}
                  className={`p-1 rounded-md transition-colors ${darkMode ? 'hover:bg-white/10 text-neutral-400 hover:text-white' : 'hover:bg-black/10 text-white'}`}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 flex flex-col gap-4 text-left">
                <div className={`p-4 rounded border ${
                  darkMode ? 'bg-neutral-950 border-neutral-850' : 'bg-[#fffefb] border-neutral-200'
                }`}>
                  <div className="text-[9px] font-mono text-neutral-500 tracking-wider mb-1">SELECTED CONTRACT TITLE</div>
                  <div className={`font-sans font-extrabold text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>{fundingJob.title}</div>
                  
                  <div className="flex items-center justify-between mt-3 text-xs border-t border-neutral-800/10 pt-2">
                    <span className="text-neutral-400 text-[10px] font-mono">Milestones Value:</span>
                    <span className="font-mono font-bold">${fundingJob.escrowAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="text-neutral-400 text-[10px] font-mono">Dynamic Crypto locked:</span>
                    <span className="font-mono font-bold text-emerald-400">{fundingJob.tokenAmount} {fundingJob.escrowToken}</span>
                  </div>
                </div>

                <div className={`flex items-start gap-3 p-3 rounded text-[11px] leading-relaxed border ${
                  darkMode ? 'bg-amber-400/10 border-amber-400/20 text-amber-300' : 'bg-amber-50 border-amber-250 text-amber-800'
                }`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shrink-0" />
                  <p>
                    Depositing funds requires cryptographic consensus. Once locked, assets cannot undergo chargebacks unless both developer & client sign dispute parameters.
                  </p>
                </div>

                <div className="flex gap-2.5 mt-2">
                  <button
                    onClick={() => setFundingJob(null)}
                    className={`flex-1 py-2.5 font-mono font-bold text-xs rounded border transition-colors text-center cursor-pointer ${
                      darkMode ? 'bg-neutral-800 hover:bg-neutral-700 border-neutral-700 text-white' : 'bg-white hover:bg-neutral-50 border-black text-black'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={executeMockFunding}
                    disabled={isFundingProcessing}
                    className={`flex-1 py-2.5 font-mono font-bold text-xs rounded transition-all text-center cursor-pointer border ${
                      darkMode 
                        ? 'bg-amber-400 hover:bg-amber-500 text-neutral-950 border-amber-400' 
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white border-black'
                    }`}
                  >
                    {isFundingProcessing ? 'Processing...' : 'Confirm Deposit'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

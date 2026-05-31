import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  Calendar, 
  ArrowUpRight, 
  HelpCircle, 
  CheckCircle2, 
  CircleDollarSign, 
  Loader2, 
  Sparkles, 
  AlertTriangle, 
  Scale, 
  Lock, 
  RefreshCw, 
  Send, 
  UserCheck 
} from 'lucide-react';
import { Job, Milestone } from '../types';
import { socketService } from '../services/socket';

interface JobDetailsViewProps {
  jobs: Job[];
  selectedJobId: string;
  onUpdateMilestoneStatus: (jobId: string, milestoneId: string, status: Milestone['status']) => void;
  onUpdateJobStatus: (jobId: string, status: Job['status']) => void;
  setSelectedJobId: (id: string) => void;
  setTab: (tab: string) => void;
  darkMode?: boolean;
}

export default function JobDetailsView({
  jobs,
  selectedJobId,
  onUpdateMilestoneStatus,
  onUpdateJobStatus,
  setSelectedJobId,
  setTab,
  darkMode = true
}: JobDetailsViewProps) {
  
  // Find currently selected job
  const job = jobs.find(j => j.id === selectedJobId) || jobs[0];

  const [activeArbitrationTab, setActiveArbitrationTab] = useState<'details' | 'dispute' | 'contracts'>('details');
  const [isProcessingAction, setIsProcessingAction] = useState<string | null>(null);
  const [successAnimation, setSuccessAnimation] = useState<string | null>(null);

  // Dispute Simulation State
  const [disputeMessage, setDisputeMessage] = useState('');
  const [aiResolutionOffer, setAiResolutionOffer] = useState<string | null>(null);
  const [isAiEvaluating, setIsAiEvaluating] = useState(false);

  // Web3 Chat Log State
  const [chatLog, setChatLog] = useState<{sender: string, text: string, time: string}[]>([
    { sender: 'Client', text: 'Hey, I have locked 100% of the funds in the escrow vault. You can start anytime.', time: '10:14 AM' },
    { sender: 'Freelancer', text: 'Excellent! I have started the prototype development. Will update milestone 1 in a bit.', time: '11:05 AM' },
  ]);
  const [newChatInput, setNewChatInput] = useState('');

  const handleMsgSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChatInput.trim()) return;
    setChatLog(prev => [...prev, { sender: 'You (Developer)', text: newChatInput, time: new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'}) }]);
    setNewChatInput('');
  };

  const handleLaunchDispute = () => {
    setIsAiEvaluating(true);
    setAiResolutionOffer(null);
    setTimeout(() => {
      setIsAiEvaluating(false);
      setAiResolutionOffer("Our AI oracle static analysis reports 100% code delivery matches milestones requirements! Commits audited 0x2BA4. Consensus payout resolution proposed: Release 80% to Developer, refund 20% back to Client.");
    }, 2800);
  };

  const triggerMilestoneFundRelease = (milestoneId: string, isFundAction: boolean) => {
    const actionKey = `${milestoneId}-${isFundAction ? 'fund' : 'release'}`;
    setIsProcessingAction(actionKey);

    setTimeout(() => {
      const nextStatus = isFundAction ? 'Funded' : 'Released';
      onUpdateMilestoneStatus(job.id, milestoneId, nextStatus);
      socketService.broadcastMilestoneUpdate({ jobId: job.id, milestoneId, status: nextStatus });
      setIsProcessingAction(null);
      setSuccessAnimation(milestoneId);
      setTimeout(() => setSuccessAnimation(null), 3000);
    }, 1500);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 font-sans">
      
      {/* Upper Breadcrumb Actions banner */}
      <div className="flex items-center justify-between gap-4 mb-8 select-none">
        <button
          onClick={() => setTab('jobs')}
          className={`flex items-center gap-1.5 font-mono text-xs font-bold leading-none cursor-pointer ${
            darkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-black'
          }`}
        >
          <span>← Back to active listings</span>
        </button>

        <span className="text-[10px] font-mono text-neutral-550 flex items-center gap-1">
          <span>Escrow Contract Block Identity:</span>
          <span className={`font-bold uppercase ${darkMode ? 'text-amber-400' : 'text-neutral-900'}`}>{job.id}</span>
        </span>
      </div>

      {/* Primary Layout Columns split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Main specifications and milestone loops */}
        <div className="lg:col-span-8 flex flex-col gap-8 text-left">
          
          {/* Main Title Metadata Card */}
          <div className={`p-6 sm:p-8 rounded-lg border transition-all ${
            darkMode ? 'bg-neutral-900/60 border-neutral-800 text-white' : 'bg-white border-black text-black'
          }`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-bold tracking-wider uppercase border ${
                job.status === 'Released' 
                  ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' 
                  : 'bg-amber-400/10 text-amber-300 border-amber-400/20'
              }`}>
                {job.status}
              </span>
              <span className="text-neutral-500 text-[10px]">• Published on {job.createdAt}</span>
            </div>

            <h1 className={`font-sans font-black text-2xl md:text-3xl tracking-tight leading-tight mb-4 ${
              darkMode ? 'text-white' : 'text-black'
            }`}>
              {job.title}
            </h1>

            <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${
              darkMode ? 'text-neutral-400' : 'text-neutral-600'
            }`}>
              {job.description}
            </p>

            {/* Locked budget data bars */}
            <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded border ${
              darkMode ? 'bg-neutral-950 border-neutral-850' : 'bg-stone-50 border-neutral-200'
            }`}>
              <div>
                <span className="text-[9px] font-mono text-neutral-500 font-bold block mb-0.5">VAULT BUDGET</span>
                <span className="font-semibold text-base font-sans">${job.escrowAmount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-neutral-500 font-bold block mb-0.5">LOCKED TOKENS</span>
                <span className="font-mono text-xs sm:text-sm font-bold text-amber-400">{job.tokenAmount} {job.escrowToken}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-neutral-500 font-bold block mb-0.5">CLIENT CORP</span>
                <span className="text-xs font-bold leading-normal truncate block">{job.client}</span>
              </div>
              <div>
                <span className="text-[9px] font-mono text-neutral-500 font-bold block mb-0.5">DEV IDENTITY</span>
                <span className="font-mono text-[10px] text-neutral-400 leading-normal truncate block">{job.freelancer}</span>
              </div>
            </div>
          </div>

          {/* MILESTONES LIST */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between border-b border-neutral-800/10 pb-2">
              <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase">
                CRITICAL PAYMENT CONTRACT MILESTONES (3)
              </span>
              <span className="text-neutral-500 text-[10px] font-mono">Consensual multi-sig standard</span>
            </div>

            <div className="flex flex-col gap-4">
              {job.milestones.map((milestone, idx) => {
                const amountValue = (job.escrowAmount * milestone.amountPercent) / 100;
                const tokenPart = ((job.tokenAmount * milestone.amountPercent) / 100).toFixed(3);
                
                const isDraft = job.status === 'Draft';
                const isPending = milestone.status === 'Pending';
                const isFunded = milestone.status === 'Funded';
                const isReleased = milestone.status === 'Released';

                return (
                  <motion.div
                    key={milestone.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className={`p-5 rounded-lg border relative transition-all ${
                      darkMode 
                        ? 'bg-neutral-900/40 border-neutral-840/80' 
                        : 'bg-white border-black text-black'
                    }`}
                  >
                    {/* Corner Success Sparkle anims */}
                    {successAnimation === milestone.id && (
                      <div className="absolute inset-0 bg-emerald-500/5 border border-emerald-500/20 rounded-lg animate-pulse" />
                    )}

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="text-left flex-1">
                        <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                          <span className={`text-[9px] font-mono font-black border px-2 py-0.5 rounded ${
                            isReleased 
                              ? 'bg-emerald-400/10 text-emerald-400 border-emerald-400/20' 
                              : isFunded 
                              ? 'bg-sky-400/10 text-sky-400 border-sky-400/20' 
                              : 'bg-amber-400/10 text-amber-300 border-amber-400/20 font-medium'
                          }`}>
                            {milestone.status.toUpperCase()}
                          </span>
                          <span className="font-mono text-[10px] text-neutral-500">{milestone.amountPercent}% allotment</span>
                        </div>

                        <h3 className={`font-sans font-bold text-xs sm:text-sm ${
                          darkMode ? 'text-white' : 'text-neutral-900'
                        }`}>
                          {idx + 1}. {milestone.title}
                        </h3>
                        <p className={`text-[11px] leading-relaxed mt-1 max-w-xl ${
                          darkMode ? 'text-neutral-400' : 'text-neutral-500'
                        }`}>
                          {milestone.description}
                        </p>
                      </div>

                      {/* Right values and actions */}
                      <div className="flex flex-col sm:items-end justify-center shrink-0 min-w-[125px]">
                        <div className={`font-sans font-bold text-base leading-none ${darkMode ? 'text-white' : 'text-black'}`}>
                          ${amountValue.toLocaleString()}
                        </div>
                        <div className="font-mono text-[10px] text-neutral-500 mt-1 mb-3">
                          ~ {tokenPart} {job.escrowToken}
                        </div>

                        {/* Actions context based on statuses */}
                        {!isReleased && (
                          <div className="flex gap-2 w-full justify-end">
                            {isPending && (
                              <button
                                disabled={isDraft || isProcessingAction !== null}
                                onClick={() => triggerMilestoneFundRelease(milestone.id, true)}
                                className={`px-3 py-1 font-mono font-bold text-[9px] tracking-wide rounded cursor-pointer transition-colors border ${
                                  darkMode 
                                    ? 'bg-sky-400/10 hover:bg-sky-400/20 border-sky-450/30 text-sky-300 disabled:opacity-40 disabled:cursor-not-allowed' 
                                    : 'bg-sky-50 hover:bg-sky-100 border-sky-500/60 text-sky-800 disabled:opacity-50'
                                }`}
                              >
                                {isProcessingAction === `${milestone.id}-fund` ? 'Funding...' : 'Deposit Vault'}
                              </button>
                            )}

                            {isFunded && (
                              <button
                                disabled={isProcessingAction !== null}
                                onClick={() => triggerMilestoneFundRelease(milestone.id, false)}
                                className={`px-3 py-1 font-mono font-bold text-[9px] tracking-wide rounded cursor-pointer transition-colors border ${
                                  darkMode 
                                    ? 'bg-emerald-400/10 hover:bg-emerald-400/20 border-emerald-450/30 text-emerald-300' 
                                    : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-500/60 text-emerald-800'
                                }`}
                              >
                                {isProcessingAction === `${milestone.id}-release` ? 'Releasing...' : 'Unlock Milestone'}
                              </button>
                            )}
                          </div>
                        )}

                        {isReleased && (
                          <span className="text-[10px] text-emerald-400 font-mono font-bold flex items-center gap-1 select-none">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Payload Released</span>
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Dispute Arbitration AI Oracles and Multisig Consensus chats */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full">
          
          {/* AI Arbitration System */}
          <div className={`border rounded-lg overflow-hidden flex flex-col select-none transition-colors ${
            darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-black text-black'
          }`}>
            <div className={`p-4 border-b flex items-center justify-between font-sans ${
              darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-amber-100 border-black text-black'
            }`}>
              <span className="font-display font-extrabold text-xs tracking-wider uppercase flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-amber-500" />
                <span>AI DISPUTE ORACLE</span>
              </span>
              <span className="font-mono text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 px-1.5 py-0.5 rounded font-black uppercase">
                ACTIVE
              </span>
            </div>

            {/* Section tabs */}
            <div className={`flex border-b text-[10px] font-mono leading-none font-bold select-none ${
              darkMode ? 'border-neutral-800' : 'border-black/5'
            }`}>
              <button
                onClick={() => setActiveArbitrationTab('details')}
                className={`flex-1 py-3 text-center transition-all ${
                  activeArbitrationTab === 'details' 
                    ? (darkMode ? 'bg-neutral-950 text-white border-b-2 border-amber-400' : 'bg-neutral-50 text-black border-b-2 border-black') 
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Information Rules
              </button>
              <button
                onClick={() => setActiveArbitrationTab('dispute')}
                className={`flex-1 py-3 text-center transition-all ${
                  activeArbitrationTab === 'dispute' 
                    ? (darkMode ? 'bg-neutral-950 text-white border-b-2 border-amber-400' : 'bg-neutral-50 text-black border-b-2 border-black') 
                    : 'text-neutral-500 hover:text-neutral-300'
                }`}
              >
                Form Submission
              </button>
            </div>

            {/* Sub content 1: Rules */}
            {activeArbitrationTab === 'details' && (
              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-start gap-2 text-xs leading-relaxed text-neutral-400">
                  <span className="text-amber-450 font-bold block mt-0.5">•</span>
                  <p>Insolvency cases or project deliverables disputes undergo cryptographic, automated oracle arbitration scan analysis checks.</p>
                </div>

                <div className={`p-3.5 rounded border text-[11px] leading-relaxed ${
                  darkMode ? 'bg-neutral-950 border-neutral-850' : 'bg-stone-50 border-neutral-200'
                }`}>
                  <div className="font-bold text-neutral-300 font-mono text-[9px] uppercase tracking-wider mb-1.5">STANDARDIZED PROTOCOL SLAs:</div>
                  <ul className="list-disc list-inside space-y-1 text-neutral-400 font-sans">
                    <li>Contracts have 14 days standard auto-sign buffers.</li>
                    <li>Resolution is mediated instantly by LLM Oracle Consensus.</li>
                    <li>Refund tokens are returned to verified deposit address.</li>
                  </ul>
                </div>

                <button
                  onClick={() => setActiveArbitrationTab('dispute')}
                  className={`w-full py-2.5 font-mono font-bold text-xs rounded border text-center transition-all cursor-pointer ${
                    darkMode 
                      ? 'bg-amber-400 hover:bg-amber-505 text-neutral-950 border-amber-400 font-black' 
                      : 'bg-black hover:bg-stone-850 text-white border-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  Write Dispute Submission
                </button>
              </div>
            )}

            {/* Sub content 2: Dispute evaluation form */}
            {activeArbitrationTab === 'dispute' && (
              <div className="p-5 flex flex-col gap-4 text-left">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span className="font-sans font-bold text-xs transition-colors">AI Arbitration Engine</span>
                </div>

                <div>
                  <label className="block text-[9px] font-mono text-neutral-500 uppercase font-bold mb-1.5 tracking-wider">
                    DESCRIBE YOUR DISPUTE CASE METRICS
                  </label>
                  <textarea
                    rows={3}
                    value={disputeMessage}
                    onChange={(e) => setDisputeMessage(e.target.value)}
                    placeholder="e.g. Completed initial design work, but client went silent and refuses to approve milestone 1..."
                    className={`w-full text-xs p-2.5 border rounded focus:outline-none resize-none placeholder:text-neutral-550 font-sans transition-all ${
                      darkMode ? 'bg-neutral-950 border-neutral-850 text-white focus:border-amber-400' : 'bg-stone-50 border-black text-black'
                    }`}
                  />
                </div>

                <button
                  onClick={handleLaunchDispute}
                  disabled={isAiEvaluating || !disputeMessage.trim()}
                  className={`w-full py-2.5 font-mono font-bold text-xs rounded border transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                    darkMode 
                      ? 'bg-amber-100 hover:bg-amber-200 border-amber-300 text-neutral-950 disabled:bg-neutral-800 disabled:border-neutral-850 disabled:text-neutral-600' 
                      : 'bg-[#fcd34d] hover:bg-[#fbbf24] disabled:bg-stone-200 border border-black text-black shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  }`}
                >
                  {isAiEvaluating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-neutral-950" />
                      <span>Evaluating Code & Commits...</span>
                    </>
                  ) : (
                    <>
                      <Scale className="w-3.5 h-3.5" />
                      <span>Trigger AI Arbitration</span>
                    </>
                  )}
                </button>

                {/* Simulated AI Decision offer */}
                {aiResolutionOffer && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`p-3.5 rounded border max-w-full flex flex-col gap-2 transition-all ${
                      darkMode ? 'bg-amber-400/5 border-amber-400/20 text-neutral-300' : 'bg-indigo-50 border-indigo-200 text-indigo-950'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                      <span className="text-[9px] font-mono font-bold">AI ORACLE DETERMINATION:</span>
                    </div>
                    <p className="text-[10px] leading-relaxed font-sans">
                      {aiResolutionOffer}
                    </p>
                    
                    <button
                      onClick={() => {
                        onUpdateJobStatus(job.id, 'Released');
                        setAiResolutionOffer(null);
                        setDisputeMessage('');
                        setActiveArbitrationTab('details');
                      }}
                      className={`mt-2 py-1 font-mono text-[9px] font-bold rounded border transition-colors ${
                        darkMode ? 'bg-amber-400 border-amber-400 hover:bg-amber-500 text-neutral-900' : 'bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      Sign Consensus Agreement 🤝
                    </button>
                  </motion.div>
                )}
              </div>
            )}

          </div>

          {/* Chat messaging panel */}
          <div className={`border rounded-lg overflow-hidden flex flex-col h-[380px] shadow-sm transition-colors ${
            darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-black text-black'
          }`}>
            <div className={`p-4 border-b flex items-center justify-between select-none ${
              darkMode ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-stone-50 border-black text-black'
            }`}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="font-sans font-bold text-xs">Agreement Consensus Talk</span>
              </div>
              <span className="text-[8px] font-mono bg-neutral-800 text-neutral-400 border border-neutral-700 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                AES Secured
              </span>
            </div>

            {/* Chat Messages Log list */}
            <div className={`flex-1 p-4 overflow-y-auto flex flex-col gap-3.5 transition-colors ${
              darkMode ? 'bg-neutral-950/20' : 'bg-stone-50/20'
            }`}>
              {chatLog.map((log, index) => {
                const isMe = log.sender.includes('You');
                return (
                  <div key={index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div className="text-[9px] font-mono text-neutral-500 mb-1 flex items-center gap-1 leading-none">
                      <span>{log.sender}</span>
                      <span>•</span>
                      <span>{log.time}</span>
                    </div>
                    
                    <div className={`p-2.5 rounded-lg text-xs max-w-[85%] border leading-relaxed ${
                      isMe 
                        ? (darkMode ? 'bg-amber-400 text-neutral-950 border-amber-400 font-medium' : 'bg-black text-white border-black') 
                        : (darkMode ? 'bg-neutral-900 text-neutral-200 border-neutral-800' : 'bg-white text-neutral-800 border-neutral-200')
                    }`}>
                      {log.text}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Input form */}
            <form onSubmit={handleMsgSend} className={`border-t p-3 flex items-center gap-2 transition-colors ${
              darkMode ? 'border-neutral-800 bg-neutral-950' : 'border-black bg-white'
            }`}>
              <input
                type="text"
                placeholder="Type your secure message..."
                value={newChatInput}
                onChange={(e) => setNewChatInput(e.target.value)}
                className={`flex-1 text-xs px-3 py-2 border rounded focus:outline-none transition-all ${
                  darkMode ? 'bg-neutral-900 border-neutral-800 text-white focus:border-amber-400' : 'bg-stone-50 border-black text-black'
                }`}
              />
              <button
                type="submit"
                className={`p-2 rounded border transition-all focus:outline-none cursor-pointer ${
                  darkMode ? 'bg-amber-400 hover:bg-amber-500 border-amber-400 text-neutral-950' : 'bg-black hover:bg-stone-900 border border-black text-white'
                }`}
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

          </div>

        </div>

      </div>

    </div>
  );
}

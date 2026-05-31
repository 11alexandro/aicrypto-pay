import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface CoinConfig {
  name: string;
  symbol: string;
  color: string;
  bgClass: string;
  svgRender?: () => ReactNode;
}

export default function CryptoCoinsGrid() {
  const row1: CoinConfig[] = [
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      color: '#F7931A',
      bgClass: 'bg-[#F7931A]',
      svgRender: () => (
        <span className="font-sans font-extrabold text-white text-base">₿</span>
      ),
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      color: '#627EEA',
      bgClass: 'bg-[#627EEA]',
      svgRender: () => (
        <svg viewBox="0 0 100 100" className="w-3.5 h-5 text-white" fill="currentColor">
          <path d="M50 0 L15 50 L50 72 L85 50 Z" />
          <path d="M50 100 L15 61 L50 72 L85 61 Z" opacity="0.6" />
        </svg>
      ),
    },
    {
      name: 'Binance',
      symbol: 'BNB',
      color: '#F3BA2F',
      bgClass: 'bg-[#F3BA2F]',
      svgRender: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-black" fill="currentColor">
          <path d="M12 0l-3.3 3.3L12 6.6l3.3-3.3L12 0zm-6.6 6.6L2.1 9.9 5.4 13.2l3.3-3.3-3.3-3.3zM12 9.9l-3.3 3.3-1.1-1.1 4.4-4.4 4.4 4.4-1.1 1.1L12 9.9zm6.6-3.3l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zM2.1 14.1l3.3 3.3 3.3-3.3-3.3-3.3-3.3 3.3zm9.9 3.3l-3.3-3.3-1.1 1.1 4.4 4.4 4.4-4.4-1.1-1.1L12 17.4zm6.6-3.3l3.3 3.3-3.3 3.3-3.3-3.3 3.3-3.3zM12 24l3.3-3.3L12 17.4l-3.3 3.3L12 24z" />
        </svg>
      ),
    },
    {
      name: 'Cardano Blue',
      symbol: 'ADA2',
      color: '#006097',
      bgClass: 'bg-[#006097]',
      svgRender: () => (
        <svg viewBox="0 0 100 100" className="w-4 h-4 text-white" fill="currentColor">
          <circle cx="50" cy="50" r="12" />
          <circle cx="50" cy="20" r="8" />
          <circle cx="50" cy="80" r="8" />
          <circle cx="20" cy="50" r="8" />
          <circle cx="80" cy="50" r="8" />
        </svg>
      ),
    },
  ];

  const row2: CoinConfig[] = [
    {
      name: 'Dogecoin',
      symbol: 'DOGE',
      color: '#C2A633',
      bgClass: 'bg-[#C2A633]',
      svgRender: () => (
        <span className="font-sans font-extrabold text-white text-base">Ð</span>
      ),
    },
    {
      name: 'Solana',
      symbol: 'SOL',
      color: '#000000',
      bgClass: 'bg-black border border-neutral-800',
      svgRender: () => (
        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-emerald-400" fill="currentColor">
          <path d="M0 3.5h20.5l3-3.5H3L0 3.5zm24 8.5L21 8.5H0.5l3 3.5H24zm-3.5 8.5h-20.5l-3 3.5H21l3-3.5z" />
        </svg>
      ),
    },
    {
      name: 'XRP',
      symbol: 'XRP',
      color: '#23292F',
      bgClass: 'bg-[#23292F]',
      svgRender: () => (
        <svg viewBox="0 0 100 100" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="14" strokeLinecap="round">
          <path d="M25 25 L50 50 L75 25" />
          <path d="M25 75 L50 50 L75 75" />
        </svg>
      ),
    },
    {
      name: 'Litecoin',
      symbol: 'LTC',
      color: '#8F9EBC',
      bgClass: 'bg-[#8F9EBC]',
      svgRender: () => (
        <span className="font-sans font-extrabold italic text-white text-base">Ł</span>
      ),
    },
    {
      name: 'Chainlink',
      symbol: 'LINK',
      color: '#2A5ADA',
      bgClass: 'bg-[#2A5ADA]',
      svgRender: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2z" />
          <path d="M12 6.5L6 10v4l6 3.5 6-3.5v-4z" opacity="0.8"/>
        </svg>
      ),
    },
  ];

  const row3: CoinConfig[] = [
    {
      name: 'Cardano',
      symbol: 'ADA',
      color: '#0033AD',
      bgClass: 'bg-[#0033AD]',
      svgRender: () => (
        <svg viewBox="0 0 100 100" className="w-4 h-4 text-white" fill="currentColor">
          <circle cx="50" cy="50" r="10" />
          <circle cx="50" cy="22" r="7" />
          <circle cx="50" cy="78" r="7" />
          <circle cx="22" cy="50" r="7" />
          <circle cx="78" cy="50" r="7" />
        </svg>
      ),
    },
    {
      name: 'Polkadot',
      symbol: 'DOT',
      color: '#E6007A',
      bgClass: 'bg-[#E6007A]',
      svgRender: () => (
        <div className="flex gap-0.5 justify-center items-center">
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
          <div className="w-1.5 h-1.5 rounded-full bg-white" />
        </div>
      ),
    },
    {
      name: 'Cosmos',
      symbol: 'ATOM',
      color: '#2E305C',
      bgClass: 'bg-[#2E305C]',
      svgRender: () => (
        <svg viewBox="0 0 24 24" className="w-4 h-4 text-indigo-300" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="4" />
          <ellipse cx="12" cy="12" rx="8" ry="1.5" transform="rotate(30, 12, 12)" />
          <ellipse cx="12" cy="12" rx="8" ry="1.5" transform="rotate(-30, 12, 12)" />
        </svg>
      ),
    },
    {
      name: 'Avalanche',
      symbol: 'AVAX',
      color: '#E84142',
      bgClass: 'bg-[#E84142]',
      svgRender: () => (
        <svg viewBox="0 0 100 100" className="w-3.5 h-3.5 text-white" fill="currentColor">
          <path d="M50 15 L15 75 L85 75 Z M50 35 L70 70 L30 70 Z" />
        </svg>
      ),
    },
  ];

  const renderRow = (coins: CoinConfig[], rowIndex: number) => {
    // Elegant, custom 3D coordinate trajectories for each coin index
    const trajectories = [
      { y: [0, -4, 2, 0], z: [0, 20, -20, 0], rx: [0, 6, -6, 0], ry: [0, -8, 8, 0], duration: 8 },
      { y: [2, -2, 1, 2], z: [-15, 15, -10, -15], rx: [-4, 4, -2, -4], ry: [6, -6, 3, 6], duration: 10 },
      { y: [-2, 3, -1, -2], z: [12, -12, 6, 12], rx: [4, -4, 2, 4], ry: [-6, 6, -3, -6], duration: 9 },
      { y: [1.5, -3, 2, 1.5], z: [-8, 12, -15, -8], rx: [-3, 5, -4, -3], ry: [5, -7, 5, 5], duration: 11 },
      { y: [-1.5, 2, -2, -1.5], z: [18, -15, 8, -1.5], rx: [5, -5, 4, 5], ry: [-7, 7, -4, -7], duration: 12 }
    ];

    return (
      <div 
        className={`flex justify-center items-center gap-2 ${rowIndex > 0 ? '-mt-1' : ''}`}
        style={{ perspective: '800px', transformStyle: 'preserve-3d' }}
      >
        {coins.map((coin, index) => {
          const trajectoryIndex = (rowIndex * coins.length + index) % trajectories.length;
          const traj = trajectories[trajectoryIndex];
          const delay = (index * 0.45) % 2.5;

          return (
            <motion.div
              key={coin.name}
              animate={{
                y: traj.y,
                z: traj.z,
                rotateX: traj.rx,
                rotateY: traj.ry,
              }}
              transition={{
                duration: traj.duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: delay
              }}
              whileHover={{ 
                scale: 1.15, 
                z: 40,
                rotateX: 0,
                rotateY: 0,
                transition: { duration: 0.3 } 
              }}
              className="relative group cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
            >
              {/* Soft studio ambient glow casting behind the coin matching its primary theme color */}
              <div 
                className="absolute inset-[2px] rounded-full blur-[6px] opacity-10 group-hover:opacity-30 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundColor: coin.color }}
              />

              {/* Realistic depth shadow underneath the coin drifting in opposition to Z depth */}
              <motion.div 
                className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-4/5 h-1.5 bg-black/10 rounded-full blur-[2px] pointer-events-none"
                animate={{
                  scale: [0.88, 1.08, 0.88],
                  opacity: [0.25, 0.55, 0.25]
                }}
                transition={{
                  duration: traj.duration,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: delay
                }}
              />

              {/* The Coin circle: Flat colored circle with premium 3D layered glass reflections */}
              <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center ${coin.bgClass} shadow-md relative overflow-hidden transition-all duration-300`}>
                
                {/* 4K Cinematic sweep glare mask reflection (highly polished satin glint) */}
                <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-10">
                  <motion.div
                    className="absolute -inset-y-3 -inset-x-16 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[25deg]"
                    animate={{
                      x: ['-50px', '50px'],
                    }}
                    transition={{
                      duration: traj.duration,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: 'easeInOut',
                      delay: delay
                    }}
                  />
                </div>

                {/* Soft studio lighting radial highlight and shadow ring around the rim */}
                <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none z-10" />
                <div className="absolute inset-[1px] rounded-full border border-black/5 pointer-events-none z-10" />

                {/* Main Coin SVG / Symbol */}
                <div className="z-0 transform scale-95 select-none pointer-events-none">
                  {coin.svgRender ? coin.svgRender() : (
                    <span className="font-sans font-bold text-[10px] text-white">
                      {coin.symbol[0]}
                    </span>
                  )}
                </div>
              </div>

              {/* Precise Label Tooltip on hover */}
              <span className="absolute -bottom-7 left-1/2 -translate-x-1/2 scale-0 group-hover:scale-100 bg-black/95 text-white px-2 py-0.5 rounded text-[9px] font-mono transition-transform duration-150 pointer-events-none z-30 shadow-md border border-neutral-800 whitespace-nowrap">
                {coin.name}
              </span>
            </motion.div>
          );
        })}
      </div>
    );
  };

  return (
    <div 
      className="flex flex-col items-center justify-center py-2 select-none"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {renderRow(row1, 0)}
      {renderRow(row2, 1)}
      {renderRow(row3, 2)}
    </div>
  );
}

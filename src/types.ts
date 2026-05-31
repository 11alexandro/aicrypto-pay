export interface Job {
  id: string;
  title: string;
  client: string;
  freelancer: string;
  description: string;
  escrowAmount: number; // in USD
  escrowToken: 'BTC' | 'ETH' | 'USDT' | 'SOL';
  tokenAmount: number;
  status: 'Draft' | 'Funded' | 'In Progress' | 'Disputed' | 'Released';
  milestones: Milestone[];
  createdAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  amountPercent: number;
  status: 'Pending' | 'Funded' | 'Completed' | 'Released';
  description: string;
}

export interface CryptoLogItem {
  id: string;
  type: 'DEPOSIT' | 'RELEASE' | 'DISPUTE' | 'REFUND';
  amount: string;
  asset: string;
  txHash: string;
  time: string;
  status: 'Success' | 'Processing' | 'Failed';
}

export interface CryptoCoin {
  name: string;
  symbol: string;
  color: string;
  gradient: string;
  iconText: string;
  initialX: number;
  initialY: number;
  delay: number;
  size: number;
  borderColor: string;
  textColor: string;
}

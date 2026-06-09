import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // custom ID or could just use _id
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, enum: ['client', 'freelancer'], required: true },
  walletBalance: { type: Number, default: 0 },
  pendingBalance: { type: Number, default: 0 },
  withdrawableBalance: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const JobSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  budget: { type: Number, required: true },
  clientId: { type: String, required: true },
  freelancerId: { type: String, required: true },
  client: { type: String }, // For UI compatibility
  freelancer: { type: String }, // For UI compatibility
  escrowAmount: { type: Number },
  escrowToken: { type: String },
  tokenAmount: { type: Number },
  milestones: { type: Array, default: [] },
  status: { type: String, enum: ['Draft', 'Funded', 'In Progress', 'Disputed', 'Released'], default: 'Draft' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const EscrowTransactionSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  jobId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true }, // e.g., 'Locked', 'Released', 'Refunded'
  txHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ActivityLogSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const User = mongoose.model('User', UserSchema);
export const Job = mongoose.model('Job', JobSchema);
export const EscrowTransaction = mongoose.model('EscrowTransaction', EscrowTransactionSchema);
export const ActivityLog = mongoose.model('ActivityLog', ActivityLogSchema);

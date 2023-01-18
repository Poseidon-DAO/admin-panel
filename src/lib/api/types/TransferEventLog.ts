export type TransferEventLog = {
  address: string;
  topics: string[];
  data: string;
  blockNumber: string;
  transactionHash: string;
  transactionIndex: string;
  blockHash: string;
  logIndex: string;
  removed: boolean;
  blockDate: Date | null;
  timestamp: string | null;
  functionName: string | null;
};

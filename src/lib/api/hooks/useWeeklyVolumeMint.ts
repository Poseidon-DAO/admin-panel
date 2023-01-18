import { useQuery } from "wagmi";

import { type TransferEventLog } from "../types/TransferEventLog";
import { BASE_URI } from "../baseUrl";

interface QueryResponse {
  totalSumMint: number;
  weeklyMints: Record<number, TransferEventLog[]>;
}

const queryKey = "weeklyMints";

async function fetcher() {
  const response = await fetch(`${BASE_URI}/nft/weeklyMinted`);

  return response.json();
}

const useWeeklyVolumeMint = () => {
  const query = useQuery<QueryResponse>([queryKey], { queryFn: fetcher });

  return {
    totalSumMint: query.data?.totalSumMint,
    weeklyMints: query.data?.weeklyMints,
    fetchStatus: query.status,
  };
};

export { useWeeklyVolumeMint };

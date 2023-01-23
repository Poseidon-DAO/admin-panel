import { useQuery } from "wagmi";

import { type TransferEventLogForMint } from "../types/TransferEventLog";
import { BASE_URI } from "../baseUrl";

interface QueryResponse {
  totalSumMint: number;
  weeklyMints: Record<number, TransferEventLogForMint[]>;
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

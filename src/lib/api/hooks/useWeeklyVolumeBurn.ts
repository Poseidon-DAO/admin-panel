import { useQuery } from "wagmi";

import { type TransferEventLog } from "../types/TransferEventLog";
import { BASE_URI } from "../baseUrl";

interface QueryResponse {
  totalSumBurned: number;
  weeklyBurns: Record<number, TransferEventLog[]>;
}

const queryKey = "weeklyBurns";

async function fetcher() {
  const response = await fetch(`${BASE_URI}/token/weeklyBurned`);

  return response.json();
}

const useWeeklyVolumeBurn = () => {
  const query = useQuery<QueryResponse>([queryKey], { queryFn: fetcher });

  return {
    totalSumBurned: query.data?.totalSumBurned,
    weeklyBurns: query.data?.weeklyBurns,
    fetchStatus: query.status,
  };
};

export { useWeeklyVolumeBurn };

import { useQuery } from "wagmi";

import { type TransferEventLog } from "../types/TransferEventLog";
import { BASE_URI } from "../baseUrl";

interface QueryResponse {
  totalSumMoved: number;
  weeklyTransfers: Record<number, TransferEventLog[]>;
}

const queryKey = "weeklyMoves";

async function fetcher() {
  const response = await fetch(`${BASE_URI}/token/weeklyMoved`);

  return response.json();
}

const useWeeklyVolumeMove = () => {
  const query = useQuery<QueryResponse>([queryKey], { queryFn: fetcher });

  return {
    totalSumMoved: query.data?.totalSumMoved,
    weeklyTransfers: query.data?.weeklyTransfers,
    fetchStatus: query.status,
  };
};

export { useWeeklyVolumeMove };

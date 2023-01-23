import { useQuery } from "wagmi";

import { BASE_URI } from "../baseUrl";
import { type TransferEventLog } from "../types/TransferEventLog";

interface QueryResponse {
  airdrops: TransferEventLog[];
}

const queryKey = "airdrops";

async function fetcher() {
  const response = await fetch(`${BASE_URI}/token/airdrops`);

  return response.json();
}

const useAirdrops = () => {
  const query = useQuery<QueryResponse>([queryKey], { queryFn: fetcher });

  return {
    airdrops: query.data?.airdrops,
    fetchStatus: query.status,
  };
};

export { useAirdrops };

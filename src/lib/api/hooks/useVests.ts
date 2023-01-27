import { useQuery } from "wagmi";

import { BASE_URI } from "../baseUrl";
import { type TransferEventLog } from "../types/TransferEventLog";

interface QueryResponse {
  vests: Record<string, TransferEventLog[]>;
}

const queryKey = "vests";

async function fetcher() {
  const response = await fetch(`${BASE_URI}/token/vestsByDate`);

  return response.json();
}

const useVests = () => {
  const query = useQuery<QueryResponse>([queryKey], { queryFn: fetcher });

  return {
    vests: query.data?.vests,
    fetchStatus: query.status,
  };
};

export { useVests };

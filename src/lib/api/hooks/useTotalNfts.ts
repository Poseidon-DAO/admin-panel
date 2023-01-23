import { useQuery } from "wagmi";

import { BASE_URI } from "../baseUrl";

interface QueryResponse {
  totalNfts: number;
}

const queryKey = "totalNfts";

async function fetcher() {
  const response = await fetch(`${BASE_URI}/nft/total`);

  return response.json();
}

const useTotalNfts = () => {
  const query = useQuery<QueryResponse>([queryKey], { queryFn: fetcher });

  return {
    totalNfts: query.data?.totalNfts,
    fetchStatus: query.status,
  };
};

export { useTotalNfts };

import { utils } from "ethers";
import { erc20Options } from "src/contracts/options";

import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";
import { useAccount, useContractRead } from "wagmi";

function usePDNBalance() {
  const { address } = useAccount();

  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.PDN_BALANCE, [address]);

  const query = useContractRead({ ...options, enabled: !!address });

  return {
    ...query,
    balance: !!query?.data ? Number(query.data) : null,
    roundedBalance: query.data ? utils.formatEther(query.data) : query.data,
    fetchPDNBalance: query.refetch,
  };
}

export { usePDNBalance };

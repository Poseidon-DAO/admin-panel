import { utils } from "ethers";
import { erc20Options } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import { useAccount, useContractRead } from "wagmi";

function usePDNBalance({ account: userAccount } = {}) {
  const { address } = useAccount();

  const account = userAccount || address;

  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.PDN_BALANCE, [account]);

  const query = useContractRead({ ...options });

  return {
    ...query,
    balance: !!query?.data ? Number(query.data) : null,
    roundedBalance: query.data ? utils.formatEther(query.data) : query.data,
    fetchPDNBalance: query.refetch,
  };
}

export { usePDNBalance };

import { utils } from "ethers";
import { erc20Options } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import { useAccount } from "wagmi";

function usePDNBalance({ account: userAccount } = {}) {
  const { address } = useAccount();

  const account = userAccount || address;

  const options = erc20Options(account, SMART_CONTRACT_FUNCTIONS.PDN_BALANCE, {
    account,
  });

  const result = null; // useWeb3ExecuteFunction(options);

  return {
    ...result,
    balance: !!result?.data ? Number(result.data) : null,
    roundedBalance: result.data ? utils.formatEther(result.data) : result.data,
    fetchPDNBalance: result.fetch,
  };
}

export { usePDNBalance };

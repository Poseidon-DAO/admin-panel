import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { erc20Options } from "src/contracts/sc-options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";

function usePDNBalance({ account: userAccount } = {}) {
  const { Moralis, user } = useMoralis();

  const account = userAccount || user?.get("ethAddress");

  const options = erc20Options(account, SMART_CONTRACT_FUNCTIONS.PDN_BALANCE, {
    account,
  });

  const result = useWeb3ExecuteFunction(options);

  return {
    ...result,
    balance: !!result?.data ? Number(result.data) : null,
    roundedBalance: !!result?.data
      ? Number(Moralis.Units.FromWei(result.data))
      : null,
    fetchPDNBalance: result.fetch,
  };
}

export { usePDNBalance };

import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { erc20Options } from "src/contracts/options";
import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";

const makeOptions = ({ account, addresses }) =>
  erc20Options(account, SMART_CONTRACT_FUNCTIONS.RUN_AIR_DROP, {
    _addresses: addresses.map((address) => address.address),
    _amounts: addresses.map((address) => address.amount),
    _decimals: 18,
  });

function useAirdrop() {
  const { account } = useMoralis();

  const result = useWeb3ExecuteFunction(
    makeOptions({ account, addresses: [] })
  );

  return {
    ...result,
    runAirdrop: ({ addresses, onSuccess, onError }) => {
      result.fetch({
        params: makeOptions({
          account,
          addresses,
        }),
        onSuccess,
        onError,
      });
    },
  };
}

export { useAirdrop };

import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { erc20Options } from "src/abis";
import SMART_CONTRACT_FUNCTIONS from "src/smartContract";

const makeOptions = ({ account, address, amount }) =>
  erc20Options(account, SMART_CONTRACT_FUNCTIONS.TRANSFER, {
    to: address,
    amount,
  });

function useTransfer({ address, amount = 0 } = {}) {
  const { Moralis, account } = useMoralis();

  const result = useWeb3ExecuteFunction(
    makeOptions({ account, address, amount: Moralis.Units.Token(amount, 18) })
  );

  return {
    ...result,
    transfer: ({ address, amount, onSuccess, onError }) => {
      result.fetch({
        params: makeOptions({
          account,
          address,
          amount: Moralis.Units.Token(amount, 18),
        }),
        onSuccess,
        onError,
      });
    },
  };
}

export { useTransfer };

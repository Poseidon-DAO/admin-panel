import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { erc20Options } from "src/abis";

import SMART_CONTRACT_FUNCTIONS from "src/smartContract";

const makeOptions = ({ account, erc1155Address = null, ercId, ratio }) =>
  erc20Options(account, SMART_CONTRACT_FUNCTIONS.SET_ERC_1155, {
    _ERC1155Address: erc1155Address,
    _ID_ERC1155: ercId,
    _ratio: ratio,
  });

function useSetERC1155({ erc1155Address = null, ercId, ratio } = {}) {
  const { account } = useMoralis();

  const result = useWeb3ExecuteFunction(
    makeOptions({ account, erc1155Address, ercId, ratio })
  );

  return {
    ...result,
    setERC1155: ({
      erc1155Address,
      ercId,
      ratio,
      onSuccess,
      onError,
      onComplete,
    } = {}) => {
      result.fetch({
        params: makeOptions({ account, erc1155Address, ercId, ratio }),
        onSuccess,
        onError,
        onComplete,
      });
    },
  };
}

export { useSetERC1155 };

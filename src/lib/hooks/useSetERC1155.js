import { erc20Options } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

function useSetERC1155({ erc1155Address, ercId, ratio } = {}) {
  const { address } = useAccount();

  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.SET_ERC_1155, [
    erc1155Address,
    ercId,
    ratio,
  ]);

  const { config } = usePrepareContractWrite({
    ...options,
    enabled: !!address && !!erc1155Address && !!ercId && !!ratio,
  });

  const { data, write } = useContractWrite(config);

  const { isSuccess, status } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    setERC1155: write,
    setERC1155Data: data,
    setERC1155Status: status,
    isSetERC1155Success: isSuccess,
  };
}

export { useSetERC1155 };

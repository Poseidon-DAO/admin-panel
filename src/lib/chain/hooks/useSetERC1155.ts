import { erc20Options } from "src/contracts/options";

import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

type IProps = {
  erc1155Address?: string;
  ercId?: string | number;
  ratio?: string | number;
  enabled?: boolean;
};

const useSetERC1155 = ({
  erc1155Address,
  ercId,
  ratio,
  enabled = true,
}: IProps = {}) => {
  const { address } = useAccount();

  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.SET_ERC_1155, [
    erc1155Address,
    ercId,
    ratio,
  ]);

  const { config } = usePrepareContractWrite({
    ...options,
    enabled: !!address && !!erc1155Address && !!ercId && !!ratio && enabled,
  });

  const { data, write, status: writeStatus } = useContractWrite(config);

  const { isSuccess, status } = useWaitForTransaction({
    hash: data?.hash,
  });

  return {
    setERC1155: write,
    setERC1155Data: data,
    setERC1155Status: status,
    setERC1155WriteStatus: writeStatus,
    isSetERC1155Success: isSuccess,
  };
};

export { useSetERC1155 };

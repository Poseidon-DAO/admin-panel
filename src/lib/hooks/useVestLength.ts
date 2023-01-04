import { useContractRead } from "wagmi";
import { erc20Options } from "src/contracts/options";

import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";

type IProps = {
  address: string;
  enabled?: boolean;
};

const useVestLength = ({ address = "", enabled = true }: IProps) => {
  const options = erc20Options(SMART_CONTRACT_FUNCTIONS.GET_VEST_LENGTH, [
    address,
  ]);

  const query = useContractRead({
    ...options,
    enabled: !!address && enabled,
    watch: true,
  });

  return {
    vestLength: !!query.data ? Number(query.data) : null,
    vestLengthStatus: query.status,
  };
};

export { useVestLength };

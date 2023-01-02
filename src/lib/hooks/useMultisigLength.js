import { useContractRead } from "wagmi";
import { multiSigOptions } from "src/contracts/options";

import { SMART_CONTRACT_FUNCTIONS } from "src/contracts/smartContract";
import { fHex } from "src/utils/formatNumber";

const BLOCK_DURATION_SECS = 15000;

function useMultisigLength() {
  const options = multiSigOptions(SMART_CONTRACT_FUNCTIONS.GET_MULTISIG_LENGTH);

  const query = useContractRead({ ...options });

  const multisigLength =
    !!query.data && fHex(query.data._hex) * BLOCK_DURATION_SECS;

  return {
    multisigLength,
    multisigLengthStatus: query.status,
    multisigLengthError: query.error,
  };
}

export { useMultisigLength };

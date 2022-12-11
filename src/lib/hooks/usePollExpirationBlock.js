import { useContractRead } from "wagmi";
import { multiSigOptions } from "src/contracts/options";

import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import { fHex } from "src/utils/formatNumber";

const BLOCK_DURATION_SECS = 15000;

function usePollExpirationBlock({ pollId } = {}) {
  const options = multiSigOptions(
    SMART_CONTRACT_FUNCTIONS.GET_EXPIRATION_BLOCK,
    [pollId]
  );

  const query = useContractRead({ ...options });

  const expirationBlock =
    !!query.data && fHex(query.data?._hex) * BLOCK_DURATION_SECS;

  return {
    expirationBlock,
    expirationBlockStatus: query.status,
    expirationBlockError: query.error,
  };
}

export { usePollExpirationBlock };

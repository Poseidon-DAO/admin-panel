import { useContractRead, useContractReads } from "wagmi";

import { multiSigOptions } from "src/contracts/options";
import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";

function useMetadataForPoll({ activePolls }) {
  const optionsForActivePoll = activePolls.map((el) => {
    return multiSigOptions(SMART_CONTRACT_FUNCTIONS.GET_POLL_META, [el._hex]);
  });

  const query = useContractRead({
    //  ...options
  });

  console.log({ ...query });

  return {
    activePolls: query.data,
    pollsStatus: query.status,
    pollsError: query.error,
  };
}

export { useMetadataForPoll };

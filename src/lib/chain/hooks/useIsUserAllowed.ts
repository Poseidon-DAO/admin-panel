// import { multiSigOptions } from "src/contracts/options";

// import {SMART_CONTRACT_FUNCTIONS} from "src/contracts/smartContract";
import { useAccount /* useContractRead */ } from "wagmi";

// TODO: We are checking against the env var currently, and not from the multisig address since this is missing right now

const whitelistedAddressesKey = process.env.REACT_APP_WHITELISTED_ADDRESSES;
const whitelistedAddresses = (whitelistedAddressesKey || "").split(",");

const useIsUserAllowed = () => {
  const { address } = useAccount();

  // const options = multiSigOptions(
  //   SMART_CONTRACT_FUNCTIONS.GET_IS_MULTISIG_ADDRESS,
  //   [address]
  // );

  // const query = useContractRead({ ...options });

  return {
    isLoading: false,
    isAllowed: whitelistedAddresses.includes(address!),
    // isAllowed: !!query.data,
  };
};

export { useIsUserAllowed };

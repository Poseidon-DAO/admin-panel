import accessibilityABI from "./abi/Accessibility.json";
import multiSigABI from "./abi/MultiSig.json";
import erc20ABI from "./abi/Erc20.json";

export const accessibilityAdress = process.env.REACT_APP_ACCESSIBILITY_ADDRESS;
export const multiSigAddress = process.env.REACT_APP_MULTI_SIG_ADDRESS;
export const erc20Address = process.env.REACT_APP_ERC20PDN;

export const multiSigOptions = (functionName: string, args: any[] = []) => {
  return {
    address: multiSigAddress,
    functionName: functionName,
    abi: multiSigABI,
    args,
  };
};

export const accessibilityOptions = (
  functionName: string,
  args: any[] = []
) => {
  return {
    address: accessibilityAdress,
    functionName: functionName,
    abi: accessibilityABI,
    args,
  };
};

export const erc20Options = (functionName: string, args: any[] = []) => {
  return {
    address: erc20Address,
    functionName: functionName,
    abi: erc20ABI,
    args,
  };
};

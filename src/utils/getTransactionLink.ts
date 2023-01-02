import { etherscanBlockExplorers } from "wagmi";

export const getTransactionLink = (transactionHash?: string, chainId = "") => {
  const id = chainId || Number(process.env.REACT_APP_CHAIN);

  if (!transactionHash) {
    return "";
  }

  if (id === 5) {
    return `${etherscanBlockExplorers.goerli.url}/tx/${transactionHash}`;
  }

  return `${etherscanBlockExplorers.mainnet.url}/tx/${transactionHash}`;
};

import { etherscanBlockExplorers } from "wagmi";

export const getTransactionLink = (transactionHash, chainId = "") => {
  const id = chainId || Number(process.env.REACT_APP_CHAIN);

  if (id === 5) {
    return `${etherscanBlockExplorers.goerli.url}/tx/${transactionHash}`;
  }

  return `${etherscanBlockExplorers.mainnet.url}/tx/${transactionHash}`;
};

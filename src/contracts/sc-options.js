import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";

import accessibilityABI from "./abi/Accessibility.json";
import multiSigABI from "./abi/MultiSig.json";
import erc20ABI from "./abi/Erc20.json";

export const accessibilityAdress = process.env.REACT_APP_ACCESSIBILITY_ADDRESS;
export const multiSigAddress = process.env.REACT_APP_MULTI_SIG_ADDRESS;
export const accountabilityAddress =
  process.env.REACT_APP_ACOUNTABILITY_ADDRESS;
export const erc20Address = process.env.REACT_APP_ERC20PDN;

const getTopicHash = (string) => keccak256(toUtf8Bytes(string));

export const multiSigOptions = (address, functionName, args) => {
  const params = { ...args, _address: address };
  return {
    contractAddress: multiSigAddress,
    functionName: functionName,
    abi: multiSigABI,
    params,
    msgValue: 0,
  };
};

export const multiSigEventsOptions = (name, address, args) => {
  const abi = multiSigABI.filter((abi) => abi.name === name)[0];
  const params = { ...args, _address: address };
  const inputs = abi.inputs.map((a) => a.internalType).join(",");
  const topic = getTopicHash(`${name}(${inputs})`);
  return {
    chain: process.env.REACT_APP_CHAIN,
    address: multiSigAddress,
    abi,
    topic,
    params,
    limit: "3",
  };
};

export const accessibilityOptions = (address, functionName, args) => {
  const params = { ...args, _address: address };
  return {
    contractAddress: accessibilityAdress,
    functionName: functionName,
    abi: accessibilityABI,
    params,
    msgValue: 0,
  };
};

export const accessibilityEventsOptions = (name) => {
  const abi = accessibilityABI.filter((abi) => abi.name === name)[0];
  const inputs = abi.inputs.map((a) => a.internalType).join(",");
  const topic = getTopicHash(`${name}(${inputs})`);
  return {
    chain: process.env.REACT_APP_CHAIN,
    address: accessibilityAdress,
    abi,
    topic,
    limit: "3",
  };
};

export const erc20Options = (address, functionName, args = {}) => {
  const params = { ...args, _address: address };

  return {
    contractAddress: erc20Address,
    functionName: functionName,
    abi: erc20ABI,
    params,
  };
};

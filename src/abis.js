import { keccak256 } from "@ethersproject/keccak256";
import { toUtf8Bytes } from "@ethersproject/strings";

export const accessibilityAdress = process.env.REACT_APP_ACCESSIBILITY_ADDRESS;
export const multiSigAddress = process.env.REACT_APP_MULTI_SIG_ADDRESS;
export const accountabilityAddress = process.env.REACT_APP_ACOUNTABILITY_ADDRESS;

export const accessibilityABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "smartContractReference",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "bytes4",
				"name": "functionSignature",
				"type": "bytes4"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "groupReference",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "Accessibility",
				"type": "bool"
			}
		],
		"name": "ChangeGroupAccessibilityEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "caller",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newGroup",
				"type": "uint256"
			}
		],
		"name": "ChangeUserGroupEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "version",
				"type": "uint8"
			}
		],
		"name": "Initialized",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "DAOCreator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_newDAOCreator",
				"type": "address"
			}
		],
		"name": "changeDAOCreator",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4[]",
				"name": "_functionSignatureList",
				"type": "bytes4[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_userGroupList",
				"type": "uint256[]"
			}
		],
		"name": "disableSignature",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4[]",
				"name": "_functionSignatureList",
				"type": "bytes4[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_userGroupList",
				"type": "uint256[]"
			}
		],
		"name": "enableSignature",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "freeze",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes4",
				"name": "_functionSignature",
				"type": "bytes4"
			},
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getAccessibility",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getDAOCreator",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getIsFrozen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMultiSigRefAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_userAddress",
				"type": "address"
			}
		],
		"name": "getUserGroup",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "isFrozen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_multiSigRefAddress",
				"type": "address"
			}
		],
		"name": "multiSigInitialize",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "multiSigRefAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "restoreIsFrozen",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address[]",
				"name": "_userAddress",
				"type": "address[]"
			},
			{
				"internalType": "uint256[]",
				"name": "_userGroup",
				"type": "uint256[]"
			}
		],
		"name": "setUserListRole",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export const multiSigABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pollIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "voteReceiver",
				"type": "address"
			}
		],
		"name": "ChangeStatementMultisigPollEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "version",
				"type": "uint8"
			}
		],
		"name": "Initialized",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pollIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pollType",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "voteReceiver",
				"type": "address"
			}
		],
		"name": "NewMultisigPollEvent",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "voter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pollIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "vote",
				"type": "uint256"
			}
		],
		"name": "VoteMultisigPollEvent",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ERC20Address",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "accessibilitySettingsAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pollTypeID",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_voteReceiverAddress",
				"type": "address"
			}
		],
		"name": "createMultiSigPoll",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pollID",
				"type": "uint256"
			}
		],
		"name": "getExpirationBlockTime",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			}
		],
		"name": "getIsMultiSigAddress",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getListOfActivePoll",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getMultiSigLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pollID",
				"type": "uint256"
			}
		],
		"name": "getPollMetaData",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_voter",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_pollID",
				"type": "uint256"
			}
		],
		"name": "getVoterVote",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "indexPoll",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_accessibilitySettingsAddress",
				"type": "address"
			},
			{
				"internalType": "address[]",
				"name": "_multiSigAddresses",
				"type": "address[]"
			}
		],
		"name": "initialize",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "multiSigDAO",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "multiSigLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "multiSigPoll",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "pollType",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "pollBlockStart",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "voteReceiverAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amountApprovedVoteReceiver",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_ERC20Address",
				"type": "address"
			}
		],
		"name": "setERC1155Address",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pollIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_vote",
				"type": "uint256"
			}
		],
		"name": "voteMultiSigPoll",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const getTopicHash = (string) => keccak256(toUtf8Bytes(string));

export const multiSigOptions = (address, functionName, args) => {
	const params = {...args, _address: address}
	return {
    contractAddress: multiSigAddress,
    functionName: functionName,
    abi: multiSigABI,
    params,
    msgValue: 0
    
  }
};

export const multiSigEventsOptions = ( name ) => {
	const abi = multiSigABI.filter(abi => abi.name === name)[0];
	const inputs = abi.inputs.map(a => a.internalType).join(",");
	const topic = getTopicHash(`${name}(${inputs})`);
	return {
		chain: process.env.REACT_APP_CHAIN,
    address: multiSigAddress,
    abi,
		topic,
		limit: '3',
  }
};

export const accessibilityOptions = (address, functionName, args) => {
	const params = {...args, _address: address};
	console.log(functionName)
	return {
		contractAddress: accessibilityAdress,
    functionName: functionName,
    abi: accessibilityABI,
    params,
    msgValue: 0
    
  }
};

export const accessibilityEventsOptions = ( name ) => {
	const abi = accessibilityABI.filter(abi => abi.name === name)[0];
	const inputs = abi.inputs.map(a => a.internalType).join(",");
	const topic = getTopicHash(`${name}(${inputs})`);
	return {
		chain: process.env.REACT_APP_CHAIN,
		address: accessibilityAdress,
		abi,
		topic,
		limit: '3',
	}
};

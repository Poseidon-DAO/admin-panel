
export const accessibilityAdress = "0xfB9B43504B109c44809C541f9EABc0eF64AdDb7e";
export const multiSigAddress = "0x01f79308f1ADa2cfA990D2a8a119Af2AD9741AdE";

export const accessibilityABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
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
				"internalType": "address",
				"name": "voted",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pollType",
				"type": "uint256"
			}
		],
		"name": "ChangeStatementMultisigPollEvent",
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
				"internalType": "address",
				"name": "voteFor",
				"type": "address"
			}
		],
		"name": "VoteMultisigPollEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_pollTypeID",
				"type": "uint256"
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
				"name": "_pollIndex",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_voteForAddress",
				"type": "address"
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
		"stateMutability": "nonpayable",
		"type": "constructor"
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
		"name": "getMultiSigPollHasVoted",
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
				"name": "_voteFor",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_pollID",
				"type": "uint256"
			}
		],
		"name": "getMultiSigPollVotes",
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
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]



// Rinkeby Testnet

// Pbl: 0xB6097b6932ad88D1159c10bA7D290ba05087507D
// Pvt: 0x05da23ac61f6033d09e69470b9b1f6afcc98214451b78164ee0017e474ebd75a

// Pbl: 0x7db3c4099660a6f33bBfF63B3318CBf9b4D07743
// Pvt: 0x9723825bcb901c7fa2bb209763eb12d02a2fa233f3b31bda1c9256c2c76507e5

// Pbl: 0x0a767592E4C4CbD5A65BAc08bd3c7112d68496A5
// Pvt: 0x9e5173918505a0917dbb5a2c40ecdeecb11fb48f88dc5a9e84a968174dc2910f

// Pbl: 0x3d6AD09Ed37447b963A7f5470bF6C0003D36dEe3
// Pvt: 0xc41927c6c49d5e09b0b6b93be73f1420ed6b381614fbb824f37af79fe78480cd

// Owner

// Pbl: 0xDc3A186fB898669023289Fd66b68E4016875E011
// Pvt: 0x17793bb885773856ac0a6f534f9484e74c1164bd545659b95419c430bbba5904

export const multiSigOptions = (address, functionName, args) => {
	const params = {...args, _address: address}
	return {
    contractAddress: multiSigAddress,
    functionName: functionName,
    abi: multiSigABI,
    params,
    msgValue: 0
    
  }
}

export const multiSigEventsOptions = (topic, args) => {
	const params = {...args }
	return {
    address: multiSigAddress,
    abi: multiSigABI.filter(abi => abi.name === topic)[0],
		topic,
		limit: '3',
		params,
  }
}

export const accessibilityOptions = (address, functionName, args) => {
	const params = {...args, _address: address};
	return {
		contractAddress: accessibilityAdress,
    functionName: functionName,
    abi: accessibilityABI,
    params,
    msgValue: 0
    
  }
}

export const accessibilityEventsOptions = (topic, args) => {
	const params = { ...args }
	return {
		address: accessibilityAdress,
		abi: accessibilityABI.filter(abi => abi.name === topic)[0],
		topic,
		limit: '3',
		params
	}
}

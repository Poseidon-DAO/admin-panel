export const NetworkTypes = {
  "0x1": "Mainnet",
  "0x3": "Ropsten",
  "0x4": "Rinkeby",
  "0x2a": "Kovan",
  "0x5": "Goerli",
};

export const PollTypes = {
  'change_creator': process.env.REACT_APP_CHANGE_CREATOR,
  'delete_address_multisig': process.env.REACT_APP_DELETE_ADDRESS,
  'add_address_multisig': process.env.REACT_APP_ADD_ADDRESS,
  'unfreeze': process.env.REACT_APP_UNFREEZE,
  'change_pdn_smart_contract_owner': process.env.REACT_APP_CHANGE_OWNER,
}
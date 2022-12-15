// FUNCTIONS
const GET_IS_MULTISIG_ADDRESS = "getIsMultiSigAddress";
const CHECK_IS_FROZEN = "getIsFrozen";
const CREATE_MULTISIG_POLL = "createMultiSigPoll";
const VOTE_MULTISIG_POLL = "voteMultiSigPoll";
const FREEZE_DAO = "freeze";
const RESTORE_DAO_FREEZE = "restoreIsFrozen";
const GET_ACTIVE_POLLS = "getListOfActivePoll";
const GET_EXPIRATION_BLOCK = "getExpirationBlockTime";
const EVENT_NEW_MULTISIG = "NewMultisigPollEvent";
const GET_VOTE = "getVoterVote";
const GET_MULTISIG_LENGTH = "getMultiSigLength";
const RUN_AIR_DROP = "runAirdrop";
const RUN_AIR_DROP_VESTING = "airdropVest";
const TRANSFER = "transfer";
const PDN_BALANCE = "balanceOf";
const SYMBOL = "symbol";
const GET_ERC1155_ADDRESS = "ERC1155Address";
const GET_ERC1155_ID = "ID_ERC1155";
const GET_RATIO = "ratio";
const SET_ERC_1155 = "setERC1155";
const GET_SECURITY_DELAY_IN_BLOCKS = "securityDelayInBlocks";
const SET_SECURITY_DELAY_IN_BLOCKS = "setSecurityDelay";
const GET_VEST_LENGTH = "getVestLength";
const GET_VEST_METADATA = "getVestMetaData";

// EVENTS
const GET_POLL_META = "getPollMetaData";
const EVENT_VOTE_MULTISIG = "VoteMultisigPollEvent";

const SMART_CONTRACT_FUNCTIONS = {
  // Functions
  GET_IS_MULTISIG_ADDRESS,
  CHECK_IS_FROZEN,
  CREATE_MULTISIG_POLL,
  GET_MULTISIG_LENGTH,
  VOTE_MULTISIG_POLL,
  FREEZE_DAO,
  RESTORE_DAO_FREEZE,
  GET_POLL_META,
  GET_VOTE,
  GET_ACTIVE_POLLS,
  GET_EXPIRATION_BLOCK,
  RUN_AIR_DROP,
  RUN_AIR_DROP_VESTING,
  TRANSFER,
  PDN_BALANCE,
  SYMBOL,
  GET_ERC1155_ADDRESS,
  GET_ERC1155_ID,
  GET_RATIO,
  SET_ERC_1155,
  GET_SECURITY_DELAY_IN_BLOCKS,
  SET_SECURITY_DELAY_IN_BLOCKS,
  GET_VEST_LENGTH,
  GET_VEST_METADATA,

  // Events
  EVENT_NEW_MULTISIG,
  EVENT_VOTE_MULTISIG,
};

export default SMART_CONTRACT_FUNCTIONS;

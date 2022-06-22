const GET_IS_MULTISIG_ADDRESS = "getIsMultiSigAddress";
const CHECK_IS_FROZEN = "getIsFrozen";
const CREATE_MULTISIG_POLL = "createMultiSigPoll";
const VOTE_MULTISIG_POLL = "voteMultiSigPoll";
const FREEZE_DAO = "freeze";
const GET_ACTIVE_POLLS = "getListOfActivePoll";
const GET_EXPIRATION_BLOCK = "getExpirationBlockTime";
const EVENT_NEW_MULTISIG = "NewMultisigPollEvent";
const GET_POLL_META = "getPollMetaData";
const GET_VOTE = "getVoterVote";

const SMART_CONTRACT_FUNCTIONS = {
  // Functions
  GET_IS_MULTISIG_ADDRESS,
  CHECK_IS_FROZEN,
  CREATE_MULTISIG_POLL,
  VOTE_MULTISIG_POLL,
  FREEZE_DAO,
  GET_POLL_META,
  GET_VOTE,
  GET_ACTIVE_POLLS,
  GET_EXPIRATION_BLOCK,
  // Events
  EVENT_NEW_MULTISIG,
};

export default SMART_CONTRACT_FUNCTIONS;

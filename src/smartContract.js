const GET_IS_MULTISIG_ADDRESS = 'getIsMultiSigAddress'
const CHECK_IS_FROZEN = 'getIsFrozen';
const CREATE_MULTISIG_POLL = 'createMultiSigPoll';
const VOTE_MULTISIG_POLL = 'voteMultiSigPoll';
const FREEZE_DAO = 'freeze';
const GET_ACTIVE_POLLS = 'getListOfActivePoll';
const EVENT_NEW_MULTISIG = 'NewMultisigPollEvent';

const SMART_CONTRACT_FUNCTIONS = {
  // Functions
  GET_IS_MULTISIG_ADDRESS,
  CHECK_IS_FROZEN,
  CREATE_MULTISIG_POLL,
  VOTE_MULTISIG_POLL,
  FREEZE_DAO,
  // Events
  EVENT_NEW_MULTISIG
}

export default SMART_CONTRACT_FUNCTIONS;

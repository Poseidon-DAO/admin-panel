// components
import Page from '../components/Page';
import SMART_CONTRACT_FUNCTIONS from 'src/smartContract';
import FunctionsMenu from 'src/components/FunctionsMenu';

// ----------------------------------------------------------------------

const availableFunctions = [
  {
    name: "Create Poll", 
    functionName: SMART_CONTRACT_FUNCTIONS.CREATE_MULTISIG_POLL,
    args: {
      _pollTypeID: 1,
    },
    event: SMART_CONTRACT_FUNCTIONS.NEW_MULTISIG_EVENT,
  }, 
  {
    name: "Vote",
    functionName: SMART_CONTRACT_FUNCTIONS.VOTE_MULTISIG_POLL
  },
]

export default function MultiSig() {
  return (
    <Page title="Dashboard: MULTISIG">
      <FunctionsMenu isMultiSig availableFunctions={availableFunctions}/>
    </Page>
  );
}

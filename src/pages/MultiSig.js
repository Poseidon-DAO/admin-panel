// components
import Page from '../components/Page';
import SMART_CONTRACT_FUNCTIONS from 'src/smartContract';
import FunctionsMenu from 'src/components/FunctionsMenu';

// ----------------------------------------------------------------------

const availableFunctions = [
  {
    name: "Create Poll", 
    functionName: SMART_CONTRACT_FUNCTIONS.CREATE_MULTISIG_POLL,
    inputRequired: true,
    args: [{
      name: "_pollTypeID",
      type: Number
    }, 
    {
      name: "_voteReceiverAddress",
      type: String 
    }],
    event: {
      name: SMART_CONTRACT_FUNCTIONS.EVENT_NEW_MULTISIG,
      args: {
        pollType: 3,
        pollIndex: 1,
        creator: '0x3d6AD09Ed37447b963A7f5470bF6C0003D36dEe3',
      },
      topic: "0x254281af94dadbfad557c2cdaea9d8277144968e60de2579b5102bffcfc1516d"
    }
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

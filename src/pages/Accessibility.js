import Page from "../components/Page";
import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import FunctionsMenu from "src/components/FunctionsMenu";

const availableFunctions = [
  {
    name: "Freeze DAO",
    functionName: SMART_CONTRACT_FUNCTIONS.FREEZE_DAO,
    args: {},
    event: null,
  },
];

export default function Accessibility() {
  return (
    <Page title="Dashboard: ACCESSIBILITY">
      <FunctionsMenu availableFunctions={availableFunctions} />
    </Page>
  );
}

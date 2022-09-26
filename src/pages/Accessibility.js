import Page from "../components/Page";
import SMART_CONTRACT_FUNCTIONS from "src/contracts/smartContract";
import FunctionsMenu from "src/components/FunctionsMenu";

const availableFunctions = [
  {
    name: "Freeze DAO",
    functionName: SMART_CONTRACT_FUNCTIONS.FREEZE_DAO,
    args: {},
    event: SMART_CONTRACT_FUNCTIONS.FREEZE_DAO,
  },
];

export default function Accessibility({ sectionTitle }) {
  return (
    <Page title="Accessibility">
      <FunctionsMenu
        availableFunctions={availableFunctions}
        sectionTitle={sectionTitle}
      />
    </Page>
  );
}

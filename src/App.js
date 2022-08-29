import { MoralisProvider } from "react-moralis";

import ThemeProvider from "src/theme";
import ScrollToTop from "src/components/ScrollToTop";
import { BaseOptionChartStyle } from "src/components/chart/BaseOptionChart";

import Router from "./routes";

export default function App() {
  return (
    <ThemeProvider>
      <MoralisProvider
        appId={process.env.REACT_APP_MORALIS_ID}
        serverUrl={process.env.REACT_APP_MORALIS_URL}
      >
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </MoralisProvider>
    </ThemeProvider>
  );
}

import "@fontsource/roboto";

import ScrollToTop from "src/components/ScrollToTop";
import { BaseOptionChartStyle } from "src/components/chart/BaseOptionChart";

import Router from "./routes";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <Router />
    </>
  );
}

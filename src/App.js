// routes
import { MoralisProvider } from "react-moralis";
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { createContext, useMemo, useState } from "react";

export const Store = createContext({
  auth: {},
  setAuth: () => {},
  currentNetwork: '',
  setCurrentNetwork: () => {},
});

export default function App() {
  const [auth, setAuth] = useState({});
  const [currentNetwork, setCurrentNetwork] = useState("");
  const value = useMemo(
    () => ({ auth, setAuth, currentNetwork, setCurrentNetwork }), 
    [auth, currentNetwork]
  );

  return (
    <ThemeProvider>
      <MoralisProvider
        appId={process.env.REACT_APP_MORALIS_ID}
        serverUrl={process.env.REACT_APP_MORALIS_URL}
      >
        <Store.Provider value={value}>
          <ScrollToTop />
          <BaseOptionChartStyle />
          <Router />
        </Store.Provider>
      </MoralisProvider>
    </ThemeProvider>
  );
}

// routes
import { MoralisProvider } from "react-moralis";
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';


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

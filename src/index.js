import "simplebar/src/simplebar.css";

import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";

import ThemeProvider from "src/theme";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";

const { provider } = configureChains(
  [chain.goerli],
  [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID })]
);

const client = createClient({
  autoConnect: true,
  provider,
});

ReactDOM.render(
  <HelmetProvider>
    <BrowserRouter>
      <ThemeProvider>
        <WagmiConfig client={client}>
          <App />
        </WagmiConfig>
      </ThemeProvider>
    </BrowserRouter>
  </HelmetProvider>,
  document.getElementById("root")
);

// If you want to enable client cache, register instead.
serviceWorker.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

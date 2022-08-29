import { useEffect } from "react";
import { useMoralis } from "react-moralis";

function useChainChange({ onChange = () => {} } = {}) {
  const { Moralis, enableWeb3, isWeb3Enabled } = useMoralis();

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isWeb3Enabled]);

  useEffect(() => {
    const unsubscribeChainChangeHandler = Moralis.onChainChanged(onChange);

    return () => unsubscribeChainChangeHandler();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { useChainChange };

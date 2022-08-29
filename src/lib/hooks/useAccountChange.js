import { useEffect } from "react";
import { useMoralis } from "react-moralis";

function useAccountChange({ onChange } = {}) {
  const { Moralis } = useMoralis();

  useEffect(() => {
    const unsubscribeAccountChangeHandler = Moralis.onAccountChanged(onChange);

    return () => unsubscribeAccountChangeHandler();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { useAccountChange };

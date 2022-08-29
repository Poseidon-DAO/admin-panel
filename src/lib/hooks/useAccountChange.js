import { useEffect } from "react";
import { useMoralis } from "react-moralis";

function useAccountChange(callback) {
  const { Moralis } = useMoralis();

  useEffect(() => {
    const unsubscribeAccountChangeHandler = Moralis.onAccountChanged(callback);

    return () => unsubscribeAccountChangeHandler();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

export { useAccountChange };

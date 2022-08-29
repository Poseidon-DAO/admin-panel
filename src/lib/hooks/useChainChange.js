import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";

function useChainChange(callback) {
  const { Moralis } = useMoralis();
  const [chain, setChain] = useState("");

  // TODO add toast for chain change
  useEffect(() => {
    const unsubscribeChainChangeHandler = Moralis.onChainChanged((chain) => {
      setChain(chain);

      if (
        chain === Moralis.Chains.ETH_MAINET ||
        chain === Moralis.Chains.ETH_RINKBEY
      )
        return;

      callback?.();

      // if (toast.isActive(toastId)) return;

      // toast({
      //   id: toastId,
      //   position: "top-right",
      //   status: "warning",
      //   title: "Please connect to mainnet!",
      // });
    });

    return () => unsubscribeChainChangeHandler();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return chain;
}

export { useChainChange };

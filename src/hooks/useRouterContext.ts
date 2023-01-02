import { useOutletContext } from "react-router-dom";

type ContextType = {
  refetchBalance: () => void;
  balance: string;
  symbol: string;
};

export function useRouterContext() {
  return useOutletContext<ContextType>();
}

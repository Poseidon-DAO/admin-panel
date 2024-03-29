import { ethers } from "ethers";
import { type TransferEventLog } from "src/lib/api/types/TransferEventLog";

export function makeChartData(
  data: Record<number | string, TransferEventLog[]>
) {
  return Object.values(data).reduce<number[]>((acc, curr) => {
    const totalForDay = curr.reduce((sumForDay, item) => {
      return (sumForDay +=
        item.functionName === "burnAndReceiveNFT"
          ? Number(item.data)
          : Number(ethers.utils.formatEther(item.data)));
    }, 0);

    acc.push(totalForDay);

    return acc;
  }, []);
}

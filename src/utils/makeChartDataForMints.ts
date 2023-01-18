import { type TransferEventLogForMint } from "src/lib/api/types/TransferEventLog";

export function makeChartDataForMints(
  data: Record<number, TransferEventLogForMint[]>
) {
  return Object.values(data).reduce<number[]>((acc, curr) => {
    const totalForDay = curr.reduce((sumForDay, item) => {
      return (sumForDay += item.gNft);
    }, 0);

    acc.push(totalForDay);

    return acc;
  }, []);
}

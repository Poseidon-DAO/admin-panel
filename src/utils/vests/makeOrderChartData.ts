import { ethers } from "ethers";
import format from "date-fns/format";
import subDays from "date-fns/subDays";
import { type TransferEventLog } from "src/lib/api/types/TransferEventLog";

export function makeOrderChartData(data: Record<number, TransferEventLog[]>) {
  return Object.entries(data).reduce<
    { label: string; formattedLabel: string; value: number }[]
  >((acc, [key, itemsArr]) => {
    const totalForDay = itemsArr.reduce((sumForDay, item) => {
      return (sumForDay +=
        item.functionName === "burnAndReceiveNFT"
          ? Number(item.data)
          : Number(ethers.utils.formatEther(item.data)));
    }, 0);

    const newItem = {
      label: !!itemsArr.length
        ? format(new Date(itemsArr[0].blockDate!), "d/MM")
        : format(subDays(new Date(), 7 - Number(key)), "d/MM"),
      formattedLabel: !!itemsArr.length
        ? format(new Date(itemsArr[0].blockDate!), "d/MM/y")
        : format(subDays(new Date(), 7 - Number(key)), "d/MM/y"),
      value: totalForDay,
    };

    acc.push(newItem);

    return acc;
  }, []);
}

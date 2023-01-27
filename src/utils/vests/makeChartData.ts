import { format } from "date-fns";
import { ethers } from "ethers";
import { type TransferEventLog } from "src/lib/api/types/TransferEventLog";

export function makeChartData(
  data: Record<number | string, TransferEventLog[]>
) {
  const labels: string[] = [];

  const values = Object.values(data).reduce<number[]>((acc, curr) => {
    const totalForDay = curr.reduce((sumForDay, item) => {
      const dataWithoutOx = item.data.substring(2, item.data.length);

      const arrayOfDataInHex = [];
      for (let i = 0; i < dataWithoutOx.length; i += 64) {
        arrayOfDataInHex.push(`0x${dataWithoutOx.slice(i, i + 64)}`);
      }

      const amountForVesting = arrayOfDataInHex[1];

      return (sumForDay += Number(ethers.utils.formatEther(amountForVesting)));
    }, 0);

    labels.push(format(new Date(curr[0].blockDate!), "d/MM/y"));

    acc.push(totalForDay);

    return acc;
  }, []);

  return { values, labels };
}

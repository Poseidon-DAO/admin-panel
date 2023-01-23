import { format } from "date-fns";

import { type TransferEventLog } from "src/lib/api/types/TransferEventLog";

export function groupAirdropsByDate(airdrops: TransferEventLog[]) {
  const groupedAirdrops = airdrops.reduce<Record<string, TransferEventLog[]>>(
    (allGroupedLogs, currTransfer) => {
      const date = format(new Date(currTransfer.blockDate!), "d/MM/y");

      return {
        ...allGroupedLogs,
        [date]: [...(allGroupedLogs[date] || []), currTransfer],
      };
    },
    {}
  );

  return {
    groupedAirdrops,
  };
}

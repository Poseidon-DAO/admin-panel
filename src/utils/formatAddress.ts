export function formatAddress(address: string, charsToSlice: number) {
  if (!address) return;

  return (
    address?.substring(0, charsToSlice || 4) +
    "..." +
    address?.substring(address.length - charsToSlice || 4)
  );
}

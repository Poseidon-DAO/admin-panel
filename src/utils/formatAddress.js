export function formatAddress(address, charsToSlice) {
  if (!address) return;

  return (
    address?.substring(0, charsToSlice || 4) +
    "..." +
    address?.substring(address.length - charsToSlice || 4)
  );
}

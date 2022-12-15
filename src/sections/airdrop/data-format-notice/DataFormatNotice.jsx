function DataFormatNotice({ isVestingActive = false }) {
  const notice = isVestingActive
    ? "File format should have the ETH address in the first column, the amount in the second column and the blocks for vesting in the third column in order to show the data correctly."
    : "File format should have the ETH address in the first column and the amount in the second column in order to show the data correctly.";

  const example = isVestingActive
    ? " 0x850EdEfE0A1d573057a695B870Ada74116F8E3d0, 10, 5471"
    : " 0x850EdEfE0A1d573057a695B870Ada74116F8E3d0, 10";

  return (
    <div>
      {notice}
      <br />
      E.g.
      <br />
      {example}
    </div>
  );
}

export default DataFormatNotice;

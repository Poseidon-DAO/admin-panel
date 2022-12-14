import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import BurnRatio from "src/sections/settings/burn-ratio/BurnRatio";
import FreezeDao from "src/sections/settings/freeze-dao/FreezeDao";
import VestingBlocks from "src/sections/settings/vesting-blocks/VestingBlocks";

export default function SettingsLayout() {
  return (
    <Box>
      <ItemWrapper>
        <FreezeDao />
      </ItemWrapper>

      <ItemWrapper>
        <BurnRatio />
      </ItemWrapper>

      <ItemWrapper>
        <VestingBlocks />
      </ItemWrapper>
    </Box>
  );
}

const ItemWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: 98,
  paddnig: "3 2",
  border: `1px solid ${theme.palette.divider}`,
  borderWidth: "0 0 1px 0",
  "&:first-child": {
    borderWidth: "1px 0 1px 0",
  },
}));

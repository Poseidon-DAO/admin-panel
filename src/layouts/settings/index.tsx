import { type FC } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import FreezeDao from "src/sections/settings/freeze-dao/FreezeDao";
import AllowBurn from "src/sections/settings/allow-burn/AllowBurn";
import BurnRatio from "src/sections/settings/burn-ratio/BurnRatio";
import VestingBlocks from "src/sections/settings/vesting-blocks/VestingBlocks";

const SettingsLayout: FC = () => {
  return (
    <Box>
      <ItemWrapper>
        <FreezeDao />
      </ItemWrapper>

      <ItemWrapper>
        <AllowBurn />
      </ItemWrapper>

      <ItemWrapper>
        <BurnRatio />
      </ItemWrapper>

      <ItemWrapper>
        <VestingBlocks />
      </ItemWrapper>
    </Box>
  );
};

const ItemWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  height: 98,
  paddnig: "3 2",
  border: `1px solid ${theme.palette.divider}`,
  borderWidth: "0 0 1px 0",
  "&:first-of-type": {
    borderWidth: "1px 0 1px 0",
  },
}));

export default SettingsLayout;

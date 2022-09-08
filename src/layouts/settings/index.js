import { useState } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import SettingsSidebar from "./SettingsSidebar";
import SettingsContent from "./SettingsContent";

import TokenSettings from "src/sections/settings/token-settings/TokenSettings";

const settingsNavConfig = [
  {
    title: "Token",
    path: "/app/settings",
    icon: null,
    element: <TokenSettings />,
  },
  {
    title: "Airdrop",
    path: "/app/settings",
    icon: null,
    element: null,
  },
];

export default function SettingsLayout() {
  const [activeItem, setActiveItem] = useState("Token");

  function handleItemClick(itemTitle) {
    setActiveItem(itemTitle);
  }

  const ContentElement = settingsNavConfig.find(
    (settings) => settings.title === activeItem
  ).element;

  return (
    <RootStyle>
      <Box>
        <SidebarWrapper>
          <SettingsSidebar
            activeItem={activeItem}
            onItemChange={handleItemClick}
            items={settingsNavConfig}
          />
        </SidebarWrapper>

        <Content>
          <SettingsContent content={ContentElement} />
        </Content>
      </Box>
    </RootStyle>
  );
}

const RootStyle = styled("div")({
  position: "relative",

  "& > div": {
    width: "100%",
    position: "absolute",
  },
});

const SidebarWrapper = styled(Box)(({ theme }) => ({
  height: "calc(100vh - 244px)",
  width: "280px",
  position: "fixed",
  borderRight: `1px solid ${theme.palette.divider}`,
}));

const Content = styled("div")(() => ({
  marginLeft: "280px",
  width: "calc(100% - 280px)",
  minHeight: "calc(100vh - 244px)",
}));

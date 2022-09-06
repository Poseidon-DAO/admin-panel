import { Box, List } from "@mui/material";
import { useState } from "react";
import NavItem from "src/components/NavItem";

const settingsNavConfig = [
  {
    title: "Token",
    path: "/app/settings",
    icon: null,
  },
  {
    title: "Airdrop",
    path: "/app/settings",
    icon: null,
  },
];

export default function SettingsSidebar() {
  const [activeItem, setActiveItem] = useState("Token");

  function handleItemClick(item) {
    setActiveItem(item.title);
  }

  return (
    <Box sx={{ pr: 5 }}>
      <List>
        {settingsNavConfig.map((item) => (
          <NavItem
            key={item.title}
            item={item}
            active={() => activeItem === item.title}
            variant="secondary"
            onItemClick={handleItemClick}
          />
        ))}
      </List>
    </Box>
  );
}

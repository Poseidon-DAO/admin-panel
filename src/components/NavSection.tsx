import { type FC, type ElementType } from "react";
import { matchPath, useLocation } from "react-router-dom";
import { Box, List } from "@mui/material";

import NavItem from "./NavItem";

interface IProps {
  navConfig: {
    title: string;
    path: string;
    icon: ElementType;
  }[];
}

const NavSection: FC<IProps> = ({ navConfig }) => {
  const { pathname } = useLocation();

  const match = (path: string) =>
    path ? !!matchPath({ path, end: false }, pathname) : false;

  return (
    <Box>
      <List disablePadding sx={{ p: 1 }}>
        {navConfig.map((item) => (
          <NavItem key={item.title} item={item} active={match} />
        ))}
      </List>
    </Box>
  );
};

export default NavSection;

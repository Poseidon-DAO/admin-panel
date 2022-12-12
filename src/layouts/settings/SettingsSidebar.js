import PropTypes from "prop-types";
import { Box, List } from "@mui/material";
import NavItem from "src/components/NavItem";

SettingsSidebar.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      icon: PropTypes.node,
      element: PropTypes.node,
    })
  ),
  activeItem: PropTypes.string.isRequired,
  onItemChange: PropTypes.func.isRequired,
};

export default function SettingsSidebar({ items, activeItem, onItemChange }) {
  function handleItemClick(item) {
    onItemChange(item.title);
  }

  return (
    <Box sx={{ pr: 5 }}>
      <List>
        {items.map((item) => (
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

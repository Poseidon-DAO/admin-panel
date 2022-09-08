import PropTypes from "prop-types";
import { Box } from "@mui/material";

SettingsContent.propTypes = {
  content: PropTypes.node,
};

SettingsContent.defaultProps = {
  content: <></>,
};

export default function SettingsContent({ content }) {
  return <Box>{content}</Box>;
}

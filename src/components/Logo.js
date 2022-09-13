import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { Box } from "@mui/material";

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  roundedCorners: PropTypes.bool,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Logo.defaultProps = {
  disabledLink: false,
  roundedCorners: false,
  width: 150,
};

export default function Logo({ disabledLink, width, roundedCorners }) {
  const logo = (
    <Box width={width}>
      <img
        src="/static/logo.png"
        alt="logo"
        style={{ borderRadius: roundedCorners ? "12px" : 0 }}
      />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return <RouterLink to="/">{logo}</RouterLink>;
}

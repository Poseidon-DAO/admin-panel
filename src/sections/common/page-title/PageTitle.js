import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import useWindowScroll from "src/hooks/useWindowScroll";

PageTitle.defaultProps = {
  children: "",
  position: "page",
};

function PageTitle({ children, position }) {
  const scrollPosition = useWindowScroll();

  const isPageTitle = position === "page";

  if (isPageTitle) {
    return (
      <Typography
        variant="h4"
        sx={{
          mb: 5,
          visibility: scrollPosition <= 30 ? "visible" : "hidden",
        }}
      >
        {children}
      </Typography>
    );
  }

  return (
    <FadingInTypography
      variant="h4"
      sx={{ visibility: scrollPosition > 30 ? "visible" : "hidden" }}
    >
      {children}
    </FadingInTypography>
  );
}

const FadingInTypography = styled(Typography)`
  animation: fade-in ease 1s;

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export default PageTitle;

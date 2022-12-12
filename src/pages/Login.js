import { styled } from "@mui/material/styles";
import { Box, Card, Container, Typography } from "@mui/material";
import useResponsive from "../hooks/useResponsive";
import Page from "../components/Page";
import Logo from "../components/Logo";
import AuthMetamask from "../sections/auth/AuthMetamask";

export default function Login() {
  const mdUp = useResponsive("up", "md");

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo disabledLink />
        </HeaderStyle>

        {mdUp && (
          <SectionStyle square>
            <Container maxWidth="xl">
              <ContentStyle>
                <Typography variant="h1" color="white">
                  Welcome Back
                </Typography>
                <Typography color="white" variant="h4">
                  Connect Metamask <br /> to access the admin panel
                </Typography>
                <Typography color="white" variant="h3" marginTop={4}>
                  ⬇
                </Typography>

                <Box>
                  <AuthMetamask />
                </Box>
              </ContentStyle>
            </Container>
          </SectionStyle>
        )}
      </RootStyle>
    </Page>
  );
}

const RootStyle = styled("div")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "flex",
  },
}));

const HeaderStyle = styled("header")(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: "100%",
  display: "flex",
  alignItems: "center",
  position: "absolute",
  justifyContent: "space-between",
  padding: `0 ${theme.spacing(3)}`,
  [theme.breakpoints.up("md")]: {
    alignItems: "flex-start",
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: "100%",
  height: `calc(100vh - ${theme.spacing(0)})`,
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  boxSizing: "border-box",
  borderRadius: 0,
  background:
    " linear-gradient(142deg, rgba(73,36,252,1) 17%, rgba(255,255,255,1) 100%)",
}));

const ContentStyle = styled("div")(({ theme }) => ({
  maxWidth: 500,
  margin: "auto",
  height: "100%",
  textAlign: "center",
  padding: theme.spacing(12, 0),
}));

import { useConnect } from "wagmi";
import { styled } from "@mui/material/styles";
import { Button, Card, Container, Typography, useTheme } from "@mui/material";

import Page from "../components/Page";
import Logo from "../components/Logo";

import metamask from "../assets/metamask-logo.png";

export default function Login() {
  const theme = useTheme();

  const { connect, connectors } = useConnect();

  const handleLogin = () => {
    connect({ connector: connectors[0] });
  };

  return (
    <Page title="Login">
      <RootStyle>
        <HeaderStyle>
          <Logo disabledLink />
        </HeaderStyle>

        <SectionStyle square>
          <Container maxWidth="xl">
            <ContentStyle>
              <Typography variant="h1" color="white">
                Welcome Back
              </Typography>
              <Typography
                color="white"
                variant="h4"
                marginTop={4}
                lineHeight="1.3"
              >
                Connect Metamask <br /> to access the admin panel
              </Typography>
              <Typography color="white" variant="h3" margin="8px 0">
                ⬇
              </Typography>

              <Button
                onClick={handleLogin}
                variant="contained"
                size="large"
                color="inherit"
                sx={{
                  minWidth: 150,
                  minHeight: 60,
                  fontSize: 22,
                  color: theme.palette.primary.main,
                }}
                endIcon={<img src={metamask} alt="metamask" width="28" />}
              >
                Connect
              </Button>
            </ContentStyle>
          </Container>
        </SectionStyle>
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
  width: "100%",
  position: "absolute",
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: `0 ${theme.spacing(8)}`,
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

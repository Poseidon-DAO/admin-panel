import { Container, Box } from "@mui/material";

import Page from "src/components/Page";

import PageTitle from "src/sections/common/page-title/PageTitle";
import {
  // Airdrops,
  Stats,
  PDNTransfers,
  PDNBurns,
  PDNMints,
} from "src/sections/dashboard";

export default function DashboardApp({ sectionTitle }) {
  return (
    <Page title="Dashboard">
      <Container maxWidth="xl">
        <PageTitle>{sectionTitle}</PageTitle>

        <Box>
          <Stats />
        </Box>

        <Box my={3}>
          <PDNTransfers />
        </Box>

        <Box my={3}>
          <PDNBurns />
        </Box>

        <Box my={3}>
          <PDNMints />
        </Box>

        <Box>{/* <Airdrops /> */}</Box>
      </Container>
    </Page>
  );
}

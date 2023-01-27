import { Container, Box } from "@mui/material";

import Page from "src/components/Page";

import PageTitle from "src/sections/common/page-title/PageTitle";
import {
  Airdrops,
  Stats,
  PDNTransfers,
  PDNBurns,
  PDNMints,
  Vests,
} from "src/sections/dashboard";

interface IProps {
  sectionTitle: string;
}

export default function DashboardApp({ sectionTitle }: IProps) {
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

        <Box my={3}>
          <Airdrops />
        </Box>

        <Box my={3}>
          <Vests />
        </Box>
      </Container>
    </Page>
  );
}

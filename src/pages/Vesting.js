import PropTypes from "prop-types";
import { Container } from "@mui/material";

import Page from "src/components/Page";
import VestingLayout from "src/layouts/vesting";
import PageTitle from "src/sections/common/page-title/PageTitle";

Vesting.propTypes = {
  sectionTitle: PropTypes.string,
};

export default function Vesting({ sectionTitle = "" }) {
  return (
    <Page title="Vesting">
      <Container maxWidth="xl">
        <PageTitle>{sectionTitle}</PageTitle>
        <VestingLayout />
      </Container>
    </Page>
  );
}

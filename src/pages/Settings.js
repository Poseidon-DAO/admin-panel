import PropTypes from "prop-types";
import { Container } from "@mui/material";

import Page from "src/components/Page";
import SettingsLayout from "src/layouts/settings";
import PageTitle from "src/sections/common/page-title/PageTitle";

Settings.propTypes = {
  sectionTitle: PropTypes.string,
};

export default function Settings({ sectionTitle = "" }) {
  return (
    <Page title="Settings">
      <Container maxWidth="xl">
        <PageTitle>{sectionTitle}</PageTitle>
        <SettingsLayout />
      </Container>
    </Page>
  );
}

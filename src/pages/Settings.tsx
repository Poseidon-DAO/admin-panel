import { type FC } from "react";
import { Container } from "@mui/material";

import Page from "src/components/Page";
import SettingsLayout from "src/layouts/settings";
import PageTitle from "src/sections/common/page-title/PageTitle";

type IProps = {
  sectionTitle: string;
};

const Settings: FC<IProps> = ({ sectionTitle = "" }) => {
  return (
    <Page title="Settings">
      <Container maxWidth="xl">
        <PageTitle>{sectionTitle}</PageTitle>
        <SettingsLayout />
      </Container>
    </Page>
  );
};

export default Settings;

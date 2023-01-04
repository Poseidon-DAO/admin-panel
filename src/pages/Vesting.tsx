import { type FC } from "react";
import { Container } from "@mui/material";

import Page from "src/components/Page";
import VestingLayout from "src/layouts/vesting";
import PageTitle from "src/sections/common/page-title/PageTitle";

type IProps = {
  sectionTitle: string;
};

const Vesting: FC<IProps> = ({ sectionTitle = "" }) => {
  return (
    <Page title="Vesting">
      <Container maxWidth="xl">
        <PageTitle>{sectionTitle}</PageTitle>
        <VestingLayout />
      </Container>
    </Page>
  );
};

export default Vesting;

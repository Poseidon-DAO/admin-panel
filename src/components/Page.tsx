import { FC, type ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { Box } from "@mui/material";

type IProps = {
  children: ReactNode;
  title: string;
};

const Page: FC<IProps> = ({ children, title = "" }) => (
  <>
    <Helmet>
      <title>{title || "Poseidon DAO"}</title>
    </Helmet>

    <Box>{children}</Box>
  </>
);

export default Page;

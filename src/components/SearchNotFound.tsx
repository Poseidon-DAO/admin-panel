import { type FC } from "react";
import { Paper, Typography } from "@mui/material";

type IProps = {
  searchQuery?: string;
};

const SearchNotFound: FC<IProps> = ({ searchQuery = "" }) => {
  return (
    <Paper>
      <Typography gutterBottom align="center" variant="subtitle1">
        Not found
      </Typography>
      <Typography variant="body2" align="center">
        No results found for &nbsp;
        <strong>&quot;{searchQuery}&quot;</strong>. Try checking for typos or
        using complete words.
      </Typography>
    </Paper>
  );
};

export default SearchNotFound;

import { IconButton, TextField } from "@mui/material";
import Iconify from "src/components/Iconify";

function SearchBar({ value, onChange, onSearchCancel }) {
  return (
    <TextField
      variant="outlined"
      size="small"
      placeholder="Search accounts"
      value={value}
      onChange={onChange}
      InputProps={{
        endAdornment: value ? (
          <IconButton
            onClick={onSearchCancel}
            aria-label="remove search query"
            size="small"
          >
            <Iconify icon="bi:x-lg" />
          </IconButton>
        ) : (
          <Iconify icon="bytesize:search" width={18} height={18} />
        ),
      }}
      style={{ width: 400 }}
    />
  );
}

export default SearchBar;

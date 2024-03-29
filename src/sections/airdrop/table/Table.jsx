import {
  alpha,
  Box,
  Checkbox,
  IconButton,
  Paper,
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Iconify from "src/components/Iconify";
import SearchBar from "./SearchBar";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const headCells = [
  {
    id: "account",
    numeric: false,
    label: "Account",
  },
  {
    id: "amount",
    numeric: true,
    label: "Amount",
  },
  {
    id: "vestingAmount",
    numeric: true,
    label: "Blocks",
  },
];

function Table({
  rows,
  onSelectChange = () => {},
  onRowsDelete,
  isVestingActive,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchRows, setSearchRows] = useState(rows);

  useEffect(() => {
    setSearchRows(rows);
  }, [rows]);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("amount");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function handleRequestSort(event, property) {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

  function handleSelectChange(rows) {
    setSelected(rows);
    onSelectChange?.(rows);
  }

  function handleSelectAllClick(event) {
    if (event.target.checked) {
      handleSelectChange(rows);
      return;
    }
    handleSelectChange([]);
  }

  function handleClick(_, row) {
    const elementIsSelected = selected.find((el) => el.address === row.address);

    if (elementIsSelected) {
      const filtered = selected.filter((el) => el.address !== row.address);
      handleSelectChange(filtered);

      return;
    }

    const updatedSelected = [...selected, row];
    handleSelectChange(updatedSelected);
  }

  function handleChangePage(_, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleRowsDelete() {
    const selectedAddresses = selected.map((a) => a.address);
    onRowsDelete(selectedAddresses);
    handleSelectChange([]);
  }

  function requestSearch(query) {
    setSearchQuery(query);
    const filteredRows = rows.filter((row) => {
      return row.address.toLowerCase().includes(query?.toLowerCase());
    });
    setSearchRows(filteredRows);
  }

  function cancelSearch() {
    setSearchQuery("");
    requestSearch("");
  }

  const isSelected = (name) => !!selected.find((el) => el.address === name);

  const filteredCells = !isVestingActive
    ? headCells.filter((cell) => cell.id !== "vestingAmount")
    : headCells;
  const rowCount = searchRows.length;
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - searchRows.length);
  const numSelected = selected.length;

  return (
    <Box sx={{ width: "100%" }} marginTop={4}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
              ...(numSelected > 0 && {
                bgcolor: (theme) =>
                  alpha(
                    theme.palette.primary.main,
                    theme.palette.action.activatedOpacity
                  ),
              }),
            }}
          >
            {numSelected > 0 ? (
              <Typography
                sx={{ flex: "1 1 100%" }}
                color="inherit"
                variant="subtitle1"
                component="div"
              >
                {numSelected} selected
              </Typography>
            ) : (
              <Typography
                sx={{ flex: "1 1 100%" }}
                variant="h6"
                id="tableTitle"
                component="div"
              >
                Airdrop accounts
              </Typography>
            )}

            <SearchBar
              value={searchQuery}
              onChange={(e) => requestSearch(e.target.value)}
              onSearchCancel={cancelSearch}
            />

            {numSelected > 0 && (
              <Tooltip title="Delete">
                <IconButton onClick={handleRowsDelete}>
                  <Iconify icon="ant-design:delete-filled" />
                </IconButton>
              </Tooltip>
            )}
          </Toolbar>

          <MuiTable sx={{ minWidth: 750 }} aria-labelledby="airdrop accounts">
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={numSelected > 0 && numSelected < rowCount}
                    checked={rowCount > 0 && numSelected === rowCount}
                    onChange={handleSelectAllClick}
                    inputProps={{
                      "aria-label": "select all addresses",
                    }}
                  />
                </TableCell>

                {filteredCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align="left"
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    {headCell.id === "amount" ||
                    headCell.id === "vestingAmount" ? (
                      <TableSortLabel
                        active={orderBy === headCell.id}
                        direction={orderBy === headCell.id ? order : "asc"}
                        onClick={(event) =>
                          handleRequestSort(event, headCell.id)
                        }
                        style={{ fontWeight: "bolder" }}
                      >
                        {headCell.label}
                      </TableSortLabel>
                    ) : (
                      headCell.label
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {searchRows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.address);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>

                      <TableCell align="left">{row.address}</TableCell>
                      <TableCell align="left">
                        {new Intl.NumberFormat("en-US", {
                          maximumFractionDigits: 2,
                          minimumFractionDigits: 2,
                        }).format(Number(row.amount))}
                      </TableCell>
                      {isVestingActive && (
                        <TableCell align="left">{row.vestingAmount}</TableCell>
                      )}
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 55 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </MuiTable>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={searchRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}

export default Table;

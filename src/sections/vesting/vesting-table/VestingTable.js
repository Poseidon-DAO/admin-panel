import { LoadingButton } from "@mui/lab";
import {
  Box,
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
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { usePDNSymbol } from "src/lib";
import { useBlockNumber } from "wagmi";

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
    id: "expirationBlockHeight",
    numeric: true,
    label: "Exp. Block Height",
  },
  {
    id: "delete",
    numeric: false,
    label: "",
  },
];

function VestingTable({ rows, onRowDelete, isLoading, loadingId }) {
  const [searchRows, setSearchRows] = useState(rows);
  const { symbol } = usePDNSymbol();
  const { data: lastBlock } = useBlockNumber({ watch: true });

  useEffect(() => {
    setSearchRows(rows);
  }, [rows]);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("amount");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  function handleRequestSort(event, property) {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  }

  function handleChangePage(_, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  function handleRowDelete(index) {
    onRowDelete?.(index);
  }

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - searchRows.length) : 0;
  const showDeleteCell = searchRows.some(
    (row) => lastBlock < row?.expirationBlockHeight
  );
  const filteredCells = headCells.filter(
    (cell) => !(!showDeleteCell && cell.id === "delete")
  );

  return (
    <Box sx={{ width: "100%" }} marginTop={4}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Toolbar
            sx={{
              pl: { sm: 2 },
              pr: { xs: 1, sm: 1 },
            }}
          >
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Airdrop vesting
            </Typography>
          </Toolbar>

          <MuiTable sx={{ minWidth: 750 }} aria-labelledby="airdrop accounts">
            <TableHead>
              <TableRow>
                {filteredCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align="left"
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    {headCell.id === "amount" ||
                    headCell.id === "expirationBlockHeight" ? (
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
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row?.vestIndex}
                    >
                      <TableCell align="left">{row.address}</TableCell>
                      <TableCell align="left">
                        {row.amount} {symbol}
                      </TableCell>
                      <TableCell align="left">
                        {row.expirationBlockHeight - lastBlock}
                      </TableCell>
                      <TableCell align="right">
                        {lastBlock < row?.expirationBlockHeight && (
                          <LoadingButton
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleRowDelete(row?.vestIndex)}
                            loading={isLoading && loadingId === row?.vestIndex}
                            disabled={isLoading && loadingId !== row?.vestIndex}
                          >
                            Delete
                          </LoadingButton>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
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

export default VestingTable;

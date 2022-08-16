import {
  Box,
  Button,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { useCSVReader } from "react-papaparse";
import Iconify from "src/components/Iconify";

function CSVLoader({ onFileLoad, onFileRemove }) {
  const { CSVReader } = useCSVReader();

  function handleFileRemove(e, { onClick }) {
    onClick(e);
    onFileRemove();
  }

  return (
    <CSVReader
      onUploadAccepted={(results) => {
        const { data } = results;

        const formatedData = data.map(([address, amount]) => ({
          address,
          amount: Number(amount),
        }));

        onFileLoad?.(formatedData);
      }}
      onUploadRejected={() => {
        console.log("hinii");
        // onFileRemove
      }}
    >
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
        <>
          <Grid container wrap="nowrap">
            <Grid item container alignItems="center">
              {!!acceptedFile ? (
                <Grid
                  container
                  style={{
                    border: "1px solid #D7DDE1",
                    borderRadius: 8,
                    width: 200,
                    height: 36,
                    padding: "0 8px",
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Tooltip title={acceptedFile?.name || "file name"}>
                      <Grid item>
                        <Typography variant="caption">
                          {acceptedFile && acceptedFile.name.slice(0, 17)}...
                          <Typography variant="caption" fontWeight="bold">
                            .csv
                          </Typography>
                        </Typography>
                      </Grid>
                    </Tooltip>

                    <Grid item>
                      <Tooltip title="Remove file">
                        <IconButton
                          onClick={(e) =>
                            handleFileRemove(e, getRemoveFileProps())
                          }
                          aria-label="delete"
                          size="small"
                          color="error"
                        >
                          <Iconify icon="bi:x-lg" />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>

                  <ProgressBar style={{ height: 2 }} />
                </Grid>
              ) : (
                <Button variant="contained" {...getRootProps()}>
                  Import CSV file
                </Button>
              )}

              <Box marginLeft={2}></Box>
            </Grid>
          </Grid>
        </>
      )}
    </CSVReader>
  );
}

export default CSVLoader;

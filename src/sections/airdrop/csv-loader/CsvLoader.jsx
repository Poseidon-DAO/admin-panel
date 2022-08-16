import {
  Button,
  Grid,
  IconButton,
  styled,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";
import { useCSVReader } from "react-papaparse";
import Iconify from "src/components/Iconify";

const Wrapper = styled(Grid)`
  border: 1px solid #d7dde1;
  border-radius: 8px;
  width: 200px;
  height: 36px;
  padding: 0 8px;
`;

function CSVLoader({ onFileLoad, onFileRemove, removeFileCondition }) {
  const { CSVReader } = useCSVReader();
  const deleteButtonRef = useRef();

  useEffect(() => {
    if (removeFileCondition && !!deleteButtonRef.current) {
      deleteButtonRef?.current?.click();
    }
  }, [removeFileCondition]);

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
    >
      {({ getRootProps, acceptedFile, ProgressBar, getRemoveFileProps }) => (
        <>
          <Grid container wrap="nowrap" justifyContent="flex-end">
            <Grid item container alignItems="center">
              {!!acceptedFile ? (
                <Wrapper container>
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
                          ref={deleteButtonRef}
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
                </Wrapper>
              ) : (
                <Button variant="contained" {...getRootProps()}>
                  Import CSV file
                </Button>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </CSVReader>
  );
}

export default CSVLoader;

import {
  Button,
  Grid,
  IconButton,
  styled,
  Tooltip,
  Typography,
  tooltipClasses,
} from "@mui/material";
import { useEffect } from "react";
import { useRef } from "react";
import { useCSVReader } from "react-papaparse";
import Iconify from "src/components/Iconify";
import web3 from "web3";
import DataFormatNotice from "../data-format-notice/DataFormatNotice";

function CSVLoader({
  onFileLoad,
  onFileRemove,
  removeFileCondition,
  disabled = false,
  isVestingActive = false,
}) {
  const { CSVReader } = useCSVReader();
  const deleteButtonRef = useRef();

  useEffect(() => {
    if (!!deleteButtonRef.current && removeFileCondition) {
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

        const formatedData = data.map(([address, amount, blocks]) => ({
          address,
          amount: Number(amount),
          ...(isVestingActive && { vestingAmount: Number(blocks) }),
        }));

        const isDataValid = formatedData.every(
          ({ address, amount, vestingAmount }) => {
            return (
              !web3.utils.isAddress(address) &&
              !isNaN(amount) &&
              !!isVestingActive &&
              !isNaN(vestingAmount)
            );
          }
        );

        if (!isDataValid) {
          deleteButtonRef?.current?.click();
        }

        onFileLoad?.(formatedData, !isDataValid || false);
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
                <Grid container alignItems="center" wrap="nowrap">
                  <CustomTooltip
                    title={
                      <DataFormatNotice isVestingActive={isVestingActive} />
                    }
                    arrow
                  >
                    <IconButton
                      style={{ margin: "0 5px", cursor: "help" }}
                      disableTouchRipple
                    >
                      <Iconify
                        icon="ant-design:info-circle-outlined"
                        width={20}
                        height={20}
                        color="#d7dde1"
                      />
                    </IconButton>
                  </CustomTooltip>

                  <Button
                    variant="contained"
                    {...getRootProps()}
                    style={{ minWidth: 150 }}
                    disabled={disabled}
                  >
                    Import CSV file
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </>
      )}
    </CSVReader>
  );
}

const Wrapper = styled(Grid)`
  border: 1px solid #d7dde1;
  border-radius: 8px;
  width: 200px;
  height: 36px;
  padding: 0 8px;
`;

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: 370,
    padding: 8,
    textAlign: "center",
  },
}));

export default CSVLoader;

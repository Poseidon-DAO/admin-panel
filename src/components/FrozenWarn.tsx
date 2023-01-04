import { Box } from "@mui/material";

export const FrozenWarn = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "5vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FF6666",
        color: "white",
      }}
    >
      <h4 color="#fff">The DAO is frozen</h4>
    </Box>
  );
};

export default FrozenWarn;

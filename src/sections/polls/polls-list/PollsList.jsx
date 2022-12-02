import { Box } from "@mui/material";
import PollComponent from "src/components/PollComponent";

function PollsList({ polls = [] }) {
  return (
    <Box display="flex" flexWrap="wrap" margin="16px 0">
      {polls.map((poll) => (
        <Box marginRight={3} marginBottom={3} key={poll._hex} minHeight="100%">
          <PollComponent poll={poll} />
        </Box>
      ))}
    </Box>
  );
}

export { PollsList };

import { Box } from "@mui/material";
import { styled } from "@mui/system";

// this allows to re use CSS properties
const FlexBetween = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

export default FlexBetween;

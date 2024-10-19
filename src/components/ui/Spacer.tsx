import { Box } from "@mui/material";
import { FC } from "react";

const Spacer: FC<{ spacing?: number }> = ({ spacing = 1 }) => {
  return (
    <Box
      sx={(theme) => ({
        height: theme.spacing(spacing),
      })}
    ></Box>
  );
};

export default Spacer;

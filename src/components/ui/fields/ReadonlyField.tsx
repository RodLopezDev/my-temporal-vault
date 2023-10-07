import { FC } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import CopyButton from "../CopyButton";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  label: string;
  value: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

const ReadonlyField: FC<Props> = ({ label, value, onDelete, onEdit }) => {
  return (
    <TextField
      disabled
      fullWidth
      size="medium"
      label={label}
      variant="outlined"
      value={value}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <IconButton
              size="small"
              onClick={onDelete}
              sx={{ width: "24px", height: "24px" }}
            >
              <ClearIcon sx={{ width: "16px" }} />
            </IconButton>
            <IconButton
              size="small"
              onClick={onEdit}
              sx={{ width: "24px", height: "24px" }}
            >
              <ModeEditIcon sx={{ width: "16px" }} />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <CopyButton value={value} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ReadonlyField;

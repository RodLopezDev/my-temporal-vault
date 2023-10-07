import { FC } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import CopyButton from "../CopyButton";
import ClearIcon from "@mui/icons-material/Clear";

interface Props {
  label: string;
  value: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

function isURL(str: string) {
  // Regular expression pattern for a URL
  const urlPattern = /^(https?:\/\/)?([\w.-]+\.[a-z]{2,})(\/\S*)?$/i;

  // Test the string against the pattern
  return urlPattern.test(str);
}

const ReadonlyField: FC<Props> = ({ label, value, onDelete, onEdit }) => {
  const handleLink = () => {
    const link = document.createElement("a");
    link.href = value;
    link.target = "_blank";
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
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
            {isURL(value) ? (
              <IconButton size="small" onClick={handleLink}>
                <OpenInNewIcon />
              </IconButton>
            ) : null}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ReadonlyField;

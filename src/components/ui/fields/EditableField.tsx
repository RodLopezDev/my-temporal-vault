import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton, InputAdornment, TextField } from "@mui/material";

interface Props {
  label: string;
  value: string;
  onEdit: (value: string) => void;
  onCancel: () => void;
}

const EditableField: FC<Props> = ({
  label,
  value: initialValue,
  onEdit,
  onCancel,
}) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValue(e.target.value);
  };

  const onKeyUp = (e: KeyboardEvent) => {
    if (e.code === "Escape") {
      onCancel();
    }
    if (e.code === "Enter") {
      onEdit(value);
    }
  };

  return (
    <TextField
      fullWidth
      autoFocus
      size="medium"
      label={label}
      variant="outlined"
      value={value}
      onKeyUp={onKeyUp}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" onClick={onCancel}>
              <ClearIcon />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                onEdit(value);
              }}
            >
              <CheckIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default EditableField;

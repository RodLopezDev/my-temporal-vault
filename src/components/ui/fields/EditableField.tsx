import { ChangeEvent, FC, useState } from "react";
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

  const onConfirm = () => {
    onEdit(value);
  };

  return (
    <TextField
      fullWidth
      size="medium"
      label={label}
      variant="outlined"
      value={value}
      onChange={handleChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton size="small" onClick={onCancel}>
              <ClearIcon />
            </IconButton>
            <IconButton size="small" onClick={onConfirm}>
              <CheckIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default EditableField;

import { FC, useEffect, useRef, useState } from "react";
import { Button, Grid, TextField, Typography } from "@mui/material";

import Field from "@/domain/types/Field";
import { SaveEntity } from "../../store/context";

interface Props {
  onCancel: () => void;
  onSubmit: (field: SaveEntity<Field>) => void;
}

const NewFieldHandler: FC<Props> = ({ onSubmit, onCancel }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    onSubmit({ label, value });
  };

  useEffect(() => {
    ref?.current?.focus();
  }, []);

  useEffect(() => {
    const eventPaste = function (event: ClipboardEvent) {
      const clipboardData = event?.clipboardData;
      if (!clipboardData) return;
      const textData = clipboardData?.getData("text");
      if (!textData) return;
      setValue(textData);
    };
    const eventKey = (e: KeyboardEvent) => {
      if (e.code === "Enter") {
        handleSubmit();
      }
      if (e.code === "Escape") {
        onCancel();
      }
    };
    document.addEventListener("paste", eventPaste);
    document.addEventListener("keyup", eventKey);
    return () => {
      document.removeEventListener("paste", eventPaste);
      document.removeEventListener("keyup", eventKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [label, value]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} textAlign="center">
        <Typography variant="h5">New Entry</Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          autoFocus
          InputProps={{ ref }}
          size="small"
          label="Label"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          fullWidth
          size="small"
          label="Value (Ctrl + v for fast)"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" fullWidth onClick={handleSubmit}>
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default NewFieldHandler;

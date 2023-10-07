import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";

import { useEffect, useState } from "react";

import { useStore } from "@/store";

import FieldHandler from "../handlers/FieldHandler";

const FieldsPresenter = () => {
  const { fields } = useStore();
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    const event = function (event: ClipboardEvent) {
      if (isEditing) return;
      const clipboardData = event?.clipboardData;
      if (!clipboardData) return;
      const textData = clipboardData?.getData("text");
      if (!textData) return;
      fields.methods.save({ label: "From Clipboard", value: textData });
    };
    document.addEventListener("paste", event);
    return () => {
      document.removeEventListener("paste", event);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fields.methods.save, isEditing]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} textAlign="right">
        <Typography
          display="inline-block"
          variant="body2"
          sx={(theme) => ({
            color: theme.palette.grey[600],
            mr: theme.spacing(1),
          })}
        >
          Ctrl + V or
        </Typography>
        <Button
          onClick={() =>
            fields.methods.save({
              label: "Entry",
              value: "",
            })
          }
          variant="outlined"
        >
          New entry
        </Button>
      </Grid>
      {fields.value.map((field) => (
        <Grid key={field.uuid} item xs={12} md={6} lg={4}>
          <FieldHandler
            key={field.uuid}
            field={field}
            isEditingItem={(state) => setEditing(state)}
            edit={fields.methods.update}
            remove={fields.methods.remove}
          />
        </Grid>
      ))}
      {!fields.value.length ? (
        <Grid item xs={12}>
          <Card elevation={0} variant="outlined">
            <CardContent sx={{ textAlign: "center" }}>No entries</CardContent>
          </Card>
        </Grid>
      ) : null}
    </Grid>
  );
};

export default FieldsPresenter;

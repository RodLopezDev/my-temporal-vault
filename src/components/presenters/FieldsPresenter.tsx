import { Box, Button } from "@mui/material";

import { useStore } from "@/store";

import FieldHandler from "../handlers/FieldHandler";

const FieldsPresenter = () => {
  const { fields } = useStore();

  return (
    <Box>
      {!fields.value.length ? <Box>Sin registros</Box> : null}
      {fields.value.map((field) => (
        <FieldHandler
          key={field.uuid}
          field={field}
          edit={fields.methods.update}
          remove={fields.methods.remove}
        />
      ))}
      <Button
        onClick={() =>
          fields.methods.save({
            label: "",
            value: "",
          })
        }
        variant="outlined"
      >
        New
      </Button>
    </Box>
  );
};

export default FieldsPresenter;

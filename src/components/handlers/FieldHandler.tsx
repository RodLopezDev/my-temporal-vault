import Swal from "sweetalert2";
import { FC, useState } from "react";
import Field from "@/domain/types/Field";

import ReadonlyField from "../ui/fields/ReadonlyField";
import EditableField from "../ui/fields/EditableField";

interface Props {
  field: Field;
  edit: (field: Field) => void;
  remove: (uuid: string) => void;
}

const FieldHandler: FC<Props> = ({ field, edit, remove }) => {
  const [isEditing, setEditing] = useState(false);

  const handleEdit = (value: string) => {
    edit({ ...field, value });
    setEditing(false);
  };

  const handleDelete = () => {
    Swal.fire({
      title: "Do you want to remove this?",
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`,
    }).then((result) => {
      if (result.isConfirmed) {
        remove(field.uuid);
      }
    });
  };

  return !isEditing ? (
    <ReadonlyField
      label={field.label}
      value={field.value}
      onEdit={() => setEditing(true)}
      onDelete={handleDelete}
    />
  ) : (
    <EditableField
      label={field.label}
      value={field.value}
      onCancel={() => setEditing(false)}
      onEdit={handleEdit}
    />
  );
};

export default FieldHandler;

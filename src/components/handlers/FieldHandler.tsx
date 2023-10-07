import Swal from "sweetalert2";
import { FC, useState } from "react";
import Field from "@/domain/types/Field";

import ReadonlyField from "../ui/fields/ReadonlyField";
import EditableField from "../ui/fields/EditableField";

interface Props {
  field: Field;
  isEditingItem?: (state: boolean) => void;
  edit: (field: Field) => void;
  remove: (uuid: string) => void;
}

const FieldHandler: FC<Props> = ({ field, edit, remove, isEditingItem }) => {
  const [isEditing, setEditing] = useState(false);

  const handleSubmitEdit = (value: string) => {
    edit({ ...field, value });
    setEditing(false);
    isEditingItem?.(false);
  };

  const handleEdit = () => {
    setEditing(true);
    isEditingItem?.(true);
  };
  const handleCancelEdit = () => {
    setEditing(false);
    isEditingItem?.(false);
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
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  ) : (
    <EditableField
      label={field.label}
      value={field.value}
      onCancel={handleCancelEdit}
      onEdit={handleSubmitEdit}
    />
  );
};

export default FieldHandler;

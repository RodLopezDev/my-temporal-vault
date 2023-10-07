import { FC, PropsWithChildren, useMemo } from "react";

import Note from "@/domain/types/Note";
import Field from "@/domain/types/Field";
import Vault from "@/domain/types/Vault";
import useCRUDState from "@/hooks/useCRUDState";

import { SaveEntity, StoreContext, UpdateEntity } from "./context";
import { nanoid } from "nanoid";

const StoreProvider: FC<PropsWithChildren> = ({ children }) => {
  const [fields, [saveF, removeF, updateF]] = useCRUDState<Field>([], "fields");
  const [vaults, [saveV, removeV, updateV]] = useCRUDState<Vault>([], "vaults");
  const [notes, [saveN, removeN, updateN]] = useCRUDState<Note>([], "notes");

  const contextState = useMemo(
    () => ({
      fields: {
        value: fields,
        methods: {
          save: (field: SaveEntity<Field>) =>
            saveF({
              ...field,
              uuid: nanoid(20),
              createdAt: new Date().toString(),
              updatedAt: new Date().toString(),
            }),
          remove: (uuid: string) => {
            removeF("uuid", uuid);
          },
          update: (field: UpdateEntity<Field>) => {
            updateF(
              { ...field, updatedAt: new Date().toString() },
              (item) => item.uuid === field.uuid
            );
          },
        },
      },
      vaults: {
        value: vaults,
        methods: {
          save: (field: SaveEntity<Vault>) =>
            saveV({
              ...field,
              uuid: nanoid(20),
              createdAt: new Date().toString(),
              updatedAt: new Date().toString(),
            }),
          remove: (uuid: string) => {
            removeV("uuid", uuid);
          },
          update: (vault: UpdateEntity<Vault>) => {
            updateV(
              { ...vault, updatedAt: new Date().toString() },
              (item) => item.uuid === vault.uuid
            );
          },
        },
      },
      notes: {
        value: notes,
        methods: {
          save: (field: SaveEntity<Note>) =>
            saveN({
              ...field,
              uuid: nanoid(20),
              createdAt: new Date().toString(),
              updatedAt: new Date().toString(),
            }),
          remove: (uuid: string) => {
            removeN("uuid", uuid);
          },
          update: (note: UpdateEntity<Note>) => {
            updateN(
              { ...note, updatedAt: new Date().toString() },
              (item) => item.uuid === note.uuid
            );
          },
        },
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields, notes, vaults]
  );

  return (
    <StoreContext.Provider value={contextState}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreProvider;

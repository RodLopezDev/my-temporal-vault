import { createContext } from "react";

import Note from "@/domain/types/Note";
import Field from "@/domain/types/Field";
import Vault from "@/domain/types/Vault";

export type UpdateEntity<T> = Omit<T, "updatedAt">;
export type SaveEntity<T> = Omit<
  Omit<Omit<T, "uuid">, "createdAt">,
  "updatedAt"
>;

interface InternalStore<T> {
  value: T[];
  methods: {
    save: (item: SaveEntity<T>) => void;
    remove: (value: string) => void;
    update: (item: UpdateEntity<T>) => void;
  };
}

export interface IStoreContext {
  fields: InternalStore<Field>;
  vaults: InternalStore<Vault>;
  notes: InternalStore<Note>;
}

export const StoreContext = createContext({} as IStoreContext);

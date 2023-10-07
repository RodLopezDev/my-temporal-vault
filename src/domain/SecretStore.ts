import Field from "./types/Field";
import Note from "./types/Note";
import Vault from "./types/Vault";

export interface SecrestStore {
  fields: Field[];
  vaults: Vault[];
  notes: Note[];
}

import Field from "./Field";
import BaseSecret from "../BaseSecret";

interface Vault extends BaseSecret {
  name: string;
  description: string;
  fields: Field[];
}

export default Vault;

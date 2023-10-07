import BaseSecret from "../BaseSecret";

interface Note extends BaseSecret {
  name: string;
  content: string;
}

export default Note;

import { useCallback } from "react";

import useLocalStorageState from "./useLocalStorageState";

type Result<T> = [
  T[],
  [
    (item: T) => void,
    (item: keyof T, value: string) => void,
    (item: T, validation: (item: T) => boolean) => void
  ]
];

const useCRUDState = function <T>(
  initialState: T[],
  storageKey: string
): Result<T> {
  const [fields, setFields] = useLocalStorageState<T[]>(
    initialState,
    storageKey
  );

  const save = useCallback(
    (element: T) => {
      const newState = [...fields, element];
      setFields(newState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields]
  );

  const remove = useCallback(
    (key: keyof T, value: string) => {
      const newState = fields.filter((f) => f[key] !== value);
      setFields(newState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields]
  );

  const update = useCallback(
    (element: T, validation: (item: T) => boolean) => {
      const newState = fields.map((field) => {
        if (validation(field)) {
          return { ...field, ...element };
        }
        return field;
      });
      setFields(newState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fields]
  );

  return [fields, [save, remove, update]];
};

export default useCRUDState;

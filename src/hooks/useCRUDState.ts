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
  const [elements, setElements] = useLocalStorageState<T[]>(
    initialState,
    storageKey
  );

  const save = useCallback(
    (element: T) => {
      const newState = [...elements, element];
      setElements(newState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [elements]
  );

  const remove = useCallback(
    (key: keyof T, value: string) => {
      const newState = elements.filter((f) => f[key] !== value);
      setElements(newState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [elements]
  );

  const update = useCallback(
    (element: T, validation: (item: T) => boolean) => {
      const newState = elements.map((field) => {
        if (validation(field)) {
          return { ...field, ...element };
        }
        return field;
      });
      setElements(newState);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [elements]
  );

  return [elements, [save, remove, update]];
};

export default useCRUDState;

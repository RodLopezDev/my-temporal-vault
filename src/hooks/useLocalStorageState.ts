import { useCallback, useEffect, useState } from "react";

const useLocalStorageState = function <T>(
  initialValue: T,
  key: string
): [T, (newValue: T) => void] {
  const [state, onChange] = useState<T>(initialValue);

  const setState = useCallback(
    (newValue: T) => {
      onChange(newValue);
      localStorage.setItem(key, JSON.stringify(newValue));
    },
    [key]
  );

  useEffect(() => {
    const strigify = JSON.stringify(initialValue);
    const initialLSValue = localStorage.getItem(key);

    try {
      if (!initialLSValue) {
        localStorage.setItem(key, strigify);
      } else {
        const value = JSON.parse(initialLSValue) || initialLSValue;
        setState(value || []);
      }
    } catch (e) {
      localStorage.setItem(key, strigify);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [state, setState];
};

export default useLocalStorageState;

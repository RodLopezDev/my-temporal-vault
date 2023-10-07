import { useContext } from "react";
import { StoreContext } from "./context";

const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("STORE NOT IMPLEMENTED");
  }
  return context;
};

export default useStore;

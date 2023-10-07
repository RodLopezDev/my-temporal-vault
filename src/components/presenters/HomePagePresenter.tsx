"use client";

import { StoreProvider } from "@/store";
import FieldsPresenter from "./FieldsPresenter";

const HomePagePresenter = () => {
  return (
    <StoreProvider>
      <FieldsPresenter />
    </StoreProvider>
  );
};

export default HomePagePresenter;

"use client";

import { useState } from "react";
import DehazeIcon from "@mui/icons-material/Dehaze";
import { AppBar, Box, Drawer, IconButton, Typography } from "@mui/material";

import { StoreProvider } from "@/store";
import FieldsPresenter from "./FieldsPresenter";

const HomePagePresenter = () => {
  const [drawer, setDrawer] = useState(false);
  return (
    <StoreProvider>
      <AppBar
        position="relative"
        sx={(theme) => ({
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          p: theme.spacing(1),
        })}
      >
        <IconButton onClick={() => setDrawer(true)}>
          <DehazeIcon sx={{ color: "white" }} />
        </IconButton>
        <Typography variant="h1" sx={{ fontSize: "20px" }}>
          Temporal vault
        </Typography>
        <Box sx={{ margin: "auto" }} />
      </AppBar>
      <Drawer open={drawer} onClose={() => setDrawer(false)}>
        <Box sx={(theme) => ({ width: theme.spacing(32) })}></Box>
      </Drawer>
      <Box sx={(theme) => ({ p: theme.spacing(2) })}>
        <FieldsPresenter />
      </Box>
      <Box
        sx={(theme) => ({
          padding: 1,
          left: "0px",
          bottom: "0px",
          width: "100%",
          position: "fixed",
          textAlign: "center",
          color: theme.palette.grey[700],
          backgroundColor: theme.palette.grey[100],
        })}
      >
        <footer>
          Desarrollado por{" "}
          <u>
            <a href="https://github.com/RodLopezDev" target="_blank">
              Rodrigo Lopez
            </a>
          </u>
        </footer>
      </Box>
    </StoreProvider>
  );
};

export default HomePagePresenter;

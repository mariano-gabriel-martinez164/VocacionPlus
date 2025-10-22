import React from "react";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function ListaFacultades({ facultades = [] }) {
  return (
    <Box sx={{ width: 320, mx: "auto" }}>
      {/* Título fuera del contenedor */}
      <Typography
        variant="h6"
        sx={{
          color: "#5bc0ff",
          mb: 1,
          textTransform: "lowercase",
          fontWeight: "bold",
        }}
      >
        facultades
      </Typography>

      {/* Caja con fondo translúcido */}
      <Box
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid rgba(100, 200, 255, 0.3)",
          backgroundColor: alpha("#1e283c", 0.25), // color base + transparencia
          backdropFilter: "blur(6px)",
        }}
      >
        <List disablePadding>
          {facultades.map((item, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  justifyContent: "center",
                  color: "#7ed0ff",
                  fontFamily: "monospace",
                  py: 0.5,
                }}
              >
                {item}
              </ListItem>
              {index < facultades.length - 1 && (
                <Divider
                  sx={{
                    bgcolor: "rgba(120, 200, 255, 0.3)",
                    width: "80%",
                    mx: "auto",
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </List>
      </Box>
    </Box>
  );
}

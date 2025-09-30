import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Bar.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Drawer, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { red } from "@mui/material/colors";
import { borderBottom, color, fontSize, height } from "@mui/system";

export default function Bar() {
  // aca pongan las opciones del menu (tienen que estar con el link en el app.js)
  const routes = [
    { text: "Facultades", path: "/facultad" },
    { text: "Carreras", path: "/carrera" },
    { text: "Usuario", path: "/usuario" },
    { text: "Login", path: "/login" },
    { text: "Registro", path: "/register" },
  ];

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ flexGrow: 1 }} className="box">
      <AppBar position="static" className="bar">
        <Toolbar>
          <IconButton
            className="menu-boton"
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <Box className="nav" sx={{
              bgcolor: "var(--primary-500)",
              color: "var(--white)",
              height: "100%"
            }}>
              <List>
                {routes.map((item, index) => (
                  <ListItem key={index}
                    sx={{
                      width: "8vw",
                      padding: 0,
                      borderColor: "var(--black)",
                      borderBottom: 2,
                    }}
                  >
                    <ListItemButton component={Link} to={item.path}
                    sx={{
                        textAlign: "center",
                        margin: 0,
                        "&:hover": {
                          backgroundColor: "var(--primary-400)",
                        }
                      }}
                    >
                      <ListItemText primary={item.text} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Drawer>
          <Typography className="titulo" variant="h6" component="div" sx={{ flexGrow: 1, textAlign: "center" }}>
            Vocación Plus
          </Typography>
          {auth && (
            <div>
              <IconButton
                className="menu-boton"
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

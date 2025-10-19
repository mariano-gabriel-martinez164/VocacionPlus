import React from "react";
import SchoolIcon from '@mui/icons-material/School'; // icono para facultad
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'; // icono para carrera
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
import { jwtDecode } from "jwt-decode";

export default function Bar() {
 
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

  const token = localStorage.getItem("token");
  const user = token ? jwtDecode(token) : null;
  const isLoggedIn = !!user;
  let rol = null;
  if (token) {
    const decoded = jwtDecode(token);
    rol = decoded.role;
  }
   const routes = rol == "Admin" 
   ? [
      { text: " Gestionar Facultades", path: "/" },
      { text: "Gestionar Carreras", path: "/carrera" },
    ]
    : [
        { text: "Buscar Facultades", path: "/" },
        { text: "Buscar Carreras", path: "/carrera" },
    ];
 
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
            sx={{ mr: 3 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer open={open} onClose={toggleDrawer(false)}>
	  <Box className="nav" sx={{
		  bgcolor: "var(--primary-500)",
              color: "var(--white)",
              height: "100%",
              width: "100%",
            }}>
              <List>
                {routes.map((item, index) => (
                  <ListItem key={index}
                    sx={{
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
                { isLoggedIn 
                ? [
                    <MenuItem key="perfil" onClick={handleClose}>Perfil</MenuItem>,
                    <MenuItem key="cerrar" onClick={() => {
                      localStorage.removeItem("token");
                      handleClose();
                      window.location.reload();
                    }}>Cerrar sesión</MenuItem>
                ]
                : [  
                    <MenuItem key="login" component={Link} to="/login" onClick={handleClose}>
                      Iniciar sesión
                    </MenuItem>,
                    <MenuItem key="register" component={Link} to="/register" onClick={handleClose}>
                      Registrarse
                    </MenuItem>
                ]}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

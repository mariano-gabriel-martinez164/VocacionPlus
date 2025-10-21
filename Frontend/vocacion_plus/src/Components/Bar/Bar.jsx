import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { jwtDecode } from "jwt-decode";
import '../../App.css';
import "./Bar.css";

export default function Bar() {
  const [rol, setRol ] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setLogin] = useState(false);
  const token = localStorage.getItem("token");

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
   const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };




  useEffect(() => {
    if(token) {
      try {
        const decodedToken = jwtDecode(token);
        setLogin(true);
        setRol(decodedToken.role)
      }catch(error) {
        console.error("token vencido:", error);
        localStorage.removeItem("token");
        setLogin(false);
      }
    } else {
      setLogin(false);
    }
  }, []);
   
   const routes = rol === "Admin" 
   ? [
      { text: "Gestionar Facultades", path: "/" },
      { text: "Gestionar Carreras", path: "/carrera" },
      { text: "Gestionar Usuarios", path: "/usuarios" },
    ]
    : [
        { text: "Buscar Facultades", path: "/" },
        { text: "Buscar Carreras", path: "/carrera" },
    ];


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
          <Drawer open={open} onClose={toggleDrawer(false)} slotProps={{
            paper: {
              sx: {
                backgroundColor: 'var(--primaryColor-darker)',
                color: 'var(--color-texto)',
                width: 260,
                borderRight: '1px solid var(--primaryColor-light)',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                '& .MuiList-root': {
                  padding: 0,
                },
                '& .MuiListItemButton-root': {
                  textAlign: 'center',
                  borderBottom: '1px solid var(--primaryColor-dark)',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'var(--primaryColor-light)',
                  },
                  '&:active': {
                    backgroundColor: 'var(--primaryColor-default)',
                  },
                },
              },
            },
          }}>
            <Box sx={{ flexGrow: 1}}>
              <List>
                {routes.map((item, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton component={Link} to={item.path} onClick={toggleDrawer(false)}>
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
              slotProps={{
                paper: {
                  sx: {
                    backgroundColor: 'var(--primaryColor-darker)',
                    color: 'var(--color-texto)',
                    borderRadius: 2,
                    border: '1px solid var(--primaryColor-light)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                    minWidth: 160,
                    '& .MuiMenuItem-root': {
                      fontWeight: 500,
                      '&:hover': {
                        backgroundColor: 'var(--primaryColor-light)',
                      },
                      '&:active': {
                        backgroundColor: 'var(--primaryColor-default)',
                      },
                    },
                  },
                }
              }}
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}

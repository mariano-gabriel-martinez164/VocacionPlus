import React from "react";
import SchoolIcon from '@mui/icons-material/School'; // icono para facultad
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'; // icono para carrera
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Bar.css";
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

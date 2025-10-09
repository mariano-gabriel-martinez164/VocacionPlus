import React from "react";
import "./Login.css"; 
import { Link } from "react-router-dom"
import { Box, Button, IconButton, Typography } from "@mui/material"; 
import CloseIcon from '@mui/icons-material/Close';

// Renombra tu Login.js a LoginModal.js o úsalo con el nombre de archivo que prefieras
const LoginModal = ({ handleClose }) => {
    return (
        <Box sx={{ p: 4, minWidth: 300, backgroundColor: '#6e2119ff'  }}> 
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h5" component="h2">
                    Iniciar Sesión
                </Typography>
                {/* Botón para cerrar el modal */}
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <div className="formulario">
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Correo electronico</label>
                        <input type="email" id="email" placeholder="Ingrese su correo" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" id="password" placeholder="Ingrese su contraseña" />
                    </div>
                    <div className="forgot-password">
                        <Button type="button" className="btn-forgot-password">
                            Olvidaste tu contraseña?
                        </Button>
                    </div>
                    <button type="submit" className="btn-login">Iniciar Sesión</button>
                    <div className="divider">
                        <span>o</span>
                    </div>
                    {/* El botón de Registro usa Link y cierra el modal */}
                    <Link to="/register" style={{ textDecoration: 'none' }}> 
                        <button type="button" className="btn-register" onClick={handleClose}>
                            Registrarse
                        </button>
                    </Link>
                </form>
            </div>
        </Box>
    )
}

export default LoginModal;
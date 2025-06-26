import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function AltaFacultad() {
  return (
    <div style={{ backgroundColor: '#381518' }}>
    <React.Fragment>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#381518', height: '100vh', zIndex: '2px', display: 'flex' }} />
      </Container>
    </React.Fragment>
  </div>
  )
}

export default AltaFacultad
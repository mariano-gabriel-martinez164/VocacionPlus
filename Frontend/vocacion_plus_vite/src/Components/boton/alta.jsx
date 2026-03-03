import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { Fab, Box } from "@mui/material";
import '../../App.css';

const FABButton = ({ ruta, label = "add" }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{
      display: 'flex',
      flexGrow: 1,
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    }}>
      <Fab
        aria-label={label}
        onClick={() => navigate(ruta)}
        sx={{
          color: "var(--color-texto)",
          bgcolor: "var(--primaryColor-light)",
          border: 2,
          borderColor: "var(--primaryColor-lighter)",
          transition: "all 0.3s ease",
          position: "fixed",
          bottom: 24,
          right: 24,
          '&:hover': {
            bgcolor: 'var(--primaryColor-lighter)',
            transform: 'scale(1.08)',
          },
          zIndex: 1000, 
        }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default FABButton;

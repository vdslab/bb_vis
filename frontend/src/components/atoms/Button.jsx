import { Button as MuiButton } from '@mui/material';

const Button = ({ 
  children, 
  variant = 'outlined', 
  size = 'small',
  onClick,
  sx = {},
}) => {
  return (
    <MuiButton
      variant={variant}
      size={size}
      onClick={onClick}
      sx={{
        color: 'rgba(0, 0, 0, 0.87)',
        borderColor: 'rgba(0, 0, 0, 0.23)',
        textTransform: 'none',
        borderRadius: '4px',
        fontSize: '0.875rem',
        minWidth: '48px',
        '&:hover': {
          borderColor: 'rgba(0, 0, 0, 0.87)',
          backgroundColor: 'rgba(0, 0, 0, 0.04)',
        },
        ...sx,
      }}
    >
      {children}
    </MuiButton>
  );
};

export default Button;
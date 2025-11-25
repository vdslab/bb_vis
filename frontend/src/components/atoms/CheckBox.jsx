import { Checkbox, FormControlLabel } from "@mui/material";

const CheckBox = ({ label, checked, onChange, sx = {} }) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          sx={{
            color: "rgba(0, 0, 0, 0.54)",
            "&.Mui-checked": {
              color: "rgba(0, 0, 0, 0.87)",
            },
            ...sx,
          }}
        />
      }
      label={label}
      sx={{
        "& .MuiFormControlLabel-label": {
          fontSize: "0.875rem",
          color: "rgba(0, 0, 0, 0.87)",
        },
      }}
    />
  );
};

export default CheckBox;

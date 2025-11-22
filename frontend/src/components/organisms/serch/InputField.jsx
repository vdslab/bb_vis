import Button from "@/components/atoms/Button";
import { FormControl, TextField, Typography } from "@mui/material";
import "@styles/search.css";

const InputField = ({ label, value, onChange, onButtonClick }) => {
  return (
    <FormControl className="search-input" sx={{ width: "100%" }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 500, whiteSpace: "nowrap" }}>
          {label}:
        </Typography>
        <div style={{ display: "flex", alignItems: "center", gap: "16px", width: "100%" }}>
        <TextField
          value={value}
          onChange={onChange}
          size="medium"
        />
        <Button size="medium" onClick={onButtonClick} sx={{ height: '56px', minWidth: '64px' }}>Go</Button>
      </div>
    </FormControl>
    
  );
};

export default InputField;
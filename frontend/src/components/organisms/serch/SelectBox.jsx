import React from "react";
import { Select, MenuItem, FormControl, Box, Typography } from "@mui/material";
import "@styles/search.css";

const SearchSelect = ({ label, value, onChange, options }) => {
  return (
    <FormControl className="search-select" sx={{ width: "100%" }}>
      {label && <Typography className="search-label">{label}</Typography>}
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        size="medium"
        sx={{
          minHeight: "48px",
          "& .MuiSelect-select": {
            padding: "12px 16px",
            fontSize: "14px",
          },
        }}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "14px" }}>{selected || `Select ${label}`}</Typography>
          </Box>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            <Typography sx={{ fontSize: "14px" }}>{option.label}</Typography>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SearchSelect;

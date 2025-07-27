import React from "react";
import { Select, MenuItem, FormControl, Box, Typography } from "@mui/material";
import "@styles/search.css";

const SearchSelect = ({ label, value, onChange, options }) => {
  return (
    <FormControl className="search-select" sx={{ width: "95%" }}>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        renderValue={(selected) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography className="search-label">
              {label}: {selected}
            </Typography>
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

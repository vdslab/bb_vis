import React from "react";
import { Select, MenuItem, FormControl, Box, Typography } from "@mui/material";
import "@styles/search.css";

const SearchSelect = ({
  label,
  value,
  onChange,
  options,
  placeholder = "All",
}) => {
  return (
    <FormControl className="search-select" sx={{ width: "95%" }}>
      <Select
        value={value}
        onChange={onChange}
        displayEmpty
        renderValue={(selected) => (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography className="search-label">
              {label}: {selected || placeholder}
            </Typography>
          </Box>
        )}
      >
        <MenuItem value="">
          <Typography sx={{ fontSize: "14px" }}>All</Typography>
        </MenuItem>
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

import React, { useState } from "react";
import { TextField, FormControl, Box, Typography } from "@mui/material";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "@styles/search.css";

const DatePicker = ({ label, value, onChange }) => {
  const initialStartDate = value?.startDate ? new Date(value.startDate) : null;
  const initialEndDate = value?.endDate ? new Date(value.endDate) : null;

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    // 日付をISO形式の文字列に変換して親コンポーネントに渡す
    const dateRange = {
      startDate: newValue ? newValue.toISOString().split("T")[0] : null,
      endDate: endDate ? endDate.toISOString().split("T")[0] : null,
    };
    onChange({ target: { value: dateRange } });
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    // 日付をISO形式の文字列に変換して親コンポーネントに渡す
    const dateRange = {
      startDate: startDate ? startDate.toISOString().split("T")[0] : null,
      endDate: newValue ? newValue.toISOString().split("T")[0] : null,
    };
    onChange({ target: { value: dateRange } });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControl className="search-date-picker" sx={{ width: "100%" }}>
        <Typography className="search-label">
          {label}
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 500, minWidth: "40px" }}>
              From:
            </Typography>
            <MuiDatePicker
              label="Start Date"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  size="medium" 
                  sx={{ 
                    flex: 1,
                    "& .MuiInputBase-root": {
                      minHeight: "40px"
                    }
                  }} 
                />
              )}
              format="yyyy/MM/dd"
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography sx={{ fontSize: "14px", fontWeight: 500, minWidth: "40px" }}>
              To:
            </Typography>
            <MuiDatePicker
              label="End Date"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  size="medium" 
                  sx={{ 
                    flex: 1,
                    "& .MuiInputBase-root": {
                      minHeight: "40px"
                    }
                  }} 
                />
              )}
              format="yyyy/MM/dd"
            />
          </Box>
        </Box>
      </FormControl>
    </LocalizationProvider>
  );
};

export default DatePicker;

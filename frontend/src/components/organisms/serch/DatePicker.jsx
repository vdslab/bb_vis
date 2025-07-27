import React, { useState } from "react";
import { TextField, FormControl, Box, Typography } from "@mui/material";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import "@styles/search.css";

const DatePicker = ({ label, value, onChange }) => {
  // valueから初期値を取得（valueがオブジェクトの場合）
  const initialStartDate = value?.startDate || null;
  const initialEndDate = value?.endDate || null;

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
      <FormControl className="search-date-picker" sx={{ width: "95%" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Typography className="search-label" sx={{ mb: 1 }}>
            {label}
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <MuiDatePicker
              label="開始日"
              value={startDate}
              onChange={handleStartDateChange}
              renderInput={(params) => (
                <TextField {...params} size="small" sx={{ flex: 1 }} />
              )}
              format="yyyy/MM/dd"
            />
            <Typography sx={{ fontSize: "14px" }}>~</Typography>
            <MuiDatePicker
              label="終了日"
              value={endDate}
              onChange={handleEndDateChange}
              renderInput={(params) => (
                <TextField {...params} size="small" sx={{ flex: 1 }} />
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

import React, { useState, useEffect } from "react";
import {
  TextField,
  FormControl,
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from "@mui/material";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { subMonths } from "date-fns";
import "@styles/search.css";

const DatePicker = ({ label, value, onChange }) => {
  const initialStartDate = value?.startDate ? new Date(value.startDate) : null;
  const initialEndDate = value?.endDate ? new Date(value.endDate) : null;

  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate);
  const [quickRange, setQuickRange] = useState(null);

  const toISODate = (date) => (date ? date.toISOString().split("T")[0] : null);

  const emitChange = (start, end) => {
    const dateRange = {
      startDate: toISODate(start),
      endDate: toISODate(end),
    };
    onChange({ target: { value: dateRange } });
  };

  useEffect(() => {
    const nextStartDate = value?.startDate ? new Date(value.startDate) : null;
    const nextEndDate = value?.endDate ? new Date(value.endDate) : null;

    setStartDate(nextStartDate);
    setEndDate(nextEndDate);

    if (!nextStartDate && !nextEndDate) {
      setQuickRange("ALL");
      return;
    }

    if (nextStartDate && nextEndDate) {
      const startISO = toISODate(nextStartDate);
      const matchesRange = (months) => {
        const comparisonStart = toISODate(
          subMonths(new Date(nextEndDate), months),
        );
        return startISO === comparisonStart;
      };

      if (matchesRange(1)) {
        setQuickRange("1M");
        return;
      }

      if (matchesRange(3)) {
        setQuickRange("3M");
        return;
      }
    }

    setQuickRange(null);
  }, [value?.startDate, value?.endDate]);

  const handleStartDateChange = (newValue) => {
    setStartDate(newValue);
    setQuickRange(null);
    emitChange(newValue, endDate);
  };

  const handleEndDateChange = (newValue) => {
    setEndDate(newValue);
    setQuickRange(null);
    emitChange(startDate, newValue);
  };

  const handleQuickRangeChange = (_, newRange) => {
    if (!newRange) return;

    if (newRange === "ALL") {
      setQuickRange("ALL");
      setStartDate(null);
      setEndDate(null);
      emitChange(null, null);
      return;
    }

    const baseEndDate = endDate ?? new Date();
    const end = new Date(baseEndDate);
    const months = newRange === "3M" ? 3 : 1;
    const start = subMonths(new Date(end), months);

    setQuickRange(newRange);
    setStartDate(start);
    setEndDate(end);
    emitChange(start, end);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <FormControl className="search-date-picker" sx={{ width: "100%" }}>
        <Box className="search-date-header">
          <Typography className="search-label">{label}</Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          {/* Single Day */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              width: "100%",
            }}
          >
            <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
              Date:
            </Typography>
            <MuiDatePicker
              label="Single Date"
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
                setEndDate(newValue);
                emitChange(newValue, newValue);
                setQuickRange(null);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="medium"
                  sx={{
                    width: "100%",
                    minHeight: "40px",
                    "& .MuiInputBase-root": { minHeight: "40px" },
                  }}
                />
              )}
              format="yyyy/MM/dd"
            />
          </Box>

          {/* クイックレンジボタン */}
          <ToggleButtonGroup
            size="small"
            exclusive
            value={quickRange}
            onChange={handleQuickRangeChange}
            className="search-date-quick-range"
            sx={{ alignSelf: "center", mt: 1 }}
          >
            <ToggleButton value="1M">1M</ToggleButton>
            <ToggleButton value="3M">3M</ToggleButton>
            <ToggleButton value="ALL">All</ToggleButton>
          </ToggleButtonGroup>

          {/* From */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              sx={{ fontSize: "14px", fontWeight: 500, minWidth: "40px" }}
            >
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
                      minHeight: "40px",
                    },
                  }}
                />
              )}
              format="yyyy/MM/dd"
            />
          </Box>

          {/* To */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              sx={{ fontSize: "14px", fontWeight: 500, minWidth: "40px" }}
            >
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
                      minHeight: "40px",
                    },
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

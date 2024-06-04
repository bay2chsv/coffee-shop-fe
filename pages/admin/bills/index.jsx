import * as React from "react";
import dayjs from "dayjs";
import { useState } from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import axios from "axios";
import BillTable from "@/components/Table/BillTable";
import { useRouter } from "next/router";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Button, Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
function orderlist() {
  const [timeTo, setTimeTo] = useState();
  const [timeFrom, setTimeFrom] = useState();
  const router = useRouter();

  const handleTimeTo = (newValue) => {
    let timeFormate = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
    setTimeTo(timeFormate);
  };
  const handleTimeFrom = (newValue) => {
    let timeFormate = `${newValue.$y}-${newValue.$M + 1}-${newValue.$D}`;
    setTimeFrom(timeFormate);
  };
  return (
    <Paper>
      <BillTable timeFrom={timeFrom} timeTo={timeTo} >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker onChange={handleTimeFrom} label="Time from" format="DD/MM/YYYY" />
          <DatePicker onChange={handleTimeTo} label="Time to" format="DD/MM/YYYY" />
        </LocalizationProvider>{" "}
      </BillTable>
    </Paper>
  );
}

export default orderlist;

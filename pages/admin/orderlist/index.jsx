import { getAuthHeaders, getAuthTokenFromCookie } from "@/components/auth";
import Dashboard from "@/components/dashboard/Dashboard";
import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import { MobileDatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import ListBill from "@/components/ListBill";
import { useRouter } from "next/router";

function orderlist() {
  const [start, setStart] = useState(dayjs().format("YYYY-MM-DD"));
  const [end, setEnd] = useState(dayjs().format("YYYY-MM-DD"));
  // Create an event handler to update the selected date when the DatePicker value changes.
  const handleStartChange = (date) => {
    let time = date.$y + "-" + (date.$M + 1) + "-" + date.$D;
    setStart(time);
  };
  const handleEndChange = (date) => {
    console.log(date);
    let time = date.$y + "-" + (date.$M + 1) + "-" + date.$D;
    setEnd(time);
  };

  const router = useRouter();
  const handleDelete = (id) => {
    const token = getAuthTokenFromCookie();
    const headers = getAuthHeaders(token);
    axios
      .delete("http://localhost:3333/bill", { data: { id: id }, headers }) // how to use headers with delete axios
      .then((res) => {
        if (res.data.message) {
          alert(res.data.message);
          router.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ListBill start={start} end={end} handleDelete={handleDelete}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker defaultValue={dayjs(Date())} onChange={handleStartChange} label="Time Start" format="DD/MM/YYYY" />
      </LocalizationProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker defaultValue={dayjs(Date())} onChange={handleEndChange} label="Time end" format="DD/MM/YYYY" />
      </LocalizationProvider>
    </ListBill>
  );
}

export default orderlist;
